import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';
import { AppIcon } from '@/components/common/AppIcon';
import { doctorsApi } from '@/api/doctors.api';

export interface PsychologistApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FieldName = 'name' | 'surname' | 'fatherName' | 'age' | 'phone' | 'cv';

interface FormValues {
  name: string;
  surname: string;
  fatherName: string;
  age: string;
  phone: string;
}

const INITIAL_VALUES: FormValues = {
  name: '',
  surname: '',
  fatherName: '',
  age: '',
  phone: '',
};

const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const ALLOWED_CV_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

let cachedDisplayTransitionSupport: boolean | undefined;

function canTransitionDisplay(): boolean {
  if (cachedDisplayTransitionSupport !== undefined) {
    return cachedDisplayTransitionSupport;
  }
  if (
    typeof window === 'undefined' ||
    !window.CSS?.supports?.('transition-behavior', 'allow-discrete') ||
    !document.body
  ) {
    return false;
  }

  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  void getComputedStyle(probe).display;
  probe.style.display = 'none';
  cachedDisplayTransitionSupport = getComputedStyle(probe).display === 'block';
  probe.remove();
  return cachedDisplayTransitionSupport;
}

function supportsTopLayerExit(): boolean {
  return (
    typeof window !== 'undefined' &&
    Boolean(window.CSS?.supports?.('overlay', 'auto')) &&
    canTransitionDisplay()
  );
}

async function closeTopLayerDialog(dialog: HTMLDialogElement): Promise<void> {
  if (!dialog.open || dialog.hasAttribute('data-closing')) return;

  if (!supportsTopLayerExit()) {
    dialog.setAttribute('data-closing', '');
    const animations = dialog.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((animation) => animation.finished)),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
    }
    if (!dialog.hasAttribute('data-closing')) return;
    dialog.removeAttribute('data-closing');
  }

  if (dialog.open) {
    dialog.close();
  }
}

function isPointerOutsideDialog(event: PointerEvent, dialog: HTMLDialogElement): boolean {
  const rect = dialog.getBoundingClientRect();
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAllowedCvFile(file: File): boolean {
  const lowerName = file.name.toLowerCase();
  const hasAllowedExtension = ALLOWED_CV_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  return hasAllowedExtension || ALLOWED_CV_MIME_TYPES.has(file.type);
}

export const PsychologistApplicationModal = ({
  isOpen,
  onClose,
}: PsychologistApplicationModalProps) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onCloseRef = useRef(onClose);
  const isSubmittingRef = useRef(false);

  const idPrefix = useId();
  const titleId = `${idPrefix}-title`;
  const formId = `${idPrefix}-form`;
  const ageHintId = `${idPrefix}-age-hint`;
  const phoneHintId = `${idPrefix}-phone-hint`;
  const cvHintId = `${idPrefix}-cv-hint`;

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
  }, [isSubmitting]);

  const resetFormState = useCallback(() => {
    setValues(INITIAL_VALUES);
    setCvFile(null);
    setTouched({});
    setErrors({});
    setIsDraggingOver(false);
    setIsSubmitting(false);
    setIsSuccess(false);
    setSubmitError(null);
    setLiveAnnouncement('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    formRef.current?.reset();
  }, []);

  const handleCloseRequest = useCallback(() => {
    if (isSubmittingRef.current) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    void closeTopLayerDialog(dialog);
  }, []);

  // Sync open state with the native top-layer <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.removeAttribute('data-closing');
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      void closeTopLayerDialog(dialog);
    }
  }, [isOpen]);

  // Native close, cancel (Esc / closedby exit animation), and Safari light-dismiss fallback
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      dialog.removeAttribute('data-closing');
      dialog.returnValue = '';
      resetFormState();
      onCloseRef.current();
    };

    const handleNativeCancel = (event: Event) => {
      if (isSubmittingRef.current) {
        event.preventDefault();
        return;
      }
      if (!supportsTopLayerExit()) {
        event.preventDefault();
        void closeTopLayerDialog(dialog);
      }
    };

    dialog.addEventListener('close', handleNativeClose);
    dialog.addEventListener('cancel', handleNativeCancel);

    const hasNativeClosedBy =
      typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype;

    let pressedOutside = false;
    const handlePointerDown = (event: PointerEvent) => {
      pressedOutside = isPointerOutsideDialog(event, dialog);
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (
        !isSubmittingRef.current &&
        pressedOutside &&
        isPointerOutsideDialog(event, dialog)
      ) {
        void closeTopLayerDialog(dialog);
      }
      pressedOutside = false;
    };

    if (!hasNativeClosedBy) {
      dialog.addEventListener('pointerdown', handlePointerDown);
      dialog.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      dialog.removeEventListener('close', handleNativeClose);
      dialog.removeEventListener('cancel', handleNativeCancel);
      if (!hasNativeClosedBy) {
        dialog.removeEventListener('pointerdown', handlePointerDown);
        dialog.removeEventListener('pointerup', handlePointerUp);
      }
    };
  }, [resetFormState]);

  const validateField = useCallback(
    (field: FieldName, nextValues: FormValues, nextFile: File | null): string | undefined => {
      switch (field) {
        case 'name': {
          const val = nextValues.name.trim();
          if (!val) return t('careerModal.errors.nameRequired', 'Adınızı daxil edin.');
          if (val.length < 2)
            return t('careerModal.errors.nameLength', 'Ad ən azı 2 simvoldan ibarət olmalıdır.');
          return undefined;
        }
        case 'surname': {
          const val = nextValues.surname.trim();
          if (!val) return t('careerModal.errors.surnameRequired', 'Soyadınızı daxil edin.');
          if (val.length < 2)
            return t(
              'careerModal.errors.surnameLength',
              'Soyad ən azı 2 simvoldan ibarət olmalıdır.'
            );
          return undefined;
        }
        case 'fatherName': {
          const val = nextValues.fatherName.trim();
          if (!val)
            return t('careerModal.errors.fatherNameRequired', 'Ata adınızı daxil edin.');
          if (val.length < 2)
            return t(
              'careerModal.errors.fatherNameLength',
              'Ata adı ən azı 2 simvoldan ibarət olmalıdır.'
            );
          return undefined;
        }
        case 'age': {
          const val = nextValues.age.trim();
          if (!val) return t('careerModal.errors.ageRequired', 'Yaşınızı daxil edin.');
          if (!/^\d+$/.test(val))
            return t('careerModal.errors.ageInvalid', 'Yaş 18 ilə 90 arasında tam ədəd olmalıdır.');
          const parsed = Number.parseInt(val, 10);
          if (parsed < 18 || parsed > 90)
            return t('careerModal.errors.ageInvalid', 'Yaş 18 ilə 90 arasında tam ədəd olmalıdır.');
          return undefined;
        }
        case 'phone': {
          const val = nextValues.phone.trim();
          if (!val)
            return t('careerModal.errors.phoneRequired', 'Əlaqə nömrənizi daxil edin.');
          const digitCount = val.replace(/\D/g, '').length;
          if (!/^\+?[\d\s\-()]+$/.test(val) || digitCount < 7 || digitCount > 15) {
            return t(
              'careerModal.errors.phoneInvalid',
              'Düzgün telefon nömrəsi daxil edin (məs: +994 50 123 45 67).'
            );
          }
          return undefined;
        }
        case 'cv': {
          if (!nextFile) {
            return t('careerModal.errors.cvRequired', 'Zəhmət olmasa CV faylınızı yükləyin.');
          }
          if (!isAllowedCvFile(nextFile)) {
            return t(
              'careerModal.errors.cvType',
              'Yalnız PDF, DOC və ya DOCX formatlı fayllar qəbul edilir.'
            );
          }
          if (nextFile.size > MAX_CV_SIZE_BYTES) {
            return t(
              'careerModal.errors.cvSize',
              'Faylın ölçüsü 10 MB-dan böyük olmamalıdır.'
            );
          }
          return undefined;
        }
      }
    },
    [t]
  );

  const handleTextChange = (field: keyof FormValues) => (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const nextValue = field === 'age' ? rawValue.replace(/[^\d]/g, '').slice(0, 2) : rawValue;
    const nextValues = { ...values, [field]: nextValue };
    setValues(nextValues);
    setSubmitError(null);

    // Clear existing error immediately as soon as the user fixes it
    if (errors[field]) {
      const nextErr = validateField(field, nextValues, cvFile);
      setErrors((prev) => ({ ...prev, [field]: nextErr }));
    }
  };

  const handleFieldBlur = (field: keyof FormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (values[field].trim().length > 0 || touched[field]) {
      const nextErr = validateField(field, values, cvFile);
      setErrors((prev) => ({ ...prev, [field]: nextErr }));
      if (nextErr) {
        setLiveAnnouncement(nextErr);
      }
    }
  };

  const applySelectedFile = useCallback(
    (file: File | null) => {
      setTouched((prev) => ({ ...prev, cv: true }));
      setSubmitError(null);
      if (!file) {
        setCvFile(null);
        const nextErr = validateField('cv', values, null);
        setErrors((prev) => ({ ...prev, cv: nextErr }));
        return;
      }
      const nextErr = validateField('cv', values, file);
      if (nextErr) {
        setCvFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setErrors((prev) => ({ ...prev, cv: nextErr }));
        setLiveAnnouncement(nextErr);
        return;
      }
      setCvFile(file);
      setErrors((prev) => ({ ...prev, cv: undefined }));
      setLiveAnnouncement(
        t('careerModal.cvSelectedAnnouncement', '{{name}} faylı seçildi.', { name: file.name })
      );
    },
    [t, validateField, values]
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    applySelectedFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    applySelectedFile(file);
  };

  const handleRemoveFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.focus();
    }
    setTouched((prev) => ({ ...prev, cv: true }));
    setErrors((prev) => ({
      ...prev,
      cv: t('careerModal.errors.cvRequired', 'Zəhmət olmasa CV faylınızı yükləyin.'),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fieldOrder: FieldName[] = ['name', 'surname', 'fatherName', 'age', 'phone', 'cv'];
    const nextErrors: Partial<Record<FieldName, string>> = {};
    const allTouched: Partial<Record<FieldName, boolean>> = {};

    for (const field of fieldOrder) {
      allTouched[field] = true;
      const err = validateField(field, values, cvFile);
      if (err) {
        nextErrors[field] = err;
      }
    }

    setTouched(allTouched);
    setErrors(nextErrors);
    setSubmitError(null);

    const firstInvalidField = fieldOrder.find((field) => Boolean(nextErrors[field]));
    if (firstInvalidField) {
      const targetEl = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstInvalidField}"]`
      );
      targetEl?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await doctorsApi.registerDoctor({
        name: values.name.trim(),
        surname: values.surname.trim(),
        fatherName: values.fatherName.trim(),
        age: Number.parseInt(values.age.trim(), 10),
        phone: values.phone.trim(),
        cv: cvFile ?? undefined,
      });

      setIsSuccess(true);
      setLiveAnnouncement(
        t('careerModal.successTitle', 'Müraciətiniz uğurla göndərildi!')
      );
    } catch (error) {
      let message = t(
        'careerModal.errors.submitFailed',
        'Müraciəti göndərərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.'
      );
      if (isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data === 'string' && data.trim()) {
          message = data;
        } else if (data && typeof data === 'object' && 'message' in data) {
          const maybeMsg = (data as { message?: unknown }).message;
          if (typeof maybeMsg === 'string' && maybeMsg.trim()) {
            message = maybeMsg;
          }
        }
      }
      setSubmitError(message);
      setLiveAnnouncement(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldId = (field: FieldName) => `${idPrefix}-${field}`;
  const getErrorId = (field: FieldName) => `${idPrefix}-${field}-error`;

  const buildDescribedBy = (field: FieldName, hintId?: string) => {
    const ids: string[] = [];
    if (hintId) ids.push(hintId);
    if (errors[field]) ids.push(getErrorId(field));
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  const getInputClassName = (field: keyof FormValues) => {
    const hasError = Boolean(errors[field]);
    return `career-field-input w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-white/[0.06] border text-white text-[16px] leading-snug placeholder-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF] focus-visible:border-[#00F2FF] ${
      hasError
        ? 'user-invalid-fallback border-red-400 bg-red-500/10'
        : 'border-white/15 hover:border-white/25'
    }`;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="career-application-dialog"
      {...({ closedby: isSubmitting ? 'none' : 'any' } as Record<string, string>)}
    >
      <div className="relative w-full bg-[#161226]/98 border border-purple-400/25 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.75),_0_0_28px_rgba(103,0,255,0.2)] overflow-hidden text-white">
        {/* Ambient corner glows */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-[#00F2FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Polite status announcer for dynamic feedback */}
        <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
          {liveAnnouncement}
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-white/10">
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#6700FF]/25 border border-[#A682FF]/40 text-[#D7C4FF] text-[11px] sm:text-[12px] font-semibold uppercase tracking-widest">
              <AppIcon icon="lucide:briefcase" size={13} className="text-[#00F2FF]" />
              <span>{t('careerModal.badge', 'Karyera')}</span>
            </div>

            <h1
              id={titleId}
              className="text-[22px] sm:text-[28px] font-bold tracking-tight leading-tight text-white"
            >
              {isSuccess
                ? t('careerModal.successTitle', 'Müraciətiniz uğurla göndərildi!')
                : t('careerModal.title', 'Psixoloq kimi müraciət edin')}
            </h1>

            {!isSuccess && (
              <p className="text-[14px] sm:text-[15px] text-white/75 leading-relaxed">
                {t(
                  'careerModal.subtitle',
                  'Məlumatlarınızı və CV-nizi əlavə edin — komandamız sizinlə ən qısa zamanda əlaqə saxlayacaq.'
                )}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleCloseRequest}
            disabled={isSubmitting}
            aria-label={t('careerModal.close', 'Bağla')}
            className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 active:scale-95 text-white/75 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <AppIcon icon="lucide:x" size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="relative z-10 px-5 sm:px-7 py-5 sm:py-6">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/35 flex items-center justify-center text-emerald-300">
                <AppIcon icon="lucide:check-circle-2" size={36} />
              </div>
              <p className="text-[15px] sm:text-[16px] text-white/85 leading-relaxed max-w-[420px]">
                {t(
                  'careerModal.successDescription',
                  'NexusMind komandasına göstərdiyiniz marağa görə təşəkkür edirik. Müraciətiniz qəbul edildi və qiymətləndirildikdən sonra sizinlə əlaqə saxlanılacaq.'
                )}
              </p>
              <button
                type="button"
                autoFocus
                onClick={handleCloseRequest}
                className="mt-2 min-h-[48px] px-8 rounded-full bg-white text-[#3D2A6B] hover:bg-[#F3ECFF] font-semibold text-[15px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161226]"
              >
                {t('careerModal.close', 'Bağla')}
              </button>
            </div>
          ) : (
            <form
              id={formId}
              ref={formRef}
              method="POST"
              action="/doctors/register"
              aria-labelledby={titleId}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4"
            >
              {/* Name & Surname */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={getFieldId('name')}
                    className="text-[14px] font-medium text-white/90"
                  >
                    {t('careerModal.fields.name', 'Ad')}{' '}
                    <span className="text-[#00F2FF]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={getFieldId('name')}
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={60}
                    autoFocus
                    autoComplete="given-name"
                    enterKeyHint="next"
                    placeholder={t('careerModal.placeholders.name', 'Adınız')}
                    value={values.name}
                    onChange={handleTextChange('name')}
                    onBlur={handleFieldBlur('name')}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={buildDescribedBy('name')}
                    className={getInputClassName('name')}
                  />
                  {errors.name && (
                    <p
                      id={getErrorId('name')}
                      className="flex items-start gap-1.5 text-[13px] text-red-300 leading-snug"
                    >
                      <AppIcon
                        icon="lucide:alert-circle"
                        size={15}
                        className="shrink-0 mt-0.5 text-red-400"
                        aria-hidden="true"
                      />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={getFieldId('surname')}
                    className="text-[14px] font-medium text-white/90"
                  >
                    {t('careerModal.fields.surname', 'Soyad')}{' '}
                    <span className="text-[#00F2FF]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={getFieldId('surname')}
                    name="surname"
                    type="text"
                    required
                    minLength={2}
                    maxLength={60}
                    autoComplete="family-name"
                    enterKeyHint="next"
                    placeholder={t('careerModal.placeholders.surname', 'Soyadınız')}
                    value={values.surname}
                    onChange={handleTextChange('surname')}
                    onBlur={handleFieldBlur('surname')}
                    aria-invalid={errors.surname ? 'true' : 'false'}
                    aria-describedby={buildDescribedBy('surname')}
                    className={getInputClassName('surname')}
                  />
                  {errors.surname && (
                    <p
                      id={getErrorId('surname')}
                      className="flex items-start gap-1.5 text-[13px] text-red-300 leading-snug"
                    >
                      <AppIcon
                        icon="lucide:alert-circle"
                        size={15}
                        className="shrink-0 mt-0.5 text-red-400"
                        aria-hidden="true"
                      />
                      <span>{errors.surname}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Father's Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={getFieldId('fatherName')}
                    className="text-[14px] font-medium text-white/90"
                  >
                    {t('careerModal.fields.fatherName', 'Ata adı')}{' '}
                    <span className="text-[#00F2FF]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={getFieldId('fatherName')}
                    name="fatherName"
                    type="text"
                    required
                    minLength={2}
                    maxLength={60}
                    autoComplete="additional-name"
                    enterKeyHint="next"
                    placeholder={t('careerModal.placeholders.fatherName', 'Ata adınız')}
                    value={values.fatherName}
                    onChange={handleTextChange('fatherName')}
                    onBlur={handleFieldBlur('fatherName')}
                    aria-invalid={errors.fatherName ? 'true' : 'false'}
                    aria-describedby={buildDescribedBy('fatherName')}
                    className={getInputClassName('fatherName')}
                  />
                  {errors.fatherName && (
                    <p
                      id={getErrorId('fatherName')}
                      className="flex items-start gap-1.5 text-[13px] text-red-300 leading-snug"
                    >
                      <AppIcon
                        icon="lucide:alert-circle"
                        size={15}
                        className="shrink-0 mt-0.5 text-red-400"
                        aria-hidden="true"
                      />
                      <span>{errors.fatherName}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={getFieldId('age')}
                    className="text-[14px] font-medium text-white/90"
                  >
                    {t('careerModal.fields.age', 'Yaş')}{' '}
                    <span className="text-[#00F2FF]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={getFieldId('age')}
                    name="age"
                    type="text"
                    inputMode="numeric"
                    pattern="(1[89]|[2-8][0-9]|90)"
                    required
                    maxLength={2}
                    enterKeyHint="next"
                    placeholder={t('careerModal.placeholders.age', 'Məs: 30')}
                    value={values.age}
                    onChange={handleTextChange('age')}
                    onBlur={handleFieldBlur('age')}
                    aria-invalid={errors.age ? 'true' : 'false'}
                    aria-describedby={buildDescribedBy('age', ageHintId)}
                    className={getInputClassName('age')}
                  />
                  <span id={ageHintId} className="visually-hidden">
                    {t('careerModal.hints.age', '18 ilə 90 arasında yaş daxil edin')}
                  </span>
                  {errors.age && (
                    <p
                      id={getErrorId('age')}
                      className="flex items-start gap-1.5 text-[13px] text-red-300 leading-snug"
                    >
                      <AppIcon
                        icon="lucide:alert-circle"
                        size={15}
                        className="shrink-0 mt-0.5 text-red-400"
                        aria-hidden="true"
                      />
                      <span>{errors.age}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={getFieldId('phone')}
                  className="text-[14px] font-medium text-white/90"
                >
                  {t('careerModal.fields.phone', 'Əlaqə nömrəsi')}{' '}
                  <span className="text-[#00F2FF]" aria-hidden="true">
                    *
                  </span>
                </label>
                <span id={phoneHintId} className="text-[12px] text-white/55">
                  {t('careerModal.hints.phone', 'Nümunə: +994 50 123 45 67')}
                </span>
                <input
                  id={getFieldId('phone')}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  pattern="\+?[\d\s\-()]{7,20}"
                  enterKeyHint="done"
                  placeholder="+994 50 123 45 67"
                  value={values.phone}
                  onChange={handleTextChange('phone')}
                  onBlur={handleFieldBlur('phone')}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={buildDescribedBy('phone', phoneHintId)}
                  className={getInputClassName('phone')}
                />
                {errors.phone && (
                  <p
                    id={getErrorId('phone')}
                    className="flex items-start gap-1.5 text-[13px] text-red-300 leading-snug"
                  >
                    <AppIcon
                      icon="lucide:alert-circle"
                      size={15}
                      className="shrink-0 mt-0.5 text-red-400"
                      aria-hidden="true"
                    />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* CV Upload */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[14px] font-medium text-white/90">
                  {t('careerModal.fields.cv', 'CV Faylı')}{' '}
                  <span className="text-[#00F2FF]" aria-hidden="true">
                    *
                  </span>
                </span>
                <span id={cvHintId} className="text-[12px] text-white/55">
                  {t('careerModal.hints.cv', 'PDF, DOC və ya DOCX formatı — maksimum 10 MB')}
                </span>

                <div className="relative">
                  <input
                    ref={fileInputRef}
                    id={getFieldId('cv')}
                    name="cv"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    aria-invalid={errors.cv ? 'true' : 'false'}
                    aria-describedby={buildDescribedBy('cv', cvHintId)}
                    className="career-file-input visually-hidden"
                  />

                  {cvFile ? (
                    <div
                      className={`career-file-dropzone flex items-center justify-between gap-3 px-4 py-3 rounded-xl border bg-white/[0.06] ${
                        errors.cv ? 'border-red-400' : 'border-emerald-400/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-[#6700FF]/30 border border-[#A682FF]/35 flex items-center justify-center shrink-0 text-[#00F2FF]">
                          <AppIcon icon="lucide:file-text" size={20} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[14px] font-medium text-white truncate">
                            {cvFile.name}
                          </span>
                          <span className="text-[12px] text-white/60">
                            {formatFileSize(cvFile.size)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <label
                          htmlFor={getFieldId('cv')}
                          className="min-h-[36px] px-3 rounded-lg bg-white/10 hover:bg-white/20 text-[13px] font-medium text-white flex items-center cursor-pointer transition-colors"
                        >
                          {t('careerModal.changeFile', 'Dəyiş')}
                        </label>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          aria-label={t('careerModal.removeFile', 'Faylı sil')}
                          className="w-9 h-9 rounded-lg bg-white/8 hover:bg-red-500/20 text-white/70 hover:text-red-300 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF]"
                        >
                          <AppIcon icon="lucide:trash-2" size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor={getFieldId('cv')}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`career-file-dropzone flex flex-col items-center justify-center gap-2 px-4 py-5 rounded-xl border border-dashed text-center cursor-pointer transition-colors ${
                        isDraggingOver
                          ? 'border-[#00F2FF] bg-[#00F2FF]/10'
                          : errors.cv
                            ? 'border-red-400 bg-red-500/10'
                            : 'border-white/25 bg-white/[0.04] hover:border-[#A682FF]/70 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#00F2FF]">
                        <AppIcon icon="lucide:upload" size={20} />
                      </div>
                      <span className="text-[14px] font-medium text-white">
                        {t('careerModal.uploadPrompt', 'CV faylını seçin və ya bura sürüşdürün')}
                      </span>
                    </label>
                  )}
                </div>

                {errors.cv && (
                  <p
                    id={getErrorId('cv')}
                    className="flex items-start gap-1.5 text-[13px] text-red-300 leading-snug"
                  >
                    <AppIcon
                      icon="lucide:alert-circle"
                      size={15}
                      className="shrink-0 mt-0.5 text-red-400"
                      aria-hidden="true"
                    />
                    <span>{errors.cv}</span>
                  </p>
                )}
              </div>

              {/* Submission Error Banner */}
              {submitError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/15 border border-red-400/40 text-red-200 text-[14px] leading-snug"
                >
                  <AppIcon
                    icon="lucide:alert-triangle"
                    size={18}
                    className="shrink-0 mt-0.5 text-red-400"
                    aria-hidden="true"
                  />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCloseRequest}
                  disabled={isSubmitting}
                  className="min-h-[48px] px-5 rounded-xl bg-white/8 hover:bg-white/15 text-white/85 hover:text-white font-medium text-[15px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t('careerModal.cancel', 'Ləğv et')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[48px] px-7 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] active:scale-[0.99] text-white font-semibold text-[15px] shadow-[0_6px_22px_rgba(124,58,237,0.4)] transition-all cursor-pointer inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161226] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                        aria-hidden="true"
                      />
                      <span>{t('careerModal.submitting', 'Göndərilir...')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('careerModal.submit', 'Müraciəti göndər')}</span>
                      <AppIcon icon="lucide:send" size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
};

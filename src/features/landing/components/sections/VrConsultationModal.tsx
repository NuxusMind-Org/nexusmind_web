import { useCallback, useEffect, useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components/common/AppIcon';

export interface VrConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

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

export const VrConsultationModal = ({
  isOpen,
  onClose,
  videoId,
}: VrConsultationModalProps) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleCloseRequest = useCallback(() => {
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
      onCloseRef.current();
    };

    const handleNativeCancel = (event: Event) => {
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
      if (pressedOutside && isPointerOutsideDialog(event, dialog)) {
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
  }, []);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="vr-video-dialog"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <div className="relative w-full bg-[#161226]/95 border border-purple-400/25 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7),_0_0_24px_rgba(103,0,255,0.16)] overflow-hidden text-white">
        {/* Ambient corner glows */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-[#00F2FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="relative z-10 flex items-start justify-between gap-4 px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-white/10">
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#6700FF]/25 border border-[#00F2FF]/35 text-[#00F2FF] text-[11px] sm:text-[12px] font-semibold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-pulse" />
              <span>{t('vr.title', 'VR konsultasiya')}</span>
            </div>

            <h1
              id={titleId}
              className="text-[24px] sm:text-[30px] font-bold tracking-tight leading-tight text-white"
            >
              {t('vr.comingSoon', 'Tezliklə')}
            </h1>

            <p className="text-[14px] sm:text-[15px] text-white/75 leading-relaxed">
              {t(
                'vr.modalSubtitle',
                'VR konsultasiya xidməti tezliklə istifadəyə veriləcək. Hələlik tanıtım videosunu izləyə bilərsiniz.'
              )}
            </p>
          </div>

          <button
            type="button"
            autoFocus
            onClick={handleCloseRequest}
            aria-label={t('vr.close', 'Bağla')}
            className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 active:scale-95 text-white/75 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <AppIcon icon="lucide:x" size={18} />
          </button>
        </div>

        {/* Embedded YouTube Player */}
        <div className="relative z-10 p-4 sm:p-6">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/70 shadow-2xl">
            {isOpen && (
              <iframe
                src={embedUrl}
                title={t('vr.videoTitle', 'NexusMind VR konsultasiya tanıtım videosu')}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

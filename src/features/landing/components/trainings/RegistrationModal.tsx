import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import type { Training } from '../../constants/trainings';

interface RegistrationModalProps {
  training: Training | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({ training, isOpen, onClose }: RegistrationModalProps) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !training) return null;

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!name.trim()) tempErrors.name = 'Adınızı daxil edin';
    else if (name.trim().length < 2) tempErrors.name = 'Ad ən azı 2 hərfdən ibarət olmalıdır';

    if (!surname.trim()) tempErrors.surname = 'Soyadınızı daxil edin';
    else if (surname.trim().length < 2) tempErrors.surname = 'Soyad ən azı 2 hərfdən ibarət olmalıdır';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) tempErrors.email = 'E-poçt ünvanınızı daxil edin';
    else if (!emailRegex.test(email)) tempErrors.email = 'Düzgün e-poçt ünvanı daxil edin';

    if (!phone.trim()) tempErrors.phone = 'Telefon nömrənizi daxil edin';
    else if (phone.trim().length < 6) tempErrors.phone = 'Telefon nömrəsi düzgün deyil';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate server request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    // Reset states
    setName('');
    setSurname('');
    setEmail('');
    setPhone('');
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1117]/80 backdrop-blur-sm transition-all duration-300">
      {/* Modal Card */}
      <div className="glass-card w-full max-w-[500px] p-6 sm:p-8 rounded-lg relative overflow-hidden flex flex-col gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.5),_0_0_24px_rgba(0,242,255,0.15)] border-white/10 animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer border-0 bg-transparent outline-none p-1"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-[#00F2FF]/10 flex items-center justify-center text-[#00F2FF]">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-[20px] font-bold text-white tracking-tight">
              Uğurla Qeydiyyatdan Keçdiniz!
            </h3>
            <p className="text-white/70 text-[14px] leading-relaxed max-w-[340px]">
              <strong>"{training.title}"</strong> təliminə qeydiyyatınız təsdiqləndi. Məlumatlar e-poçt ünvanınıza göndərildi.
            </p>
            <Button onClick={handleClose} variant="primary" size="md" className="mt-4">
              Bağla
            </Button>
          </div>
        ) : (
          /* Form Screen */
          <>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[22px] font-bold text-white tracking-tight leading-tight">
                Təlimə Qeydiyyat
              </h3>
              <p className="text-white/60 text-[13px] leading-relaxed">
                Təlim: <strong className="text-[#00f2ff]">{training.title}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  label="Ad"
                  placeholder="Adınız"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="Soyad"
                  placeholder="Soyadınız"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  error={errors.surname}
                />
              </div>

              <Input
                label="E-poçt"
                type="email"
                placeholder="nümunə@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <Input
                label="Telefon"
                placeholder="+994 (50) 000-00-00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
              />

              {/* Form buttons */}
              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-white/5">
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="ghost"
                  size="md"
                >
                  Ləğv et
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  isLoading={isSubmitting}
                >
                  Qeydiyyatdan keç
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

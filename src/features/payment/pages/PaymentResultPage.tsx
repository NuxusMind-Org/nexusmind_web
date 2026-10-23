import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '@/features/landing/components/LandingNavbar';
import { Footer } from '@/features/landing/components/Footer';
import { GradientBackground, SEO, AppIcon } from '@/components';
import { ScrollReveal } from '@/features/landing/components/ScrollReveal';
import { PaymentStatusCard } from '../components/PaymentStatusCard';
import { PaymentReceiptDetails } from '../components/PaymentReceiptDetails';
import { PaymentActions } from '../components/PaymentActions';
import { parsePaymentParams } from '../utils/parsePaymentParams';
import type { PaymentStatus } from '../types/payment';

export const PaymentResultPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const initialDetails = parsePaymentParams(searchParams, 'pending');

  const [currentStatus, setCurrentStatus] = useState<PaymentStatus>(() => {
    const rawStatus = (searchParams.get('status') || '').toLowerCase();
    if (['success', 'approved', 'ok', 'paid'].includes(rawStatus)) return 'success';
    if (['error', 'failed', 'declined', 'rejected', 'canceled'].includes(rawStatus)) return 'error';
    return 'pending';
  });

  const [details, setDetails] = useState({
    ...initialDetails,
    status: currentStatus,
  });

  const [isVerifying, setIsVerifying] = useState(currentStatus === 'pending');

  useEffect(() => {
    if (currentStatus === 'pending') {
      setIsVerifying(true);
      // Simulate verification / check callback
      const timer = setTimeout(() => {
        setIsVerifying(false);
        // If an explicit error or success param exists in searchParams, respect it; otherwise resolve to success
        const rawStatus = (searchParams.get('status') || '').toLowerCase();
        const resolved: PaymentStatus = ['error', 'failed', 'declined'].includes(rawStatus)
          ? 'error'
          : 'success';

        setCurrentStatus(resolved);
        setDetails((prev) => ({
          ...prev,
          status: resolved,
        }));
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [currentStatus, searchParams]);

  const handleRefresh = () => {
    setCurrentStatus('pending');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentStatus('success');
      setDetails((prev) => ({ ...prev, status: 'success' }));
    }, 1500);
  };

  const getPageTitle = () => {
    if (isVerifying) return t('payment.resultChecking', 'Ödəniş nəticəsi yoxlanılır...');
    if (currentStatus === 'success') return t('payment.resultSuccessTitle', 'Əməliyyat Uğurla Qeydə Alındı');
    return t('payment.resultFailedTitle', 'Əməliyyat Qeydə Alınmadı');
  };

  const getPageSubtitle = () => {
    if (isVerifying) {
      return t(
        'payment.resultCheckingDesc',
        'Zəhmət olmasa bir neçə saniyə gözləyin, bank sistemi ilə əlaqə qurulur və əməliyyat statusu yoxlanılır.'
      );
    }
    if (currentStatus === 'success') {
      return t(
        'payment.resultSuccessDesc',
        'Ödəniş sorğusu emal edildi və sistemimizdə uğurla qeydə alındı.'
      );
    }
    return t(
      'payment.resultFailedDesc',
      'Ödəniş sorğusu emal edilərkən xəta baş verdi və ya əməliyyat tamamlanmadı.'
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white relative overflow-x-hidden">
      <SEO
        metaTitle={`${t('payment.resultTitle', 'Ödəniş Nəticəsi')} | NexusMind`}
        metaDescription={t(
          'payment.resultMetaDesc',
          'NexusMind platformasında ödəniş əməliyyatının nəticəsi və cari statusu.'
        )}
      />

      {/* Unified Fixed WebGL Gradient Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <GradientBackground speed={0.8} resolution={0.5} />
      </div>

      {/* Top Navbar */}
      <div className="relative z-20">
        <LandingNavbar activePage="payment" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full pt-[110px] sm:pt-[130px] md:pt-[140px] pb-20 md:pb-28 px-4 sm:px-8 flex items-center justify-center">
        <ScrollReveal className="w-full flex justify-center">
          <PaymentStatusCard
            status={isVerifying ? 'pending' : currentStatus}
            title={getPageTitle()}
            subtitle={getPageSubtitle()}
          >
            {isVerifying ? (
              <div className="w-full py-8 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin flex items-center justify-center">
                  <AppIcon icon="lucide:shield-check" size={24} className="text-cyan-400 animate-pulse" />
                </div>
                <p className="text-sm text-cyan-300 font-light">
                  {t('payment.verifyingSecure', '3D Secure və bank qeydiyyatı təsdiqlənir...')}
                </p>
              </div>
            ) : (
              <>
                <PaymentReceiptDetails details={details} />
                <PaymentActions
                  status={currentStatus}
                  onRefresh={handleRefresh}
                />
              </>
            )}
          </PaymentStatusCard>
        </ScrollReveal>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

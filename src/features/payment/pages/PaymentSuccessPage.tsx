import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '@/features/landing/components/LandingNavbar';
import { Footer } from '@/features/landing/components/Footer';
import { GradientBackground, SEO } from '@/components';
import { ScrollReveal } from '@/features/landing/components/ScrollReveal';
import { PaymentStatusCard } from '../components/PaymentStatusCard';
import { PaymentReceiptDetails } from '../components/PaymentReceiptDetails';
import { PaymentActions } from '../components/PaymentActions';
import { parsePaymentParams } from '../utils/parsePaymentParams';

export const PaymentSuccessPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const details = parsePaymentParams(searchParams, 'success');

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white relative overflow-x-hidden">
      <SEO
        metaTitle={`${t('payment.successTitle', 'Ödəniş Uğurla Tamamlandı')} | NexusMind`}
        metaDescription={t(
          'payment.successDesc',
          'Ödənişiniz uğurla təsdiqləndi. Rezervasiya təfərrüatlarınızı nəzərdən keçirin.'
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
            status="success"
            title={t('payment.successTitle', 'Ödəniş Uğurla Tamamlandı!')}
            subtitle={t(
              'payment.successSubtitle',
              'Təşəkkür edirik! Rezervasiyanız və ya əməliyyatınız uğurla təsdiqləndi. Təfərrüatlar aşağıda qeyd olunmuşdur.'
            )}
          >
            <PaymentReceiptDetails details={details} />
            <PaymentActions status="success" />
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

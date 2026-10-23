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

export const PaymentErrorPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const details = parsePaymentParams(searchParams, 'error');

  const troubleshootingTips = [
    t('payment.tip1', 'Kart balansınızın əməliyyat məbləğinə kifayət etdiyindən əmin olun.'),
    t('payment.tip2', '3D Secure OTP kodunu düzgün və vaxtında daxil etdiyinizi yoxlayın.'),
    t('payment.tip3', 'Kartınızın internet və ya onlayn ödənişlərə açıq olduğunu dəqiqləşdirin.'),
    t('payment.tip4', 'Problem davam edərsə, bankınız və ya dəstək komandamızla əlaqə saxlayın.'),
  ];

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white relative overflow-x-hidden">
      <SEO
        metaTitle={`${t('payment.errorTitle', 'Ödəniş Uğursuz Oldu')} | NexusMind`}
        metaDescription={t(
          'payment.errorDesc',
          'Əməliyyatı həyata keçirmək mümkün olmadı. Kart məlumatlarınızı yoxlayıb yenidən cəhd edin.'
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
            status="error"
            title={t('payment.errorTitle', 'Ödəniş Uğursuz Oldu')}
            subtitle={t(
              'payment.errorSubtitle',
              'Təəssüf ki, əməliyyatı tamamlamaq mümkün olmadı. Kartınızdan heç bir vəsait çıxılmamışdır.'
            )}
          >
            {/* Payment Details breakdown */}
            <PaymentReceiptDetails details={details} />

            {/* Troubleshooting Checklist */}
            <div className="w-full mt-4 bg-rose-500/[0.05] border border-rose-500/20 rounded-2xl p-4 sm:p-5 text-left flex flex-col gap-2.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-300/80 flex items-center gap-1.5">
                <AppIcon icon="lucide:help-circle" size={14} className="text-rose-400" />
                {t('payment.troubleshootingTitle', 'Nə edə bilərsiniz?')}
              </span>
              <ul className="text-xs sm:text-[13px] text-white/75 flex flex-col gap-2 pl-1 font-light">
                {troubleshootingTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <PaymentActions status="error" />
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

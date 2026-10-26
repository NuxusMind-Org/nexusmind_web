import { LandingNavbar } from '../components/LandingNavbar';
import { Footer } from '../components/Footer';
import { GradientBackground, SEO } from '@/components';
import { ScrollReveal } from '../components/ScrollReveal';

export const TermsPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white relative overflow-x-hidden">
      <SEO
        metaTitle="İstifadə Şərtləri və Qaydaları | NexusMind"
        metaDescription="NexusMind MMC istifadə şərtləri, xidmət qaydaları, hüquq və öhdəliklər haqqında rəsmi məlumat."
      />

      {/* Unified Fixed Moving WebGL Gradient Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <GradientBackground speed={0.8} resolution={0.5} />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <LandingNavbar />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full pt-[110px] sm:pt-[130px] md:pt-[150px] pb-20 md:pb-32 px-4 sm:px-8 md:px-12">
        <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-10">
          
          {/* Header Section */}
          <ScrollReveal className="w-full flex flex-col items-center text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-[12px] sm:text-[13px] font-semibold tracking-wide uppercase backdrop-blur-md shadow-sm mb-4">
              <span>Hüquqi Məlumat</span>
            </div>

            <h1 className="text-[26px] min-[420px]:text-[30px] sm:text-[38px] md:text-[44px] font-bold text-white tracking-tight leading-[1.2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] mb-4 text-center">
              İSTİFADƏ ŞƏRTLƏRİ VƏ QAYDALARI
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[13px] sm:text-[14px] text-white/80">
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                Son yenilənmə tarixi: <strong className="text-white">26 oktyabr 2026</strong>
              </span>
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                Şirkət: <strong className="text-white">NexusMind MMC</strong>
              </span>
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                Veb-sayt: <strong className="text-white">www.nexusmind.az</strong>
              </span>
            </div>
          </ScrollReveal>

          {/* Straight Text Document Content Card */}
          <ScrollReveal>
            <div className="w-full bg-[#120f26]/40 backdrop-blur-2xl border border-white/15 rounded-[28px] p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col gap-8 text-white/90 leading-relaxed font-normal">
              
              {/* Subtle top specular sheen */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              {/* Section 1 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight border-b border-white/10 pb-2">
                  1. Əhatə Dairəsi və Xidmətin Tərifi
                </h2>
                <div className="flex flex-col gap-2.5 text-[15px] sm:text-[16px] text-white/85">
                  <p>
                    <strong className="text-white">1.1.</strong> NexusMind MMC rəqəmsal mental sağlamlıq sahəsində xidmətlər təqdim edən, veb, mobil və Virtual Reallıq (VR) interfeysləri vasitəsilə istifadəçilərə dəstək alətləri təmin edən texnologiya platformasıdır.
                  </p>
                  <p>
                    <strong className="text-white">1.2.</strong> Platforma daxilində təqdim olunan məzmun və interfeyslər Azərbaycan, ingilis və rus dillərində əlçatandır.
                  </p>
                  <p>
                    <strong className="text-white">1.3.</strong> NexusMind MMC birbaşa tibb mərkəzi, psixoloji müayinə və ya müalicə müəssisəsi deyil; pasiyent yönləndirilməsi, seansların idarə olunması, ödəniş ekosistemi və əməliyyat koordinasiyasını təmin edən yüksək texnologiyalı teletelerapiya və rəqəmsal mental rifah platformasıdır.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight border-b border-white/10 pb-2">
                  2. Eksklüziv Tərəfdaşlıq, Psixoloq Seçimi və Peşəkar Xidmətlər
                </h2>
                <div className="flex flex-col gap-2.5 text-[15px] sm:text-[16px] text-white/85">
                  <p>
                    <strong className="text-white">2.1.</strong> NexusMind platformasında təqdim olunan teletelerapiya və canlı psixoloji konsultasiya xidmətləri bizim eksklüziv strateji tərəfdaşımız olan Bakı Psixologiya Mərkəzi (BPM) tərəfindən həyata keçirilir.
                  </p>
                  <p>
                    <strong className="text-white">2.2.</strong> Platforma daxilində fəaliyyət göstərən bütün mütəxəssislər yalnız Bakı Psixologiya Mərkəzinin xüsusi seçim və müsahibə prosedurundan keçmiş, təsdiq edilmiş, sertifikatlaşdırılmış və təcrübəli psixoloqlarıdır.
                  </p>
                  <p>
                    <strong className="text-white">2.3. Mütəxəssis Seçimi və Dəyişdirilməsi:</strong> İstifadəçi (pasiyent) platformada təqdim olunan BPM mütəxəssisləri siyahısından öz psixoloqunu müstəqil şəkildə seçir. İstifadəçi seçdiyi psixoloqdan narazı qaldıqda və ya başqa mütəxəssislə davam etmək istədikdə, NexusMind-a müraciət edərək psixoloqun digər təsdiq edilmiş BPM mütəxəssisi ilə dəyişdirilməsini tələb edə bilər. Həmçinin, psixoloq əsaslı səbəbdən konsultasiyanı keçirə bilmədikdə, NexusMind istifadəçini digər BPM psixoloquna yönləndirə bilər.
                  </p>
                  <p>
                    <strong className="text-white">2.4. Peşəkar Müstəqillik:</strong> Psixoloji seanslar zamanı göstərilən peşəkar xidmət, məsləhətlər və məxfilik (psixoloji konfidensiallıq) BPM-in peşəkar etik kodeksinə və Azərbaycan Respublikasının qanunvericiliyinə uyğun olaraq mütəxəssislər tərəfindən təmin edilir. NexusMind psixoloji xidmətin məzmununa, psixoloqun peşəkar qərarlarına, konsultasiyanın metod və nəticələrinə heç bir halda müdaxilə etmir.
                  </p>
                  <p>
                    <strong className="text-white">2.5.</strong> NexusMind MMC rəqəmsal infrastrukturun (veb, mobil, VR) fasiləsiz və təhlükəsiz fəaliyyətinə, onlayn seansların texniki təşkilinə və ödənişlərin qəbuluna cavabdehdir.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight border-b border-white/10 pb-2">
                  3. Tibbi İmtina, VR Yaş Məhdudiyyəti və Təcili Krizis Halları
                </h2>
                <div className="flex flex-col gap-2.5 text-[15px] sm:text-[16px] text-white/85">
                  <p>
                    <strong className="text-white">3.1.</strong> NexusMind rəqəmsal alətləri və VR interfeysləri psixoloji rifahı dəstəkləmək üçün nəzərdə tutulub və standart şəraitdə stasionar təcili tibbi müdaxiləni əvəz etmir.
                  </p>
                  <p>
                    <strong className="text-white">3.2. Kəskin Hallar və Pasiyent Təhlükəsizliyi:</strong> Əgər istifadəçinin emosional və ya psixoloji vəziyyəti kəskin dərəcədə pisləşərsə, böhran anında platforma daxilində göstərilən xüsusi təcili əlaqə nömrəsi vasitəsilə birbaşa Bakı Psixologiya Mərkəzinin (BPM) növbətçi psixoloq heyəti və həkim mütəxəssisləri ilə dərhal əlaqə saxlamaq mümkündür. Bundan əlavə, NexusMind platformada pasiyentin həyat və sağlamlığı üçün təcili təhlükə yarada biləcək hal aşkar etdikdə, məsələni dərhal BPM-in müvafiq məsul şəxsinə yönləndirir. Təcili müdaxiləyə dair peşəkar qərar BPM və müvafiq psixoloqun səlahiyyətindədir. Həyati təhlükə anında dərhal Dövlət Təcili Tibbi Yardım xidmətinə (103) müraciət edilməlidir.
                  </p>
                  <p>
                    <strong className="text-white">3.3. VR İstifadəsi üçün Yaş Həddi:</strong> Virtual Reallıq (VR) interfeyslərimizdən və avadanlıqlarından istifadə üçün minimum yaş həddi 13 yaşdır. 13–18 yaş arası istifadəçilər VR xidmətlərindən yalnız valideynlərinin və ya qanuni qəyyumlarının razılığı və nəzarəti altında istifadə edə bilərlər.
                  </p>
                  <p>
                    <strong className="text-white">3.4.</strong> VR interfeyslərindən istifadə zamanı başgicəllənmə, hərəkət xəstəliyi (motion sickness) və ya fiziki narahatlıq hiss edildikdə seans dərhal dayandırılmalıdır.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight border-b border-white/10 pb-2">
                  4. Qeydiyyat, Hesab Təhlükəsizliyi, Məxfilik və Süni İntellekt (AI)
                </h2>
                <div className="flex flex-col gap-2.5 text-[15px] sm:text-[16px] text-white/85">
                  <p>
                    <strong className="text-white">4.1.</strong> Platformadan istifadə etmək üçün tələb olunan qeydiyyat məlumatlarının dəqiqliyinə və hesabınızın (şifrə, daxil olma məlumatları) təhlükəsizliyinə görə birbaşa siz məsuliyyət daşıyırsınız.
                  </p>
                  <p>
                    <strong className="text-white">4.2.</strong> Şəxsi məlumatların və seans qeydlərinin qorunması qaydaları Məxfilik Siyasəti (Privacy Policy) sənədi və Azərbaycan Respublikasının qanunvericiliyi ilə nizamlanır.
                  </p>
                  <p>
                    <strong className="text-white">4.3. Məlumatların İstifadəsi Məhdudiyyəti:</strong> İstifadəçilərə aid şəxsi, psixoloji və sağlamlıq məlumatları yalnız xidmətin təşkili məqsədilə işlənilir. Bu məlumatlar istifadəçinin açıq razılığı olmadan reklam, marketinq və ya üçüncü şəxslərin kommersiya maraqları üçün istifadə edilə bilməz.
                  </p>
                  <p>
                    <strong className="text-white">4.4. Audio və Video Yazıların Qadağan Edilməsi:</strong> Psixoloji konsultasiyaların audio və ya video formatında qeydə alınması (yazılması) həyata keçirilmir. Seansın audio və ya video yazısının aparılması yalnız ayrıca hüquqi əsas və tərəflərin yazılı razılığı olduqda mümkündür.
                  </p>
                  <p>
                    <strong className="text-white">4.5. Süni İntellekt (AI) Funksiyaları:</strong> Platformada tətbiq edilən süni intellekt əsaslı funksiyalar psixoloqun peşəkar qərarını əvəz etmir və AI tərəfindən yaradılan hər hansı tövsiyə, xülasə və ya analiz psixoloqun peşəkar qiymətləndirməsi olmadan yekun psixoloji rəy hesab edilə bilməz. İstifadəçinin şəxsiyyətini müəyyən etməyə imkan verən fərdi məlumatlar AI modellərinin təlimi (training) və ya kommersiya məqsədləri üçün istifadə edilmir.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight border-b border-white/10 pb-2">
                  5. Seansların Təyin Olunması, Ödənişlər, Ləğv və &quot;No-Show&quot; (Gəlməmə) Qaydaları
                </h2>
                <div className="flex flex-col gap-2.5 text-[15px] sm:text-[16px] text-white/85">
                  <p>
                    <strong className="text-white">5.1.</strong> Bakı Psixologiya Mərkəzinin mütəxəssisləri ilə görüş saatları Platforma vasitəsilə onlayn bron edilir və konsultasiya haqqı NexusMind-in daxili ödəniş sistemi vasitəsilə ödənilir.
                  </p>
                  <p>
                    <strong className="text-white">5.2. 24 saatdan əvvəl ləğv etmə:</strong> Təyin olunmuş seansın başlama vaxtına 24 saat və ya daha çox müddət qalmış edilən ləğvlərdə ödənilmiş məbləğin 100%-i geri qaytarılır və ya seans başqa vaxta keçirilir.
                  </p>
                  <p>
                    <strong className="text-white">5.3. 24 saatdan az qalmış ləğv etmə:</strong> İstifadəçi konsultasiyanı seansın başlanmasına 24 saatdan az müddət qalmış ləğv edərsə, ödənilmiş məbləğin 50%-i geri qaytarılır.
                  </p>
                  <p>
                    <strong className="text-white">5.4. Gəlməmə (&quot;No-Show&quot;):</strong> Əgər istifadəçi əvvəlcədən xəbərdarlıq etmədən və üzrlü səbəb olmadan təyin olunmuş seans vaxtında görüşə qoşulmazsa (&quot;No-show&quot;), ödənilmiş seans haqqı geri qaytarılmır və xidmət göstərilmiş hesab olunur.
                  </p>
                  <p>
                    <strong className="text-white">5.5. Psixoloq və ya Texniki Nasazlıq Səbəbindən Baş Tutmayan Seanslar:</strong> Psixoloq konsultasiyada iştirak etmədikdə və ya birbaşa NexusMind-in məsuliyyət dairəsində olan texniki nasazlıq səbəbindən konsultasiya baş tutmadıqda, istifadəçiyə ödənilmiş məbləğin 100% geri qaytarılması və ya istifadəçinin razılığı ilə seansın başqa vaxtda təşkili variantlarından biri təqdim edilir.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight border-b border-white/10 pb-2">
                  6. İntellektual Mülkiyyət Hüquqları
                </h2>
                <div className="flex flex-col gap-2.5 text-[15px] sm:text-[16px] text-white/85">
                  <p>
                    <strong className="text-white">6.1.</strong> www.nexusmind.az platformasında, mobil tətbiqdə və VR mühitlərində yerləşən bütün proqram təminatı, dizaynlar, metodologiyalar, brend elementləri və audio-vizual məzmunlar NexusMind MMC-nin mülkiyyətidir (tərəfdaşımız Bakı Psixologiya Mərkəzinə məxsus brend, loqo və materiallar istisna olmaqla) və Azərbaycan Respublikasının İntellektual Mülkiyyət Agentliyi tərəfindən müəlliflik şəhadətnaməsi ilə qorunur.
                  </p>
                  <p>
                    <strong className="text-white">6.2.</strong> İcazəsiz kopyalanması, yayılması və ya kommersiya məqsədilə istifadəsi qadağandır.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight border-b border-white/10 pb-2">
                  7. Şikayətlərin İdarə Edilməsi və Məsuliyyətin Məhdudlaşdırılması
                </h2>
                <div className="flex flex-col gap-2.5 text-[15px] sm:text-[16px] text-white/85">
                  <p>
                    <strong className="text-white">7.1.</strong> NexusMind MMC texniki infrastrukturun fasiləsizliyini təmin etmək üçün bütün ağlabatan tədbirləri görür, lakin istifadəçinin internet bağlantısı, istifadəçi cihazlarından qaynaqlanan problemlər və ya NexusMind-in nəzarətində olmayan üçüncü tərəf infrastrukturlarının (bulud serverləri, ödəniş şlüzləri, internet provayderləri) qlobal texniki kəsintilərinə görə cavabdehlik daşımır.
                  </p>
                  <p>
                    <strong className="text-white">7.2.</strong> Tərəfdaş psixoloqlar tərəfindən aparılan konsultasiyaların keyfiyyəti, etik davranışı və peşəkar məzmunu üzrə birbaşa məsuliyyəti xidməti təqdim edən mütəxəssis və Bakı Psixologiya Mərkəzi daşıyır.
                  </p>
                  <p>
                    <strong className="text-white">7.3. Şikayətlərə Baxılması:</strong> İstifadəçilər tərəfindən daxil olan bütün ilkin müraciət və şikayətlər NexusMind tərəfindən qəbul edilir. Texniki xarakterli şikayətlər birbaşa NexusMind tərəfindən araşdırılır və həll olunur. Psixoloqun peşəkar fəaliyyəti, etik davranışı və konsultasiyanın məzmunu ilə bağlı şikayətlər isə araşdırılması və müvafiq tədbir görülməsi üçün NexusMind tərəfindən Bakı Psixologiya Mərkəzinə (BPM) yönləndirilir.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight border-b border-white/10 pb-2">
                  8. Dəyişikliklər və Tətbiq Edilən Qanunvericilik
                </h2>
                <div className="flex flex-col gap-2.5 text-[15px] sm:text-[16px] text-white/85">
                  <p>
                    <strong className="text-white">8.1.</strong> NexusMind MMC bu İstifadə Şərtlərini istənilən vaxt yeniləmək hüququnu özündə saxlayır. Dəyişikliklər saytda dərc edildiyi andan qüvvəyə minir.
                  </p>
                  <p>
                    <strong className="text-white">8.2.</strong> Bu Şərtlər Azərbaycan Respublikasının qanunvericiliyinə tabedir və yaranan mübahisələr ilk növbədə danışıqlar yolu ilə, mümkün olmadıqda isə Bakı şəhərinin müvafiq məhkəmələrində həll olunur.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight border-b border-white/10 pb-2">
                  9. Əlaqə
                </h2>
                <div className="flex flex-col gap-2 text-[15px] sm:text-[16px] text-white/85">
                  <p>
                    İstifadə Şərtləri, texniki dəstək və ya müraciətlərlə bağlı suallarınız üçün:
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-1">
                    <p>
                      E-poçt:{' '}
                      <a
                        href="mailto:info@nexusmind.az"
                        className="text-white hover:text-accent font-medium underline transition-colors"
                      >
                        info@nexusmind.az
                      </a>
                    </p>
                    <p>
                      Veb-sayt:{' '}
                      <a
                        href="https://www.nexusmind.az"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-accent font-medium underline transition-colors"
                      >
                        www.nexusmind.az
                      </a>
                    </p>
                  </div>
                </div>
              </section>

            </div>
          </ScrollReveal>

        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

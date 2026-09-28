import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Camera,
  CameraOff,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
  AlertCircle,
  Loader2,
  Sparkles,
  SunMedium,
  UserCheck,
} from 'lucide-react';
import nexusMindLogo from '@/assets/svg/NexusMindLogo.svg';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';
import { authApi } from '../api/auth.api';
import type { PasientRegisterDto } from '@/api/types';

export const FaceCapture = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const registrationData = location.state?.registrationData as PasientRegisterDto | undefined;
  const formData = location.state?.formData;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraLoading, setIsCameraLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [isFlashing, setIsFlashing] = useState(false);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<'idle' | 'uploading' | 'registering'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Initialize camera stream
  useEffect(() => {
    let activeStream: MediaStream | null = null;
    let isMounted = true;

    async function initCamera() {
      try {
        setIsCameraLoading(true);
        setCameraError(null);

        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('Kamera dəstəklənmir');
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        activeStream = stream;
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsStreaming(true);
      } catch (err: any) {
        if (!isMounted) return;
        console.error('Camera access error:', err);
        setCameraError(
          err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
            ? 'Kameraya daxil olmağa icazə verilmədi. Zəhmət olmasa brauzer parametrlərindən kameraya icazə verin.'
            : 'Kamera aktivləşdirilə bilmədi. Zəhmət olmasa cihazınızı və ya kamera parametrlərini yoxlayın.'
        );
      } finally {
        if (isMounted) {
          setIsCameraLoading(false);
        }
      }
    }

    if (!isSuccess) {
      initCamera();
    }

    return () => {
      isMounted = false;
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [retryCount, isSuccess]);

  const navigateToOtp = () => {
    if (!registrationData) return;
    navigate(PATHS.VERIFY_OTP, {
      state: {
        email: registrationData.email,
        password: registrationData.password,
        isRegistrationFlow: true,
      },
    });
  };

  // Success auto-redirect to OTP verification page
  useEffect(() => {
    if (!isSuccess) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigateToOtp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSuccess, registrationData]);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (capturedPreview) {
        URL.revokeObjectURL(capturedPreview);
      }
    };
  }, [capturedPreview]);

  const processPhoto = async (photo: Blob | File) => {
    if (!registrationData) {
      setSubmitError('Qeydiyyat məlumatları tapılmadı. Zəhmət olmasa yenidən qeydiyyatdan keçin.');
      return;
    }

    try {
      setIsProcessing(true);
      setProcessingStep('uploading');
      setSubmitError(null);

      // 1. Upload to secondary backend POST /auth/upload
      const uploadedUrl = await authApi.uploadRegistrationImage(photo);

      // 2. Submit full registration DTO + registrationImageUrl to secondary backend POST /auth/add
      setProcessingStep('registering');
      await authApi.register({
        ...registrationData,
        registrationImageUrl: uploadedUrl,
      });

      // 3. Stop active camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      // 4. Trigger Success State
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Registration with face error:', err);
      let message = 'Qeydiyyat zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.';

      if (err?.response?.status === 500) {
        message = 'Serverdə daxili xəta baş verdi (Status 500). Zəhmət olmasa bir qədər sonra yenidən cəhd edin və ya backend xidmətini yoxlayın.';
      } else if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (typeof err?.response?.data === 'string' && err.response.data.length < 150) {
        message = err.response.data;
      } else if (err?.message) {
        message = err.message;
      }

      setSubmitError(message);
      setCapturedPreview(null);
    } finally {
      setIsProcessing(false);
      setProcessingStep('idle');
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !isStreaming || isProcessing) return;

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 250);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontal on canvas so image orientation matches the mirrored live preview
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setSubmitError('Şəkli çəkmək mümkün olmadı. Yenidən cəhd edin.');
          return;
        }
        const previewUrl = URL.createObjectURL(blob);
        setCapturedPreview(previewUrl);
        processPhoto(blob);
      },
      'image/jpeg',
      0.92
    );
  };

  const handleGoBack = () => {
    navigate(PATHS.REGISTER, {
      state: {
        formData,
      },
    });
  };

  // If user navigated directly without filling form
  if (!registrationData && !isSuccess) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-12 text-center">
        <AlertCircle size={52} className="text-amber-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Qeydiyyat Məlumatı Tapılmadı</h2>
        <p className="text-ui-muted text-sm max-w-sm mb-6">
          Üz təsdiqini tamamlamaq üçün ilk öncə qeydiyyat formasını doldurmalısınız.
        </p>
        <Link to={PATHS.REGISTER}>
          <Button variant="primary" size="md">
            Qeydiyyat səhifəsinə qayıt
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col relative">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <Link
          to={PATHS.HOME}
          className="flex items-center hover:opacity-85 transition-opacity"
        >
          <img
            src={nexusMindLogo}
            alt="Nexus Mind Logo"
            className="h-10 object-contain cursor-pointer"
          />
        </Link>

        <button
          type="button"
          onClick={handleGoBack}
          disabled={isProcessing}
          className="flex items-center gap-2 text-xs sm:text-sm text-ui-muted hover:text-white transition-colors disabled:opacity-50 px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={16} />
          <span>Məlumatları dəyiş</span>
        </button>
      </div>

      {/* Title & Instructions */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-2">
          Üz Tanıma və Təsdiq
        </h1>
        <p className="text-sm text-ui-muted max-w-md mx-auto">
          Zəhmət olmasa üzünüzü oval çərçivəyə uyğunlaşdırın və çəkiliş düyməsinə klikləyin.
        </p>

        {/* Biometric Tips Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs bg-white/5 border border-white/10 text-white/80">
            <UserCheck size={12} className="text-brand" />
            Üzünüzü mərkəzdə saxlayın
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs bg-white/5 border border-white/10 text-white/80">
            <SunMedium size={12} className="text-amber-300" />
            İşıqlı mühitdə dayanın
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs bg-white/5 border border-white/10 text-white/80">
            <Sparkles size={12} className="text-accent" />
            Eynəkləri çıxarın
          </span>
        </div>
      </div>

      {/* Camera Viewport Area */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-full max-w-[500px] h-[390px] sm:h-[450px] rounded-3xl overflow-hidden bg-black/80 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center justify-center">
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover scale-x-[-1] transition-opacity duration-300 ${
              isStreaming && !capturedPreview ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Shutter Flash Animation */}
          {isFlashing && (
            <div className="absolute inset-0 bg-white z-30 transition-opacity duration-200" />
          )}

          {/* Captured Preview */}
          {capturedPreview && (
            <img
              src={capturedPreview}
              alt="Captured Face"
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1] z-10"
            />
          )}

          {/* Human Face Oval Guide & Biometric Mask */}
          {!cameraError && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
              {/* Authentic Oval Face Silhouette */}
              <div
                className="w-[230px] sm:w-[260px] h-[310px] sm:h-[350px] rounded-[50%_50%_45%_45%_/_58%_58%_42%_42%] border-2 border-brand/90 relative flex items-center justify-center transition-all duration-300"
                style={{
                  boxShadow:
                    '0 0 0 9999px rgba(10, 17, 23, 0.78), 0 0 35px rgba(0, 242, 255, 0.4), inset 0 0 25px rgba(0, 242, 255, 0.12)',
                }}
              >
                {/* Top Forehead Alignment Bar */}
                <div className="absolute top-3.5 flex items-center justify-center">
                  <div className="w-12 h-1 rounded-full bg-brand shadow-[0_0_10px_#00F2FF]" />
                </div>

                {/* Bottom Chin Alignment Bar */}
                <div className="absolute bottom-3.5 flex items-center justify-center">
                  <div className="w-14 h-1 rounded-full bg-brand shadow-[0_0_10px_#00F2FF]" />
                </div>

                {/* Left & Right Cheekbone Marker Ticks */}
                <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-brand/80 shadow-[0_0_8px_#00F2FF]" />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-brand/80 shadow-[0_0_8px_#00F2FF]" />

                {/* Eye Level Reference Line */}
                <div className="absolute top-[40%] w-[84%] flex items-center justify-between px-3 opacity-50">
                  <div className="w-7 h-[1.5px] bg-brand shadow-[0_0_6px_#00F2FF]" />
                  <span className="text-[10px] font-mono tracking-widest text-brand uppercase select-none">
                    GÖZ XƏTTİ
                  </span>
                  <div className="w-7 h-[1.5px] bg-brand shadow-[0_0_6px_#00F2FF]" />
                </div>

                {/* Vertical Laser Scan Animation */}
                {isStreaming && !capturedPreview && !isProcessing && (
                  <div className="absolute inset-x-6 h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent animate-scan shadow-[0_0_14px_#00F2FF]" />
                )}
              </div>
            </div>
          )}

          {/* Camera Loading State */}
          {isCameraLoading && !cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D1117]/85 z-25 text-center p-6">
              <Loader2 size={40} className="text-brand animate-spin mb-3" />
              <p className="text-base text-white font-medium">Kamera başladılır...</p>
              <p className="text-xs text-ui-muted mt-1">Zəhmət olmasa gözləyin</p>
            </div>
          )}

          {/* Camera Permission / Device Error */}
          {cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D1117]/95 z-25 text-center p-6">
              <CameraOff size={44} className="text-red-400 mb-3" />
              <p className="text-base text-red-200 font-medium mb-1.5">
                Kamera tapılmadı və ya icazə verilmədi
              </p>
              <p className="text-xs text-ui-muted mb-5 max-w-[280px] leading-relaxed">
                {cameraError}
              </p>
              <div className="flex justify-center w-full max-w-[200px]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRetryCount((prev) => prev + 1)}
                  className="w-full text-xs"
                >
                  <RefreshCw size={14} className="mr-1.5" />
                  Yenidən yoxla
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center gap-2.5 mt-4 text-sm text-brand font-medium bg-brand/10 border border-brand/20 py-2 px-4 rounded-full animate-pulse">
            <Loader2 size={16} className="animate-spin" />
            <span>
              {processingStep === 'uploading'
                ? 'Üz şəkli yüklənir...'
                : 'Qeydiyyat tamamlanır...'}
            </span>
          </div>
        )}

        {/* Error Alert Banner */}
        {submitError && (
          <div className="mt-4 text-xs sm:text-sm text-red-300 font-medium bg-red-950/40 border border-red-500/30 py-3 px-4 rounded-xl max-w-[500px] w-full flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-start gap-2">
              <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{submitError}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitError(null);
                setCapturedPreview(null);
              }}
              className="text-white hover:text-red-200 underline text-xs shrink-0 font-semibold cursor-pointer"
            >
              Yenidən cəhd et
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex flex-col items-center gap-4">
        {!cameraError && (
          <div className="flex items-center justify-center">
            {/* Prominent Selfie Shutter Button */}
            <button
              type="button"
              onClick={handleCapture}
              disabled={!isStreaming || isProcessing}
              className="relative group p-1 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-95 cursor-pointer"
              aria-label="Selfie çək"
            >
              <div className="w-20 h-20 rounded-full border-4 border-white/70 p-1 flex items-center justify-center transition-all group-hover:border-brand group-hover:shadow-[0_0_28px_rgba(0,242,255,0.45)]">
                <div className="w-full h-full rounded-full bg-white group-hover:bg-brand transition-colors flex items-center justify-center text-slate-900 shadow-xl">
                  <Camera size={28} className="transition-transform group-hover:scale-110" />
                </div>
              </div>
            </button>
          </div>
        )}

        <p className="text-xs text-ui-muted text-center max-w-sm">
          Üzünüz oval çərçivə daxilində aydın görünən zaman çəkiliş düyməsinə klikləyin.
        </p>
      </div>

      {/* Success Modal Overlay */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 bg-[#0D1117]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/80 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)] animate-bounce">
            <CheckCircle2 size={54} className="text-emerald-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            Üz təsdiqi tamamlandı!
          </h2>

          <p className="text-ui-muted text-sm sm:text-base max-w-sm mb-6 leading-relaxed">
            Qeydiyyatınız qəbul edildi. Email ünvanınıza göndərilən təsdiq kodunu daxil etmək üçün OTP səhifəsinə yönləndirilirsiniz.
          </p>

          <div className="flex items-center gap-2.5 text-accent text-sm font-medium mb-8 bg-white/5 py-2.5 px-5 rounded-full border border-white/10 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span>{countdown} saniyə ərzində OTP təsdiq səhifəsinə yönləndirilirsiniz...</span>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={navigateToOtp}
            className="w-full max-w-xs font-semibold"
          >
            OTP təsdiqinə keç
          </Button>
        </div>
      )}
    </div>
  );
};

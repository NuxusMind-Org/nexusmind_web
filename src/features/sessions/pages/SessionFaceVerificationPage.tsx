import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppIcon } from '@/components';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';
import { appointmentsApi } from '@/api/appointments.api';

export const SessionFaceVerificationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraLoading, setIsCameraLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [isFlashing, setIsFlashing] = useState(false);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Verification results: 'idle' | 'success' | 'mismatch' | 'error'
  const [verificationStatus, setVerificationStatus] = useState<
    'idle' | 'success' | 'mismatch' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      } catch (err: unknown) {
        if (!isMounted) return;
        console.error('Camera access error:', err);
        const errObj = err as { name?: string };
        setCameraError(
          errObj.name === 'NotAllowedError' || errObj.name === 'PermissionDeniedError'
            ? 'Kameraya daxil olmağa icazə verilmədi. Zəhmət olmasa brauzer parametrlərindən kameraya icazə verin.'
            : 'Kamera aktivləşdirilə bilmədi. Zəhmət olmasa cihazınızı və ya kamera parametrlərinizi yoxlayın.'
        );
      } finally {
        if (isMounted) {
          setIsCameraLoading(false);
        }
      }
    }

    if (verificationStatus === 'idle') {
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
  }, [retryCount, verificationStatus]);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (capturedPreview) {
        URL.revokeObjectURL(capturedPreview);
      }
    };
  }, [capturedPreview]);

  // Navigate to call on success
  const proceedToCall = () => {
    if (!id) return;
    navigate(PATHS.SESSION_CALL.replace(':id', String(id)), {
      state: { faceVerified: true },
    });
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

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          setErrorMessage('Şəkli çəkmək mümkün olmadı. Yenidən cəhd edin.');
          setVerificationStatus('error');
          return;
        }

        const previewUrl = URL.createObjectURL(blob);
        setCapturedPreview(previewUrl);

        try {
          setIsProcessing(true);
          setErrorMessage(null);

          const isMatch = await appointmentsApi.compareFace(blob);

          if (isMatch === true) {
            if (streamRef.current) {
              streamRef.current.getTracks().forEach((track) => track.stop());
              streamRef.current = null;
            }
            setVerificationStatus('success');
            setTimeout(() => {
              proceedToCall();
            }, 1500);
          } else {
            setVerificationStatus('mismatch');
          }
        } catch (err: unknown) {
          console.error('compare-face error:', err);
          const errorObj = err as {
            response?: { data?: { message?: string } | string; status?: number };
            message?: string;
          };
          let message = 'Üzün yoxlanılması zamanı xəta baş verdi. Yenidən cəhd edin.';
          if (errorObj?.response?.status === 500) {
            message = 'Serverdə daxili xəta baş verdi (Status 500). Zəhmət olmasa bir qədər sonra yenidən cəhd edin.';
          } else if (typeof errorObj?.response?.data === 'string') {
            message = errorObj.response.data;
          } else if (errorObj?.response?.data?.message) {
            message = errorObj.response.data.message;
          } else if (errorObj?.message) {
            message = errorObj.message;
          }
          setErrorMessage(message);
          setVerificationStatus('error');
        } finally {
          setIsProcessing(false);
        }
      },
      'image/jpeg',
      0.92
    );
  };

  const handleRetry = () => {
    setCapturedPreview(null);
    setVerificationStatus('idle');
    setErrorMessage(null);
    setRetryCount((prev) => prev + 1);
  };

  const handleGoBack = () => {
    navigate(PATHS.SESSIONS);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden bg-landing-gradient">
      <div className="w-full max-w-[680px] bg-[#141226]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 relative z-10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(0,242,255,0.08)]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <button
            type="button"
            onClick={handleGoBack}
            disabled={isProcessing}
            className="flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition-colors disabled:opacity-50 px-3 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <AppIcon icon="lucide:arrow-left" size={16} />
            <span>Sessiyalara qayıt</span>
          </button>

          <span className="text-xs font-mono uppercase tracking-wider text-[#00f2ff] px-2.5 py-1 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/20">
            Sessiya #{id}
          </span>
        </div>

        {/* Title & Instructions */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-2">
            Sessiya üçün Üz Təsdiqi
          </h1>
          <p className="text-sm text-white/60 max-w-md mx-auto">
            Sessiyaya qoşulmaq üçün zəhmət olmasa üzünüzü oval çərçivəyə uyğunlaşdırın və çəkiliş düyməsinə klikləyin.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs bg-white/5 border border-white/10 text-white/80">
              <AppIcon icon="lucide:user-check" size={12} className="text-[#00f2ff]" />
              Üzünüzü mərkəzdə saxlayın
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs bg-white/5 border border-white/10 text-white/80">
              <AppIcon icon="lucide:sun-medium" size={12} className="text-amber-300" />
              İşıqlı mühitdə dayanın
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs bg-white/5 border border-white/10 text-white/80">
              <AppIcon icon="lucide:sparkles" size={12} className="text-[#c084fc]" />
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

            {/* Face Oval Guide */}
            {!cameraError && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                <div
                  className="w-[230px] sm:w-[260px] h-[310px] sm:h-[350px] rounded-[50%_50%_45%_45%_/_58%_58%_42%_42%] border-2 border-[#00f2ff]/90 relative flex items-center justify-center transition-all duration-300"
                  style={{
                    boxShadow:
                      '0 0 0 9999px rgba(10, 17, 23, 0.78), 0 0 35px rgba(0, 242, 255, 0.4), inset 0 0 25px rgba(0, 242, 255, 0.12)',
                  }}
                >
                  <div className="absolute top-3.5 flex items-center justify-center">
                    <div className="w-12 h-1 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00F2FF]" />
                  </div>
                  <div className="absolute bottom-3.5 flex items-center justify-center">
                    <div className="w-14 h-1 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00F2FF]" />
                  </div>
                  <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-[#00f2ff]/80 shadow-[0_0_8px_#00F2FF]" />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-[#00f2ff]/80 shadow-[0_0_8px_#00F2FF]" />

                  {isStreaming && !capturedPreview && !isProcessing && (
                    <div className="absolute inset-x-6 h-0.5 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent animate-scan shadow-[0_0_14px_#00F2FF]" />
                  )}
                </div>
              </div>
            )}

            {/* Camera Loading State */}
            {isCameraLoading && !cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D1117]/85 z-25 text-center p-6">
                <AppIcon icon="lucide:loader-2" size={40} className="text-[#00f2ff] animate-spin mb-3" />
                <p className="text-base text-white font-medium">Kamera başladılır...</p>
                <p className="text-xs text-white/50 mt-1">Zəhmət olmasa gözləyin</p>
              </div>
            )}

            {/* Camera Permission / Device Error */}
            {cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D1117]/95 z-25 text-center p-6">
                <AppIcon icon="lucide:camera-off" size={44} className="text-red-400 mb-3" />
                <p className="text-base text-red-200 font-medium mb-1.5">
                  Kamera tapılmadı və ya icazə verilmədi
                </p>
                <p className="text-xs text-white/50 mb-5 max-w-[280px] leading-relaxed">
                  {cameraError}
                </p>
                <div className="flex justify-center w-full max-w-[200px]">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setRetryCount((prev) => prev + 1)}
                    className="w-full text-xs text-white border-white/20"
                  >
                    <AppIcon icon="lucide:refresh-cw" size={14} className="mr-1.5" />
                    Yenidən yoxla
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex items-center gap-2.5 mt-4 text-sm text-[#00f2ff] font-medium bg-[#00f2ff]/10 border border-[#00f2ff]/20 py-2.5 px-5 rounded-full animate-pulse">
              <AppIcon icon="lucide:loader-2" size={16} className="animate-spin" />
              <span>Üz müqayisə edilir və təsdiqlənir...</span>
            </div>
          )}

          {/* Error Alert Banner */}
          {errorMessage && verificationStatus === 'error' && (
            <div className="mt-4 text-xs sm:text-sm text-red-300 font-medium bg-red-950/40 border border-red-500/30 py-3 px-4 rounded-xl max-w-[500px] w-full flex items-center justify-between gap-3 shadow-lg">
              <div className="flex items-start gap-2">
                <AppIcon icon="lucide:alert-circle" size={18} className="text-red-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={handleRetry}
                className="text-white hover:text-red-200 underline text-xs shrink-0 font-semibold cursor-pointer"
              >
                Yenidən cəhd et
              </button>
            </div>
          )}
        </div>

        {/* Shutter Button */}
        <div className="flex flex-col items-center gap-4">
          {!cameraError && verificationStatus === 'idle' && (
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handleCapture}
                disabled={!isStreaming || isProcessing}
                className="relative group p-1 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-95 cursor-pointer"
                aria-label="Selfie çək"
              >
                <div className="w-20 h-20 rounded-full border-4 border-white/70 p-1 flex items-center justify-center transition-all group-hover:border-[#00f2ff] group-hover:shadow-[0_0_28px_rgba(0,242,255,0.45)]">
                  <div className="w-full h-full rounded-full bg-white group-hover:bg-[#00f2ff] transition-colors flex items-center justify-center text-slate-900 shadow-xl">
                    <AppIcon icon="lucide:camera" size={28} className="transition-transform group-hover:scale-110" />
                  </div>
                </div>
              </button>
            </div>
          )}

          <p className="text-xs text-white/50 text-center max-w-sm">
            Üzünüz oval çərçivə daxilində aydın görünən zaman çəkiliş düyməsinə klikləyin.
          </p>
        </div>

        {/* Success Modal */}
        {verificationStatus === 'success' && (
          <div className="absolute inset-0 z-50 bg-[#0D1117]/95 backdrop-blur-2xl rounded-3xl flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/80 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)] animate-bounce">
              <AppIcon icon="lucide:check-circle-2" size={54} className="text-emerald-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Üz təsdiqləndi!
            </h2>

            <p className="text-white/60 text-sm sm:text-base max-w-sm mb-6 leading-relaxed">
              Şəxsiyyətiniz uğurla təsdiqləndi. Bir neçə saniyə ərzində sessiyaya qoşulursunuz...
            </p>

            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={proceedToCall}
              className="w-full max-w-xs font-semibold"
            >
              Zəngə qoşul
            </Button>
          </div>
        )}

        {/* Mismatch Alert Modal */}
        {verificationStatus === 'mismatch' && (
          <div className="absolute inset-0 z-50 bg-[#0D1117]/95 backdrop-blur-2xl rounded-3xl flex flex-col items-center justify-center p-6 sm:p-8 text-center animate-fade-in">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-500/20 border-2 border-rose-500/80 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(244,63,94,0.4)]">
              <AppIcon icon="lucide:shield-alert" size={50} className="text-rose-400" />
            </div>

            <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-5 mb-6 max-w-md w-full">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                Üz təsdiqlənmədi
              </h2>
              <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed">
                Təqdim olunan üz qeydiyyatdakı istifadəçi ilə uyğun gəlmir. Təhlükəsizlik qaydalarına əsasən sessiyaya yalnız qeydiyyatdan keçmiş istifadəçi qoşula bilər.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleRetry}
                className="flex-1 font-semibold border-white/20 text-white hover:bg-white/10"
              >
                <AppIcon icon="lucide:refresh-cw" size={16} className="mr-2" />
                Yenidən cəhd et
              </Button>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleGoBack}
                className="flex-1 font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]"
              >
                Sessiyalara qayıt
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

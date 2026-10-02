import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LiveKitRoom } from '@livekit/components-react';
import { appointmentsApi } from '@/api/appointments.api';
import { PATHS } from '@/routes/paths';
import { AppIcon } from '@/components';
import type { JoinTokenResponse } from '@/api/types';
import { AxiosError } from 'axios';
import { NexusCallLayout } from '../components/NexusCallLayout';

export const SessionCallPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tokenInfo, setTokenInfo] = useState<JoinTokenResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchToken = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await appointmentsApi.getJoinToken(Number(id));
      setTokenInfo(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.status === 403) {
        setError(t('webapp.sessionCall.noPermission', 'Bu seansa qoşulmaq üçün icazəniz yoxdur.'));
      } else {
        setError(t('webapp.sessionCall.connectionError', 'Əlaqə xətası baş verdi. Yenidən cəhd edin.'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, [id]);

  const handleLeave = () => {
    navigate(PATHS.SESSIONS);
  };

  // ── Loading Screen ──
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#090a0f] font-sans animate-fade-in">
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-[#4B2E83]/30 animate-ping" />
          <div className="absolute inset-1 rounded-full border-2 border-[#4B2E83]/50 animate-ping [animation-delay:150ms]" />
          <div className="absolute inset-2 rounded-full border-2 border-[#4B2E83] animate-ping [animation-delay:300ms]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <AppIcon icon="lucide:wifi" className="w-7 h-7 text-[#03C6B2] animate-pulse" />
          </div>
        </div>
        <h3 className="text-white text-xl sm:text-2xl font-semibold text-center">
          {t('webapp.sessionCall.connecting', 'Seansa qoşulur...')}
        </h3>
        <p className="text-white/50 text-sm sm:text-base mt-2 text-center">
          {t('webapp.sessionCall.pleaseWait', 'Zəhmət olmasa gözləyin')}
        </p>
        <div className="mt-8 w-48 h-0.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#4B2E83] to-[#03C6B2] rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    );
  }

  // ── Error Screen ──
  if (error || !tokenInfo) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#090a0f] px-4 font-sans animate-fade-in">
        <div className="relative w-full max-w-sm">
          <div className="absolute -inset-4 bg-red-500/10 rounded-3xl blur-2xl pointer-events-none" />

          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg" />
              <div className="relative w-16 h-16 bg-red-500/15 border border-red-500/30 rounded-full flex items-center justify-center">
                <AppIcon icon="lucide:alert-circle" className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">
              {t('webapp.sessionCall.errorTitle', 'Bağlantı xətası')}
            </h3>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8">
              {error}
            </p>

            <div className="flex flex-col w-full gap-3">
              <button
                onClick={fetchToken}
                className="w-full flex items-center justify-center gap-2.5 bg-[#4B2E83] hover:bg-[#5C3A9B] active:bg-[#3C2475] text-white py-3.5 rounded-2xl font-semibold transition-all duration-200 cursor-pointer border-0 shadow-lg shadow-[#4B2E83]/30"
              >
                <AppIcon icon="lucide:refresh-cw" className="w-4 h-4" />
                {t('webapp.sessionCall.retry', 'Yenidən cəhd et')}
              </button>
              <button
                onClick={handleLeave}
                className="w-full flex items-center justify-center gap-2.5 bg-white/8 hover:bg-white/12 text-white/80 hover:text-white py-3.5 rounded-2xl font-semibold border border-white/10 transition-all duration-200 cursor-pointer"
              >
                <AppIcon icon="lucide:arrow-left" className="w-4 h-4" />
                {t('webapp.sessionCall.back', 'Geri')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Active Call Screen ──
  return (
    <div className="w-full h-screen bg-[#0D0618]">
      <LiveKitRoom
        video={true}
        audio={true}
        token={tokenInfo.token}
        serverUrl={tokenInfo.serverUrl}
        connect={true}
        onDisconnected={handleLeave}
      >
        <NexusCallLayout roomName={tokenInfo.roomName} />
      </LiveKitRoom>
    </div>
  );
};

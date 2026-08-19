import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { appointmentsApi } from '@/api/appointments.api';
import { PATHS } from '@/routes/paths';
import { AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import type { JoinTokenResponse } from '@/api/types';
import { AxiosError } from 'axios';

export const SessionCallPage = () => {
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
        setError('Bu seansa qoşulmaq üçün hələ icazəniz yoxdur və ya vaxtı çatmayıb.');
      } else {
        setError('Bağlantı xətası baş verdi. Zəhmət olmasa yenidən cəhd edin.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, [id]);

  const handleLeave = () => {
    navigate(PATHS.WEBAPP_SESSIONS);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] font-['Lexend'] animate-fade-in">
        <Loader2 className="w-12 h-12 text-[#4B2E83] animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-[#1E0A42]">Seansa qoşulur...</h3>
        <p className="text-[#7A7570] mt-2">Zəhmət olmasa gözləyin</p>
      </div>
    );
  }

  if (error || !tokenInfo) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-4 font-['Lexend'] animate-fade-in">
        <div className="bg-white p-8 rounded-[24px] shadow-xl max-w-md w-full flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-[#1E0A42] mb-3">Xəta</h3>
          <p className="text-[#7A7570] mb-8">{error}</p>
          
          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={fetchToken}
              className="w-full bg-[#4B2E83] hover:bg-[#3C2475] text-white py-4 rounded-[16px] font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              Yenidən yoxla
            </button>
            <button 
              onClick={handleLeave}
              className="w-full bg-white hover:bg-gray-50 text-[#4B2E83] py-4 rounded-[16px] font-bold shadow-sm border border-gray-200 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Geri qayıt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black" data-lk-theme="default">
      <LiveKitRoom
        video={true}
        audio={true}
        token={tokenInfo.token}
        serverUrl={tokenInfo.serverUrl}
        connect={true}
        onDisconnected={handleLeave}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
};

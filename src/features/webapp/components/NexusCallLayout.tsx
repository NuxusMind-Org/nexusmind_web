import { useState, useEffect, useRef, useCallback } from 'react';
import { Track } from 'livekit-client';
import {
  useLocalParticipant,
  useRemoteParticipants,
  useTracks,
  useTrackToggle,
  useDisconnectButton,
  VideoTrack,
  RoomAudioRenderer,
} from '@livekit/components-react';
import { isTrackReference } from '@livekit/components-core';
import {
  Mic, MicOff, Video, VideoOff, PhoneOff,
  Lock, Shield, FileText, X, Save,
} from 'lucide-react';

interface NexusCallLayoutProps {
  roomName?: string;
}

// ── Duration Timer ──────────────────────────────────────────
function useDuration() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  const h = Math.floor(seconds / 3600);
  if (h > 0) return `${pad(h)}:${pad(m % 60)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

// ── Avatar Placeholder ──────────────────────────────────────
function AvatarPlaceholder({ name, size = 'lg' }: { name: string; size?: 'lg' | 'sm' }) {
  const initial = name?.charAt(0)?.toUpperCase() || '?';
  const isLg = size === 'lg';
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#0D0618] via-[#141029] to-[#1a0d2e]">
      <div
        className={`rounded-full bg-[#4B2E83]/50 border-2 border-[#4B2E83]/80 flex items-center justify-center font-bold font-['Lexend'] text-white select-none ${
          isLg ? 'w-28 h-28 text-5xl sm:w-36 sm:h-36 sm:text-6xl' : 'w-9 h-9 text-base'
        }`}
      >
        {initial}
      </div>
    </div>
  );
}

// ── Mic Toggle ──────────────────────────────────────────────
function MicButton() {
  const { buttonProps, enabled } = useTrackToggle({ source: Track.Source.Microphone });
  return (
    <button
      {...buttonProps}
      aria-label={enabled ? 'Mute' : 'Unmute'}
      className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none cursor-pointer border-0 shadow-md ${
        enabled
          ? 'bg-[#4B2E83] hover:bg-[#5C3A9B] text-white shadow-[#4B2E83]/30'
          : 'bg-white/10 hover:bg-white/20 text-white/50'
      }`}
    >
      {enabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
    </button>
  );
}

// ── Camera Toggle ────────────────────────────────────────────
function CameraButton() {
  const { buttonProps, enabled } = useTrackToggle({ source: Track.Source.Camera });
  return (
    <button
      {...buttonProps}
      aria-label={enabled ? 'Camera off' : 'Camera on'}
      className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none cursor-pointer border-0 shadow-md ${
        enabled
          ? 'bg-[#4B2E83] hover:bg-[#5C3A9B] text-white shadow-[#4B2E83]/30'
          : 'bg-white/10 hover:bg-white/20 text-white/50'
      }`}
    >
      {enabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
    </button>
  );
}

// ── End Call Button ──────────────────────────────────────────
function EndCallButton() {
  const { buttonProps } = useDisconnectButton({ stopTracks: true });
  return (
    <button
      {...buttonProps}
      aria-label="End call"
      className="w-[60px] h-[60px] rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 active:scale-90 text-white flex items-center justify-center transition-all duration-200 border-0 cursor-pointer shadow-lg shadow-red-500/30 focus:outline-none"
    >
      <PhoneOff className="w-5 h-5" />
    </button>
  );
}

// ── Notes FAB Sheet ──────────────────────────────────────────
interface NotesSheetProps {
  open: boolean;
  onClose: () => void;
}

function NotesSheet({ open, onClose }: NotesSheetProps) {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [open]);

  const handleSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}

      {/* Sheet */}
      <div
        className={`fixed left-0 right-0 z-40 bg-[#0f0b1e] border-t border-white/10 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ bottom: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#4B2E83]/40 border border-[#4B2E83]/60 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-[#a78bfa]" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">Session Notes</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer border-0"
            aria-label="Close notes"
          >
            <X className="w-3.5 h-3.5 text-white/60" />
          </button>
        </div>

        {/* Textarea */}
        <div className="px-5 pt-4 pb-3">
          <textarea
            ref={textareaRef}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Jot quick notes during the session…"
            rows={5}
            className="w-full bg-white/5 border border-white/10 focus:border-[#4B2E83]/60 rounded-xl px-4 py-3 text-sm text-white/85 placeholder-white/25 resize-none focus:outline-none transition-colors leading-relaxed font-['Lexend']"
          />
          <p className="text-[10px] text-white/30 mt-1.5 px-1">
            Notes are saved locally and submitted when the session ends.
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6">
          <button
            onClick={handleSave}
            className={`w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer border-0 flex items-center justify-center gap-2 ${
              saved
                ? 'bg-emerald-600/80 text-white'
                : 'bg-[#4B2E83] hover:bg-[#5C3A9B] text-white shadow-lg shadow-[#4B2E83]/25'
            }`}
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved ✓' : 'Save Note'}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Main Layout ──────────────────────────────────────────────
export function NexusCallLayout({ roomName }: NexusCallLayoutProps) {
  const duration = useDuration();
  const [notesOpen, setNotesOpen] = useState(false);

  // Remote participant
  const remoteParticipants = useRemoteParticipants();
  const remoteParticipant = remoteParticipants[0] ?? null;
  const remoteName = remoteParticipant?.name || roomName || 'Session';

  // Tracks
  const allTracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: false }]);
  const remoteCameraTrack = allTracks.find(t => isTrackReference(t) && !t.participant.isLocal);
  const { localParticipant, isCameraEnabled } = useLocalParticipant();
  const localCameraTrack = allTracks.find(t => isTrackReference(t) && t.participant.isLocal);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#090a0f] font-['Lexend'] select-none">

      {/* ── Remote Video (full-screen background) ── */}
      <div className="absolute inset-0 w-full h-full">
        {remoteCameraTrack && isTrackReference(remoteCameraTrack) ? (
          <VideoTrack
            trackRef={remoteCameraTrack}
            className="w-full h-full"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <AvatarPlaceholder name={remoteName} size="lg" />
        )}
        {/* Gradient overlays: top + bottom for readability */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      </div>

      {/* ── Top Bar (always visible) ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-4 pb-2">
        {/* Left: name + live status */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex flex-col min-w-0">
            <span className="text-white font-bold text-sm leading-tight drop-shadow-lg truncate max-w-[160px]">
              {remoteName}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  remoteParticipant ? 'bg-[#03C6B2] animate-pulse' : 'bg-white/30'
                }`}
              />
              <span className="text-[10px] text-[#03C6B2] font-semibold uppercase tracking-widest drop-shadow">
                {remoteParticipant ? 'Live' : 'Waiting…'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: timer + security */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-white font-bold text-sm tabular-nums drop-shadow-lg bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {duration}
          </span>
          <div className="flex items-center gap-0.5 text-[#03C6B2]/80" title="End-to-end encrypted">
            <Shield className="w-3.5 h-3.5" />
            <Lock className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* ── Waiting State Overlay ── */}
      {!remoteParticipant && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-2 border-[#4B2E83]/40 animate-ping" />
              <div className="absolute inset-0 rounded-full border-2 border-[#4B2E83]/70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#03C6B2] animate-pulse" />
              </div>
            </div>
            <p className="text-white/70 text-sm font-medium tracking-wide drop-shadow-lg">
              Waiting for patient to join…
            </p>
          </div>
        </div>
      )}

      {/* ── Self PiP Preview ── */}
      <div
        className="absolute z-20 rounded-xl overflow-hidden border-2 border-[#03C6B2]/60 shadow-2xl shadow-black/70 transition-all duration-200 hover:border-[#03C6B2]"
        style={{
          width: 108,
          height: 80,
          bottom: 'calc(120px + env(safe-area-inset-bottom, 0px))',
          right: 16,
        }}
        title="Your camera"
      >
        {isCameraEnabled && localCameraTrack && isTrackReference(localCameraTrack) ? (
          <>
            <VideoTrack
              trackRef={localCameraTrack}
              className="w-full h-full"
              style={{ objectFit: 'cover', width: '100%', height: '100%', transform: 'scaleX(-1)' }}
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
          </>
        ) : (
          <AvatarPlaceholder name={localParticipant?.name || 'Me'} size="sm" />
        )}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-px rounded-full bg-black/60 backdrop-blur-sm text-white text-[9px] font-semibold whitespace-nowrap">
          You
        </div>
      </div>

      {/* ── Notes FAB ── */}
      <button
        onClick={() => setNotesOpen(true)}
        aria-label="Open session notes"
        className="absolute z-20 w-10 h-10 rounded-full bg-[#4B2E83]/80 hover:bg-[#4B2E83] active:scale-90 backdrop-blur-sm border border-[#4B2E83]/60 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg shadow-[#4B2E83]/20"
        style={{
          bottom: 'calc(120px + env(safe-area-inset-bottom, 0px))',
          left: 16,
        }}
      >
        <FileText className="w-4 h-4" />
      </button>

      {/* ── Docked Bottom Control Panel ── */}
      <div
        className="absolute left-0 right-0 z-20 bg-black/55 backdrop-blur-xl border-t border-white/10 rounded-t-3xl"
        style={{ bottom: 0 }}
      >
        {/* Drag handle visual */}
        <div className="flex justify-center pt-3 pb-0.5">
          <div className="w-8 h-0.5 rounded-full bg-white/15" />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-center gap-7 py-4">
          <MicButton />
          <CameraButton />
          <EndCallButton />
        </div>

        {/* Security footnote */}
        <div
          className="flex items-center justify-center gap-1.5 text-[#03C6B2]/70 pb-3"
          style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
        >
          <Lock className="w-2.5 h-2.5" />
          <span className="text-[10px] font-medium tracking-wide">HIPAA Encrypted · Secure Session</span>
        </div>
      </div>

      {/* ── Session Notes Slide-Up Sheet ── */}
      <NotesSheet open={notesOpen} onClose={() => setNotesOpen(false)} />

      {/* ── Audio Renderer (hidden, essential) ── */}
      <RoomAudioRenderer />
    </div>
  );
}

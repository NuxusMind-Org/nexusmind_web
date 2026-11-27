import { useCallback, useEffect, useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components/common/AppIcon';
import type { GalleryItem } from '../../constants/gallery';

export interface GalleryMediaModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

function isPointerOutsideDialog(event: PointerEvent, dialog: HTMLDialogElement): boolean {
  const rect = dialog.getBoundingClientRect();
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    let videoId = '';
    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes('youtube.com')) {
      videoId = parsed.searchParams.get('v') || parsed.pathname.split('/embed/')[1] || '';
    }
    if (!videoId) return null;
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`;
  } catch {
    return null;
  }
}

export const GalleryMediaModal = ({ item, onClose }: GalleryMediaModalProps) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleCloseRequest = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    }
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (item) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [item]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      dialog.returnValue = '';
      onCloseRef.current();
    };

    dialog.addEventListener('close', handleNativeClose);

    const hasNativeClosedBy =
      typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype;

    let pressedOutside = false;
    const handlePointerDown = (event: PointerEvent) => {
      pressedOutside = isPointerOutsideDialog(event, dialog);
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (pressedOutside && isPointerOutsideDialog(event, dialog)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    if (!hasNativeClosedBy) {
      dialog.addEventListener('pointerdown', handlePointerDown);
      dialog.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      dialog.removeEventListener('close', handleNativeClose);
      if (!hasNativeClosedBy) {
        dialog.removeEventListener('pointerdown', handlePointerDown);
        dialog.removeEventListener('pointerup', handlePointerUp);
      }
    };
  }, []);

  const isVideo = item?.mediaType === 'VIDEO';
  const videoUrl = item?.mediaUrl || '';
  const youtubeEmbed = isVideo && videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;
  const headingText = item?.title || item?.badgeText || t('gallery.title', 'Qalereya');

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="vr-video-dialog"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      {item && (
        <div className="relative w-full bg-[#161226]/95 border border-purple-400/25 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7),_0_0_24px_rgba(103,0,255,0.16)] overflow-hidden text-white">
          <div className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-white/10">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#00F2FF]">
                {item.badgeText}
              </span>
              <h1
                id={titleId}
                className="text-[18px] sm:text-[22px] font-bold tracking-tight text-white truncate"
              >
                {headingText}
              </h1>
            </div>

            <button
              type="button"
              autoFocus
              onClick={handleCloseRequest}
              aria-label={t('vr.close', 'Bağla')}
              className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 active:scale-95 text-white/75 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <AppIcon icon="lucide:x" size={18} />
            </button>
          </div>

          <div className="relative z-10 p-4 sm:p-6">
            {isVideo && videoUrl ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                {youtubeEmbed ? (
                  <iframe
                    src={youtubeEmbed}
                    title={item.altText || headingText}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={videoUrl}
                    poster={item.thumbnailUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            ) : (
              <div className="relative w-full max-h-[70vh] rounded-xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center">
                <img
                  src={item.mediaUrl || item.image}
                  alt={item.altText || headingText}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
};

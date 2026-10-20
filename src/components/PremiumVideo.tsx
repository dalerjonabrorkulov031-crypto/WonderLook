import { useState } from 'react';
import { Lock, Play } from 'lucide-react';
import type { Lang, PlaceVideo } from '../place.types';

export function PremiumVideo({
  video,
  lang,
  isPremium,
  onUpgrade,
}: {
  video: PlaceVideo;
  lang: Lang;
  isPremium: boolean;
  onUpgrade: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const labels = {
    uz: { play: 'Ko‘rish', comingSoon: 'Video tez orada', premium: 'Premium' },
    ru: { play: 'Смотреть', comingSoon: 'Видео скоро появится', premium: 'Премиум' },
    en: { play: 'Play', comingSoon: 'Video coming soon', premium: 'Premium' },
  }[lang];
  const locked = video.premium && !isPremium;
  const playable = video.url !== 'TODO_REAL_VIDEO_URL';
  const videoId = video.url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([^?&/]+)/)?.[1];
  const embedUrl = video.provider === 'youtube' && videoId
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1`
    : video.url;

  return (
    <article className="guide-video">
      {playing && !locked && playable ? (
        video.provider === 'file' ? (
          <video className="guide-video-frame" controls autoPlay playsInline poster={video.poster} src={video.url} />
        ) : (
          <iframe
            className="guide-video-frame"
            src={embedUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={video.title[lang]}
          />
        )
      ) : (
        <button
          type="button"
          className="guide-video-poster"
          onClick={() => locked ? onUpgrade() : playable ? setPlaying(true) : undefined}
          aria-label={locked ? `${labels.premium}: ${video.title[lang]}` : `${video.title[lang]} — video`}
          disabled={!locked && !playable}
        >
          <img src={video.poster} alt="" loading="lazy" className={locked ? 'is-locked' : ''} />
          <span className="guide-video-overlay">
            {locked ? <Lock aria-hidden="true" /> : <Play aria-hidden="true" />}
            {locked ? labels.premium : playable ? labels.play : labels.comingSoon}
          </span>
          {video.premium && <span className="guide-video-badge">PREMIUM</span>}
        </button>
      )}
      <h3>{video.title[lang]}</h3>
    </article>
  );
}

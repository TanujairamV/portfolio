import React, { useEffect, useState } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";

// Get a YouTube Music thumbnail via Piped API
const getYtMusicThumbnail = async (artist: string, track: string): Promise<string | null> => {
  try {
    const query = encodeURIComponent(`${artist} ${track}`);
    const res = await fetch(`https://pipedapi.kavin.rocks/search?q=${query}&filter=music_songs`);
    const data = await res.json();
    return data?.items?.[0]?.thumbnail ?? null;
  } catch {
    return null;
  }
};

const fallbackTrack: LastFMTrack = {
  artist: "",
  name: "Not playing",
  album: "",
  image: "https://via.placeholder.com/120x120?text=No+Art",
  url: "#",
};

const CompactEqualizer: React.FC = () => {
  const [heights, setHeights] = useState<number[]>([10, 10, 10]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeights([
        Math.floor(Math.random() * 16) + 8,
        Math.floor(Math.random() * 20) + 6,
        Math.floor(Math.random() * 14) + 10,
      ]);
    }, 120);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{
      display: "flex",
      alignItems: "end",
      gap: "3px",
      height: "19px",
      marginLeft: 8,
      marginRight: 2,
      minWidth: "15px",
    }}>
      {heights.map((h, i) => (
        <div key={i}
          style={{
            width: "3px",
            height: `${h}px`,
            background: "linear-gradient(180deg, #fff 70%, #b0b0b0 100%)",
            borderRadius: "4px",
            transition: "height 0.14s"
          }} />
      ))}
    </div>
  );
};

const MusicIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#softshadow)">
      <path d="M15.8 4.4V13.1C15.5 12.9 15.1 12.8 14.7 12.8C13.6 12.8 12.7 13.7 12.7 14.8C12.7 15.9 13.6 16.8 14.7 16.8C15.8 16.8 16.7 15.9 16.7 14.8V7.6H18V4.4H15.8ZM7.8 6.7V13.1C7.5 12.9 7.1 12.8 6.7 12.8C5.6 12.8 4.7 13.7 4.7 14.8C4.7 15.9 5.6 16.8 6.7 16.8C7.8 16.8 8.7 15.9 8.7 14.8V8.7H12V6.7H7.8Z"
        fill="url(#gradient)" />
    </g>
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff"/>
        <stop offset="1" stopColor="#b0b0b0"/>
      </linearGradient>
      <filter id="softshadow" x="0" y="0" width="20" height="20" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#bbb" floodOpacity="0.18"/>
      </filter>
    </defs>
  </svg>
);

const NowListening: React.FC = () => {
  const [track, setTrack] = useState<LastFMTrack | null>(null);
  const [img, setImg] = useState<string>(fallbackTrack.image);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    fetchRecentTrack()
      .then(async (t) => {
        setTrack(t);
        let cover = t.image;
        if (!cover || cover.includes("2a96cbd8b46e442fc41c2b86b821562f.png")) {
          const ytThumb = await getYtMusicThumbnail(t.artist, t.name);
          cover = ytThumb || fallbackTrack.image;
        }
        setImg(cover);
      })
      .catch(() => {
        setTrack(null);
        setImg(fallbackTrack.image);
      });
  }, []);

  const t = track || fallbackTrack;

  // Compact, visually balanced, soft glass, all gradient text, space-efficient
  return (
    <div
      className="relative w-full max-w-md mx-auto mb-8"
      style={{
        borderRadius: "1.7rem",
        overflow: "hidden",
        boxShadow: "0 3px 18px rgba(60,60,60,0.11), 0 0.5px 4px rgba(200,200,200,0.09)"
      }}
    >
      {/* Blurred cover as background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(22px) brightness(0.62)",
          WebkitFilter: "blur(22px) brightness(0.62)",
          transform: "scale(1.07)"
        }}
        aria-hidden
      />
      {/* Overlay for extra blur and glass effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "rgba(40,40,40,0.26)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)"
        }}
      />
      {/* Main content */}
      <div
        className="relative z-10 flex items-center gap-3 px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.10)",
          borderRadius: "1.7rem",
          border: "1px solid rgba(180,180,180,0.13)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          minHeight: "62px",
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={img}
            alt={`Album art for ${t.name}`}
            className="w-12 h-12 object-cover"
            style={{
              borderRadius: "0.8rem",
              border: "1.5px solid rgba(225,225,225,0.19)",
              boxShadow: "0 2px 8px 0 rgba(80,80,80,0.06)",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.3s"
            }}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && (
            <div style={{
              width: "3rem", height: "3rem",
              borderRadius: "0.8rem",
              background: "linear-gradient(135deg,#dfdfdf 10%,#bbb 90%)",
              position: "absolute", left: 0, top: 0
            }} />
          )}
        </div>
        <div className="flex flex-col min-w-0" style={{flex: 1}}>
          <span
            className="text-[0.65rem] uppercase tracking-widest mb-0.5"
            style={{
              background: "linear-gradient(90deg, #fff 50%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Roboto Mono', monospace",
              letterSpacing: "0.15em"
            }}
          >
            Now Playing
          </span>
          <div className="flex items-center gap-0">
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-base font-bold"
              style={{
                background: "linear-gradient(90deg, #fff 65%, #b0b0b0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Montserrat', sans-serif",
                lineHeight: 1.15,
                maxWidth: "100%",
                letterSpacing: "0.01em"
              }}
            >
              {t.name}
            </a>
            <CompactEqualizer />
          </div>
          <span
            className="truncate text-xs font-semibold mt-0"
            style={{
              background: "linear-gradient(90deg, #fff 40%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Montserrat', sans-serif",
              lineHeight: 1.13,
              maxWidth: "100%"
            }}
          >
            {t.artist}
          </span>
        </div>
        <div className="hidden md:flex" style={{ marginLeft: 10 }}>
          <MusicIcon />
        </div>
      </div>
    </div>
  );
};

export default NowListening;

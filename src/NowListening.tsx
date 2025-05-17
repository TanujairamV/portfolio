import React, { useEffect, useState } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";

// --- Album art fetching logic as before ---
async function getItunesThumbnail(artist: string, track: string): Promise<string | null> {
  try {
    const query = encodeURIComponent(`${artist} ${track}`);
    const itunesRes = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
    const itunesData = await itunesRes.json();
    if (itunesData.results?.[0]?.artworkUrl100) {
      return itunesData.results[0].artworkUrl100.replace("100x100bb.jpg", "400x400bb.jpg");
    }
  } catch {}
  return null;
}

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
        Math.floor(Math.random() * 16) + 12,
        Math.floor(Math.random() * 24) + 10,
        Math.floor(Math.random() * 14) + 18,
      ]);
    }, 120);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{
      display: "flex",
      alignItems: "end",
      gap: "4px",
      height: "34px",
      marginLeft: 12,
      marginRight: 2,
      minWidth: "21px",
    }}>
      {heights.map((h, i) => (
        <div key={i}
          style={{
            width: "5px",
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
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#softshadow)">
      <path d="M19.8 6.2V17.1C19.5 16.9 19.1 16.8 18.7 16.8C17.6 16.8 16.7 17.7 16.7 18.8C16.7 19.9 17.6 20.8 18.7 20.8C19.8 20.8 20.7 19.9 20.7 18.8V10.6H22V6.2H19.8ZM9.8 8.7V17.1C9.5 16.9 9.1 16.8 8.7 16.8C7.6 16.8 6.7 17.7 6.7 18.8C6.7 19.9 7.6 20.8 8.7 20.8C9.8 20.8 10.7 19.9 10.7 18.8V12.7H16V8.7H9.8Z"
        fill="url(#gradient)" />
    </g>
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff"/>
        <stop offset="1" stopColor="#b0b0b0"/>
      </linearGradient>
      <filter id="softshadow" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#bbb" floodOpacity="0.18"/>
      </filter>
    </defs>
  </svg>
);

const NowListening: React.FC = () => {
  const [track, setTrack] = useState<LastFMTrack | null>(null);
  const [img, setImg] = useState<string>(fallbackTrack.image);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchRecentTrack()
      .then(async (t) => {
        if (!isMounted) return;
        setTrack(t);

        const thumb = await getItunesThumbnail(t.artist, t.name);
        setImg(thumb || fallbackTrack.image);
      })
      .catch(() => {
        if (!isMounted) return;
        setTrack(null);
        setImg(fallbackTrack.image);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const t = track || fallbackTrack;

  return (
    <div
      className="relative w-full max-w-2xl mx-auto mb-12"
      style={{
        borderRadius: "2.3rem",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(60,60,60,0.22), 0 2px 18px rgba(200,200,200,0.11)"
      }}
    >
      {/* Highly visible blurred cover as background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(42px) brightness(0.45) saturate(1.6)",
          WebkitFilter: "blur(42px) brightness(0.45) saturate(1.6)",
          transform: "scale(1.18)"
        }}
        aria-hidden
      />
      {/* Overlay for extra blur and deeper glass effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "rgba(28,28,40,0.46)",
          backdropFilter: "blur(18px) saturate(1.2)",
          WebkitBackdropFilter: "blur(18px) saturate(1.2)"
        }}
      />
      {/* Main content */}
      <div
        className="relative z-10 flex items-center gap-7 px-10 py-7"
        style={{
          background: "rgba(255,255,255,0.11)",
          borderRadius: "2.3rem",
          border: "1.7px solid rgba(180,180,180,0.18)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          minHeight: "150px"
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={img}
            alt={`Album art for ${t.name}`}
            className="w-[110px] h-[110px] object-cover"
            style={{
              borderRadius: "1.55rem",
              border: "2.5px solid rgba(225,225,225,0.21)",
              boxShadow: "0 4px 14px 0 rgba(80,80,80,0.10), 0 1px 9px #fff3",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity .35s"
            }}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && (
            <div style={{
              width: "110px", height: "110px",
              borderRadius: "1.55rem",
              background: "linear-gradient(135deg,#e8e8e8 10%,#bbb 90%)",
              position: "absolute", left: 0, top: 0
            }} />
          )}
        </div>
        <div className="flex flex-col min-w-0" style={{ flex: 1, minWidth: 0 }}>
          <span
            className="text-[0.74rem] uppercase tracking-widest mb-1"
            style={{
              background: "linear-gradient(90deg, #fff 55%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Roboto Mono', monospace",
              letterSpacing: "0.19em"
            }}
          >
            Now Playing
          </span>
          <div className="flex items-center gap-0">
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[1.6rem] font-bold"
              style={{
                background: "linear-gradient(90deg, #fff 75%, #b0b0b0 100%)",
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
            className="truncate text-[1.12rem] font-semibold mt-2"
            style={{
              background: "linear-gradient(90deg, #fff 45%, #b0b0b0 100%)",
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
        <div style={{ marginLeft: 16, display: "flex", alignItems: "center" }}>
          <MusicIcon />
        </div>
      </div>
    </div>
  );
};

export default NowListening;

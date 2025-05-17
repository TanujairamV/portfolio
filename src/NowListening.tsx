import React, { useEffect, useState, useRef } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";

// Marquee component for scrolling long titles
const Marquee: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (container && text) {
      setShouldScroll(text.scrollWidth > container.offsetWidth);
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden whitespace-nowrap"
      style={{ maxWidth: "100%" }}
    >
      <div
        ref={textRef}
        className={`inline-block ${shouldScroll ? "animate-marquee" : ""}`}
        style={{
          willChange: shouldScroll ? "transform" : undefined,
          fontWeight: 700,
        }}
      >
        {children}
        {shouldScroll && (
          <span style={{ paddingLeft: 48 }}>{children}</span>
        )}
      </div>
      <style>
        {`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
        `}
      </style>
    </div>
  );
};

// Album art fetching (iTunes, but you can add more sources here)
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
  // Hide on mobile
  return (
    <div
      className="hidden sm:flex"
      style={{
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

  // Show full frosted glass and hover effect
  return (
    <div
      className="relative w-full max-w-2xl mx-auto mb-12 group"
      style={{
        borderRadius: "2.3rem",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(60,60,60,0.22), 0 2px 18px rgba(200,200,200,0.11)"
      }}
    >
      {/* Strong frosted glass blur background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(44px) brightness(0.40) saturate(2.2)",
          WebkitFilter: "blur(44px) brightness(0.40) saturate(2.2)",
          transform: "scale(1.21)"
        }}
        aria-hidden
      />
      {/* Overlay for extra blur and deeper glass effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "rgba(24,24,32,0.55)",
          backdropFilter: "blur(22px) saturate(1.3)",
          WebkitBackdropFilter: "blur(22px) saturate(1.3)"
        }}
      />
      {/* Main content */}
      <div
        className="
          relative z-10 flex items-center gap-7 px-6 py-6
          md:px-10 md:py-7
          transition-all duration-200
          cursor-pointer
          group-hover:bg-white/25 group-hover:backdrop-blur-[32px] group-hover:scale-[1.025]
        "
        style={{
          background: "rgba(255,255,255,0.17)",
          borderRadius: "2.3rem",
          border: "1.7px solid rgba(180,180,180,0.22)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          minHeight: "140px"
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={img}
            alt={`Album art for ${t.name}`}
            className="w-[76px] h-[76px] sm:w-[110px] sm:h-[110px] object-cover"
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
            className="text-[0.7rem] uppercase tracking-widest mb-1"
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
          <div className="flex items-center gap-0 min-w-0">
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[1.2rem] sm:text-[1.6rem] font-bold min-w-0"
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
              <Marquee>{t.name}</Marquee>
            </a>
            <CompactEqualizer />
          </div>
          <span
            className="truncate text-[1.0rem] sm:text-[1.12rem] font-semibold mt-2"
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
        <div style={{ marginLeft: 10, display: "flex", alignItems: "center" }}>
          <MusicIcon />
        </div>
      </div>
    </div>
  );
};

export default NowListening;

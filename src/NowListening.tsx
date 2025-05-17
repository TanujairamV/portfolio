import React, { useEffect, useState } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";

// Try to get a YouTube Music thumbnail via YT Music unofficial API (piped as fallback)
const getYtMusicThumbnail = async (artist: string, track: string): Promise<string | null> => {
  try {
    // Use pipedapi for YT Music search as a public endpoint (unofficial YT Music API endpoints are rate limited/private)
    const query = encodeURIComponent(`${artist} ${track}`);
    const res = await fetch(`https://pipedapi.kavin.rocks/search?q=${query}&filter=music_songs`);
    const data = await res.json();
    // Prefer highest resolution thumbnail
    const thumb = data?.items?.[0]?.thumbnail ?? null;
    return thumb;
  } catch {
    return null;
  }
};

const fallbackTrack: LastFMTrack = {
  artist: "",
  name: "Not playing",
  album: "",
  image: "https://via.placeholder.com/120x120?text=No+Art",
  url: "#"
};

const MinimalEqualizer: React.FC<{ bars?: number }> = ({ bars = 6 }) => {
  const [heights, setHeights] = useState<number[]>(Array(bars).fill(10));
  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(Array.from({ length: bars }, () => Math.floor(Math.random() * 20) + 8));
    }, 110);
    return () => clearInterval(interval);
  }, [bars]);
  return (
    <div style={{
      display: "flex",
      alignItems: "end",
      gap: "2px",
      height: "20px",
      marginLeft: 8,
      marginRight: 0
    }}>
      {heights.map((h, i) => (
        <div key={i}
          style={{
            width: "2px",
            height: `${h}px`,
            background: "linear-gradient(180deg, #fff, #b0b0b0 90%)",
            borderRadius: "2px",
            transition: "height 0.12s"
          }} />
      ))}
    </div>
  );
};

const NowListening: React.FC = () => {
  const [track, setTrack] = useState<LastFMTrack | null>(null);
  const [img, setImg] = useState<string>(fallbackTrack.image);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    fetchRecentTrack()
      .then(async (t) => {
        setTrack(t);
        let cover = t.image;
        // Try to use high-res YT Music album art if Last.fm art is missing/default
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

  // UI polish: frosted glass, elegant shadow, smooth gradient text, bigger roundness, subtle border, strong alignment
  return (
    <div
      className="relative w-full max-w-2xl mx-auto mb-16"
      style={{
        borderRadius: "2.8rem",
        overflow: "hidden",
        boxShadow: "0 8px 48px 0 rgba(40,40,40,0.18), 0 1.5px 8px 0 rgba(200,200,200,0.10)"
      }}
    >
      {/* Blurred cover as background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(36px) brightness(0.58)",
          WebkitFilter: "blur(36px) brightness(0.58)",
          transform: "scale(1.10)"
        }}
        aria-hidden
      />
      {/* Overlay for extra blur and glass effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "rgba(40,40,40,0.38)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)"
        }}
      />
      {/* Main content */}
      <div
        className="relative z-10 flex items-center gap-8 px-10 py-9"
        style={{
          background: "rgba(255,255,255,0.11)",
          borderRadius: "2.8rem",
          border: "1.5px solid rgba(180,180,180,0.13)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)"
        }}
      >
        <div style={{position: "relative", flexShrink: 0}}>
          <img
            src={img}
            alt={`Album art for ${t.name}`}
            className="w-24 h-24 object-cover shadow-md"
            style={{
              borderRadius: "1.7rem",
              border: "2px solid rgba(225,225,225,0.21)",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.3s"
            }}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && (
            <div style={{
              width: "6rem", height: "6rem",
              borderRadius: "1.7rem",
              background: "linear-gradient(135deg,#dfdfdf 10%,#bbb 90%)",
              position: "absolute", left: 0, top: 0
            }} />
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span
            className="text-xs uppercase tracking-widest mb-1"
            style={{
              background: "linear-gradient(90deg, #fff 45%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Roboto Mono', monospace",
              letterSpacing: "0.16em"
            }}
          >
            Now Listening To
          </span>
          <div className="flex items-center gap-0">
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-2xl font-bold"
              style={{
                background: "linear-gradient(90deg, #fff 60%, #b0b0b0 100%)",
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
            <MinimalEqualizer />
          </div>
          <span
            className="truncate text-lg font-semibold mt-0.5"
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
          {t.album && (
            <span
              className="truncate text-sm mt-1"
              style={{
                background: "linear-gradient(90deg, #fff 30%, #b0b0b0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Roboto Mono', monospace",
                lineHeight: 1.13,
                maxWidth: "100%",
                opacity: 0.85
              }}
            >
              {t.album}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NowListening;

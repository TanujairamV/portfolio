import React, { useEffect, useState } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";

// Utility to get a Piped thumbnail by search
const getPipedThumbnail = async (artist: string, track: string): Promise<string | null> => {
  try {
    const query = encodeURIComponent(`${artist} ${track}`);
    const res = await fetch(`https://pipedapi.kavin.rocks/search?q=${query}&filter=music_songs`);
    const data = await res.json();
    const thumb = data?.items?.[0]?.thumbnail ?? null;
    return thumb;
  } catch {
    return null;
  }
};

// Minimal equalizer bar animation
const Equalizer: React.FC<{ bars?: number }> = ({ bars = 6 }) => {
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
      marginRight: 2
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

const fallbackTrack: LastFMTrack = {
  artist: "",
  name: "Not playing",
  album: "",
  image: "https://via.placeholder.com/120x120?text=No+Art",
  url: "#"
};

const NowListening: React.FC = () => {
  const [track, setTrack] = useState<LastFMTrack | null>(null);
  const [img, setImg] = useState<string>(fallbackTrack.image);

  useEffect(() => {
    fetchRecentTrack()
      .then(async (t) => {
        setTrack(t);
        // If no usable lastfm image, try Piped
        if (!t.image || t.image.includes("2a96cbd8b46e442fc41c2b86b821562f.png")) {
          const pipedThumb = await getPipedThumbnail(t.artist, t.name);
          setImg(pipedThumb || fallbackTrack.image);
        } else {
          setImg(t.image);
        }
      })
      .catch(() => {
        setTrack(null);
        setImg(fallbackTrack.image);
      });
  }, []);

  const t = track || fallbackTrack;

  return (
    <div
      className="relative w-full max-w-xl mx-auto mb-12 shadow-2xl"
      style={{
        borderRadius: "2.7rem", // more roundness
        overflow: "hidden"
      }}
    >
      {/* Blurred cover as background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(32px) brightness(0.62)",
          WebkitFilter: "blur(32px) brightness(0.62)",
          transform: "scale(1.08)"
        }}
        aria-hidden
      />
      {/* Glassmorphic overlay */}
      <div
        className="relative z-10 flex items-center gap-5 px-8 py-7"
        style={{
          background: "rgba(255,255,255,0.13)",
          borderRadius: "2.7rem",
          border: "1.5px solid rgba(180,180,180,0.17)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <img
          src={img}
          alt={`Album art for ${t.name}`}
          className="w-20 h-20 rounded-3xl border-2 border-white/30 shadow-lg object-cover flex-shrink-0"
          style={{ borderRadius: "1.5rem" }}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <span
            className="text-xs uppercase tracking-widest mb-1"
            style={{
              background: "linear-gradient(90deg, #fff 30%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Roboto Mono', monospace",
              letterSpacing: "0.14em"
            }}
          >
            Now Listening To
          </span>
          <div className="flex items-center gap-0">
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-lg md:text-2xl font-bold"
              style={{
                background: "linear-gradient(90deg, #fff 40%, #b0b0b0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.15,
                fontFamily: "'Montserrat', sans-serif",
                maxWidth: "100%"
              }}
            >
              {t.name}
            </a>
            <Equalizer />
          </div>
          <span
            className="truncate text-base font-semibold"
            style={{
              background: "linear-gradient(90deg, #fff 30%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Montserrat', sans-serif",
              lineHeight: 1.1,
              maxWidth: "100%"
            }}
          >
            {t.artist}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NowListening;

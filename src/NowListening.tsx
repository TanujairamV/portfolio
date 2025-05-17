import React, { useEffect, useState } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";

// Minimal equalizer for NowListening
const Equalizer: React.FC<{ lines?: number }> = ({ lines = 6 }) => {
  const [heights, setHeights] = useState<number[]>(Array(lines).fill(10));
  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(Array.from({ length: lines }, () => Math.floor(Math.random() * 18) + 10));
    }, 120);
    return () => clearInterval(interval);
  }, [lines]);
  return (
    <div style={{
      display: "flex",
      alignItems: "end",
      gap: "2px",
      height: "18px",
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentTrack()
      .then((t) => { setTrack(t); setLoading(false); })
      .catch(() => { setTrack(null); setLoading(false); });
  }, []);

  const t = track || fallbackTrack;

  return (
    <div
      className="relative w-full max-w-xl mx-auto mb-12 shadow-2xl"
      style={{
        borderRadius: "2.4rem", // increased roundness
        overflow: "hidden"
      }}
    >
      {/* Blurred cover as background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${t.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(28px) brightness(0.65)",
          WebkitFilter: "blur(28px) brightness(0.65)",
          transform: "scale(1.08)",
        }}
        aria-hidden
      />
      {/* Glassmorphic overlay */}
      <div
        className="relative z-10 flex items-center gap-5 px-7 py-6"
        style={{
          background: "rgba(255,255,255,0.13)",
          borderRadius: "2.4rem",
          border: "1.5px solid rgba(180,180,180,0.17)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <img
          src={t.image}
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
            className="truncate text-base text-gray-200 font-semibold"
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

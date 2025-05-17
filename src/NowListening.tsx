import React, { useEffect, useState } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";

const fallbackTrack = {
  artist: "No data",
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
      .then((t) => {
        setTrack(t);
        setLoading(false);
      })
      .catch(() => {
        setTrack(null); // fallback to null
        setLoading(false);
      });
  }, []);

  const showTrack = !loading && (track || fallbackTrack);

  if (!showTrack) return null;

  const t = track || fallbackTrack;

  return (
    <div className="relative w-full max-w-lg rounded-2xl mx-auto mb-12 overflow-hidden shadow-2xl">
      {/* Blurred cover image as background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${t.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(24px) brightness(0.5)",
          WebkitFilter: "blur(24px) brightness(0.5)",
          transform: "scale(1.1)",
        }}
        aria-hidden
      />
      {/* Glassmorphic overlay */}
      <div className="relative z-10 flex items-center gap-5 px-6 py-5"
        style={{
          background: "rgba(255,255,255,0.14)",
          borderRadius: "1.25rem",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}>
        <img
          src={t.image}
          alt={`Album art for ${t.name}`}
          className="w-16 h-16 rounded-xl border-2 border-white/50 shadow-lg object-cover flex-shrink-0"
        />
        <div className="flex flex-col">
          <span
            className="text-xs uppercase tracking-widest text-pink-400 mb-1"
            style={{ fontFamily: "'Roboto Mono', monospace", letterSpacing: "0.15em" }}
          >
            Now Listening To
          </span>
          <a
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-white hover:text-pink-200 transition"
            style={{ fontFamily: "'Pacifico', cursive", textShadow: "0 2px 8px rgba(0,0,0,0.38)" }}
          >
            {t.name}
          </a>
          <span
            className="text-base text-gray-200 font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif", textShadow: "0 1px 6px rgba(0,0,0,0.22)" }}
          >
            {t.artist}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NowListening;

import React, { useEffect, useState } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";

// Try Spotify API via RapidAPI, fallback to iTunes API
async function getSpotifyThumbnail(artist: string, track: string): Promise<string | null> {
  try {
    const query = encodeURIComponent(`${artist} ${track}`);
    const res = await fetch(`https://spotify23.p.rapidapi.com/search/?q=${query}&type=tracks&limit=1`, {
      headers: {
        // Replace with your actual RapidAPI Key!
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
      }
    });
    const data = await res.json();
    const image = data?.tracks?.items?.[0]?.data?.albumOfTrack?.coverArt?.sources?.[0]?.url;
    return image || null;
  } catch {
    return null;
  }
}

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
      height: "22px",
      marginLeft: 10,
      marginRight: 2,
      minWidth: "17px",
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
  <svg width="30" height="30" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
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
    let isMounted = true;
    fetchRecentTrack()
      .then(async (t) => {
        if (!isMounted) return;
        setTrack(t);

        // Try Spotify (RapidAPI) first, then iTunes
        let thumb: string | null = null;
        thumb = await getSpotifyThumbnail(t.artist, t.name);
        if (!thumb) thumb = await getItunesThumbnail(t.artist, t.name);
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
      className="relative w-full max-w-xl mx-auto mb-12"
      style={{
        borderRadius: "2.1rem",
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(60,60,60,0.13), 0 2px 12px rgba(200,200,200,0.11)"
      }}
    >
      {/* Blurred cover as background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(28px) brightness(0.60)",
          WebkitFilter: "blur(28px) brightness(0.60)",
          transform: "scale(1.10)"
        }}
        aria-hidden
      />
      {/* Overlay for extra blur and glass effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "rgba(40,40,40,0.23)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)"
        }}
      />
      {/* Main content */}
      <div
        className="relative z-10 flex items-center gap-4 px-7 py-5"
        style={{
          background: "rgba(255,255,255,0.13)",
          borderRadius: "2.1rem",
          border: "1.3px solid rgba(180,180,180,0.13)",
          backdropFilter: "blur(17px)",
          WebkitBackdropFilter: "blur(17px)",
          minHeight: "86px",
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={img}
            alt={`Album art for ${t.name}`}
            className="w-[66px] h-[66px] object-cover"
            style={{
              borderRadius: "1.1rem",
              border: "2px solid rgba(225,225,225,0.19)",
              boxShadow: "0 2px 8px 0 rgba(80,80,80,0.06)",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity .3s"
            }}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && (
            <div style={{
              width: "66px", height: "66px",
              borderRadius: "1.1rem",
              background: "linear-gradient(135deg,#dfdfdf 10%,#bbb 90%)",
              position: "absolute", left: 0, top: 0
            }} />
          )}
        </div>
        <div className="flex flex-col min-w-0" style={{ flex: 1 }}>
          <span
            className="text-[0.7rem] uppercase tracking-widest mb-1"
            style={{
              background: "linear-gradient(90deg, #fff 55%, #b0b0b0 100%)",
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
              className="truncate text-[1.22rem] font-bold"
              style={{
                background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
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
            className="truncate text-[0.98rem] font-semibold mt-0"
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
        <div style={{ marginLeft: 10, display: "flex", alignItems: "center" }}>
          <MusicIcon />
        </div>
      </div>
    </div>
  );
};

export default NowListening;

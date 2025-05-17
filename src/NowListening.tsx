import React, { useEffect, useState, useRef } from "react";
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

const isMobile = () =>
  typeof window !== "undefined" &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ||
    window.innerWidth < 768);

const NowListening: React.FC = () => {
  const [track, setTrack] = useState<LastFMTrack | null>(null);
  const [img, setImg] = useState<string>(fallbackTrack.image);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mobileView, setMobileView] = useState(isMobile());
  const marqueeRef = useRef<HTMLDivElement>(null);

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

  // Responsive check for mobile
  useEffect(() => {
    const handleResize = () => setMobileView(isMobile());
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Marquee scroll for long title
  useEffect(() => {
    if (!marqueeRef.current) return;
    const { scrollWidth, clientWidth } = marqueeRef.current;
    if (scrollWidth > clientWidth) {
      marqueeRef.current.classList.add("marquee-scroll");
    } else {
      marqueeRef.current.classList.remove("marquee-scroll");
    }
  }, [track]);

  const t = track || fallbackTrack;

  return (
    <div
      className={`now-listening-container relative w-full max-w-2xl mx-auto mb-8 ${mobileView ? "mobile" : ""}`}
      style={{
        borderRadius: mobileView ? "1.2rem" : "2.3rem",
        overflow: "hidden",
        boxShadow: mobileView
          ? "0 4px 16px rgba(60,60,60,0.17), 0 1px 6px rgba(200,200,200,0.09)"
          : "0 12px 40px rgba(60,60,60,0.22), 0 2px 18px rgba(200,200,200,0.11)"
      }}
    >
      {/* Gaussian blurred cover as background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(44px) brightness(0.38) saturate(1.7)",
          WebkitFilter: "blur(44px) brightness(0.38) saturate(1.7)",
          transform: "scale(1.18)"
        }}
        aria-hidden
      />
      {/* Overlay for extra blur and deeper glass effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "rgba(20,20,32,0.62)",
          backdropFilter: "blur(18px) saturate(1.2)",
          WebkitBackdropFilter: "blur(18px) saturate(1.2)"
        }}
      />
      {/* Main content */}
      <div
        className={`relative z-10 flex items-center ${mobileView ? "gap-4 px-3 py-3" : "gap-7 px-10 py-7"}`}
        style={{
          background: "rgba(255,255,255,0.11)",
          borderRadius: mobileView ? "1.2rem" : "2.3rem",
          border: "1.7px solid rgba(180,180,180,0.18)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          minHeight: mobileView ? "76px" : "150px"
        }}
      >
        <div
          style={{
            position: "relative",
            flexShrink: 0,
            width: mobileView ? "58px" : "110px",
            height: mobileView ? "58px" : "110px",
            borderRadius: mobileView ? "1rem" : "1.55rem",
            overflow: "hidden",
            transition: "box-shadow .19s, transform .19s"
          }}
          className="thumbnail-wrapper group"
        >
          <img
            src={img}
            alt={`Album art for ${t.name}`}
            className="object-cover thumbnail-img"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: mobileView ? "1rem" : "1.55rem",
              border: mobileView ? "1.3px solid rgba(225,225,225,0.14)" : "2.5px solid rgba(225,225,225,0.21)",
              boxShadow: "0 4px 14px 0 rgba(80,80,80,0.10), 0 1px 9px #fff3",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity .35s, transform .23s cubic-bezier(.33,1.4,.55,1)",
              zIndex: 2,
            }}
            onLoad={() => setImgLoaded(true)}
            // Only enable zoom on hover for non-mobile
            tabIndex={mobileView ? -1 : 0}
          />
          {!imgLoaded && (
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: mobileView ? "1rem" : "1.55rem",
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
            <div
              ref={marqueeRef}
              className="truncate font-bold text-[1.1rem] md:text-[1.6rem] max-w-full relative"
              style={{
                background: "linear-gradient(90deg, #fff 75%, #b0b0b0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Montserrat', sans-serif",
                lineHeight: 1.15,
                maxWidth: "100%",
                letterSpacing: "0.01em",
                overflow: "hidden"
              }}
            >
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                style={{
                  width: "fit-content",
                  minWidth: 0,
                  display: "inline-block"
                }}
              >
                {t.name}
              </a>
            </div>
            <CompactEqualizer />
          </div>
          <span
            className="truncate text-[1.00rem] md:text-[1.12rem] font-semibold mt-2"
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
        {!mobileView && (
          <div style={{ marginLeft: 16, display: "flex", alignItems: "center" }}>
            <MusicIcon />
          </div>
        )}
      </div>
      <style>{`
        /* Marquee animation for long song titles */
        .marquee-scroll a {
          display: inline-block;
          animation: marquee-song-title 7s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee-song-title {
          0% { transform: translateX(0); }
          10% { transform: translateX(0); }
          90% { transform: translateX(calc(-100% + 75vw)); }
          100% { transform: translateX(calc(-100% + 75vw)); }
        }
        @media (max-width: 767px) {
          .now-listening-container {
            max-width: 99vw !important;
            margin-bottom: 1rem !important;
          }
          .now-listening-container .thumbnail-wrapper {
            min-width: 58px !important;
            min-height: 58px !important;
          }
        }
        /* Hover effect for song thumbnail (desktop only) */
        .thumbnail-wrapper:hover .thumbnail-img,
        .thumbnail-wrapper:focus .thumbnail-img {
          transform: scale(1.13);
          z-index: 3;
          box-shadow: 0 8px 36px #fff5, 0 2px 14px #9998;
        }
        .thumbnail-img {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default NowListening;

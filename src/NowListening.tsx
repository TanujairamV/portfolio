import React, { useEffect, useState } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";
import { FaMusic } from "react-icons/fa";

// iTunes fallback
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

// Circular Pulse Visualizer (doesn't affect/overlap song name)
const PulseVisualizer: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    let growing = true;
    const interval = setInterval(() => {
      setScale((prev) => {
        if (prev >= 1.3) growing = false;
        if (prev <= 1) growing = true;
        return growing ? prev + 0.04 : prev - 0.04;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);
  const size = mobile ? 22 : 30;
  return (
    <span
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginLeft: mobile ? 7 : 14,
        marginRight: 0,
        width: size,
        height: size,
        position: "relative"
      }}
      aria-hidden="true"
    >
      <span
        style={{
          display: "block",
          width: size,
          height: size,
          borderRadius: "50%",
          background: "radial-gradient(circle at 60% 40%, #fff 78%, #b0b0b0 100%)",
          opacity: 0.24,
          position: "absolute",
          left: 0,
          top: 0,
          transform: `scale(${scale})`,
          transition: "transform 0.12s"
        }}
      />
      <span
        style={{
          display: "block",
          width: size - 8,
          height: size - 8,
          borderRadius: "50%",
          background: "linear-gradient(90deg, #fff 90%, #b0b0b0 100%)",
          position: "absolute",
          left: 4,
          top: 4,
          opacity: 0.7,
          boxShadow: "0 0 2px #fff6"
        }}
      />
    </span>
  );
};

const isMobile = () =>
  typeof window !== "undefined" &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ||
    window.innerWidth < 768);

const NowListening: React.FC = () => {
  const [track, setTrack] = useState<LastFMTrack | null>(null);
  const [img, setImg] = useState<string>(fallbackTrack.image);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mobileView, setMobileView] = useState(isMobile());

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

  const t = track || fallbackTrack;

  // Blur settings: soft but image still visible (10-14px on desktop, 8-10px on mobile)
  const blurStrength = mobileView ? 8 : 13;

  return (
    <div
      className={`now-listening-container relative w-full mx-auto mb-8 ${mobileView ? "mobile" : ""}`}
      style={{
        maxWidth: mobileView ? "100vw" : "440px", // smaller than before on PC (was 500+px)
        borderRadius: mobileView ? "1.2rem" : "2.1rem",
        overflow: "hidden",
        boxShadow: mobileView
          ? "0 4px 16px rgba(60,60,60,0.17), 0 1px 6px rgba(200,200,200,0.09)"
          : "0 8px 32px rgba(60,60,60,0.18), 0 2px 12px rgba(200,200,200,0.10)",
        fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', 'Quicksand', sans-serif"
      }}
    >
      {/* Gaussian blurred thumbnail bg (less intense, image content visible) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: `blur(${blurStrength}px) brightness(0.65) saturate(1.45)`,
          WebkitFilter: `blur(${blurStrength}px) brightness(0.65) saturate(1.45)`,
          transform: "scale(1.10)"
        }}
        aria-hidden
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "rgba(18,18,30,0.50)",
          backdropFilter: "blur(1px) saturate(1.15)",
          WebkitBackdropFilter: "blur(1px) saturate(1.15)"
        }}
      />
      {/* Main content */}
      <div
        className={`relative z-10 flex items-center ${mobileView ? "gap-2 px-2.5 py-2.5" : "gap-6 px-8 py-6"}`}
        style={{
          background: "rgba(255,255,255,0.09)",
          borderRadius: mobileView ? "1.2rem" : "2.1rem",
          border: "1.7px solid rgba(180,180,180,0.18)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          minHeight: mobileView ? "76px" : "112px"
        }}
      >
        <div
          style={{
            position: "relative",
            flexShrink: 0,
            width: mobileView ? "56px" : "100px",
            height: mobileView ? "56px" : "100px",
            borderRadius: mobileView ? "1.1rem" : "1.6rem",
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
              borderRadius: mobileView ? "1.1rem" : "1.6rem",
              border: mobileView ? "1.3px solid rgba(225,225,225,0.14)" : "2.5px solid rgba(225,225,225,0.21)",
              boxShadow: "0 4px 14px 0 rgba(80,80,80,0.10), 0 1px 9px #fff3",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity .35s, transform .23s cubic-bezier(.33,1.4,.55,1)",
              zIndex: 2
            }}
            onLoad={() => setImgLoaded(true)}
            tabIndex={mobileView ? -1 : 0}
          />
          {!imgLoaded && (
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: mobileView ? "1.1rem" : "1.6rem",
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
              fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
              letterSpacing: "0.17em",
              fontWeight: 600
            }}
          >
            Now Playing
          </span>
          <div className="flex items-center gap-0">
            <div
              className="truncate font-bold text-[1.10rem] md:text-[1.28rem] max-w-full relative"
              style={{
                background: "linear-gradient(90deg, #fff 75%, #b0b0b0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
                fontWeight: 700,
                lineHeight: 1.14,
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
                  display: "inline-block",
                  background: "linear-gradient(90deg,#fff 80%,#b0b0b0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {t.name}
              </a>
            </div>
            <PulseVisualizer mobile={mobileView} />
          </div>
          <span
            className="truncate text-[0.98rem] md:text-[1.08rem] font-semibold mt-2"
            style={{
              background: "linear-gradient(90deg, #fff 45%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
              lineHeight: 1.13,
              maxWidth: "100%",
              fontWeight: 500
            }}
          >
            {t.artist}
          </span>
        </div>
        {!mobileView && (
          <div style={{ marginLeft: 16, display: "flex", alignItems: "center" }}>
            <FaMusic
              size={32}
              style={{
                background: "linear-gradient(90deg,#fff 85%, #b0b0b0 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 2px 10px #fff6)"
              }}
            />
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 767px) {
          .now-listening-container {
            max-width: 99vw !important;
            margin-bottom: 1rem !important;
            border-radius: 1.2rem !important;
          }
          .now-listening-container .thumbnail-wrapper {
            min-width: 54px !important;
            min-height: 54px !important;
          }
        }
        .thumbnail-wrapper:hover .thumbnail-img,
        .thumbnail-wrapper:focus .thumbnail-img {
          transform: scale(1.09);
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

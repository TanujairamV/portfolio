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

const SoftEqualizer: React.FC<{ mobile?: boolean }> = ({ mobile }) => (
  <div className="equalizer-bars" aria-hidden="true">
    <div className="equalizer-bar bar1" />
    <div className="equalizer-bar bar2" />
    <div className="equalizer-bar bar3" />
  </div>
);

const HorizontalPopVisualizer: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  // Animation state for each line
  const [pops, setPops] = useState([1, 1, 1]);
  useEffect(() => {
    let t = 0;
    const popArray = [1, 1, 1];
    const interval = setInterval(() => {
      t += 1;
      popArray[0] = 1 + 0.7 * Math.abs(Math.sin((t + 0) * 0.10));
      popArray[1] = 1 + 0.7 * Math.abs(Math.sin((t + 10) * 0.11));
      popArray[2] = 1 + 0.7 * Math.abs(Math.sin((t + 20) * 0.095));
      setPops([...popArray]);
    }, 70);
    return () => clearInterval(interval);
  }, []);
  const width = mobile ? 50 : 74;
  const gap = mobile ? 6 : 10;
  const baseHeight = mobile ? 4 : 6;
  return (
    <div
      style={{
        display: 'flex',
        gap: `${gap}px`,
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: mobile ? "-13px" : "-18px",
        zIndex: 2,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: width / 4.5,
            height: baseHeight * pops[i],
            borderRadius: "8px",
            background: "linear-gradient(90deg,#fff 80%,#b0b0b0 100%)",
            opacity: 0.92,
            boxShadow: "0 2px 12px 0 rgba(255,255,255,0.25)",
            transition: "height 0.22s cubic-bezier(.47,1.64,.41,.8), background 0.17s"
          }}
        />
      ))}
    </div>
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

  useEffect(() => {
    const handleResize = () => setMobileView(isMobile());
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const t = track || fallbackTrack;
  const blurStrength = mobileView ? 7 : 11;

  // For continuously animating wave ripple
  const [waveRipples, setWaveRipples] = useState([true, false, false]);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setWaveRipples([true, false, false].map((_, idx) => (i + idx) % 3 === 0));
      i = (i + 1) % 3;
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`now-listening-container relative w-full mx-auto mb-8 ${mobileView ? "mobile" : ""}`}
      style={{
        maxWidth: mobileView ? "100vw" : "410px",
        borderRadius: mobileView ? "1.15rem" : "2rem",
        overflow: "hidden",
        boxShadow: mobileView
          ? "0 4px 16px rgba(60,60,60,0.14), 0 1px 6px rgba(200,200,200,0.07)"
          : "0 6px 22px rgba(60,60,60,0.12), 0 2px 10px rgba(200,200,200,0.08)",
        fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', sans-serif",
        background: "rgba(255,255,255,0.05)",
        position: "relative"
      }}
      tabIndex={0}
      // no onClick - do not redirect
      style={{ cursor: "pointer" }}
    >
      {/* Constant Wave Ripple */}
      <span
        className="nowlistening-wave-ripple"
        style={{
          left: "50%",
          top: "50%",
          width: mobileView ? "180px" : "250px",
          height: mobileView ? "180px" : "250px",
          transform: "translate(-50%, -50%)",
          zIndex: 1
        }}
      />
      {/* Blurred thumbnail bg */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: `blur(${blurStrength}px) brightness(0.74) saturate(1.3)`,
          WebkitFilter: `blur(${blurStrength}px) brightness(0.74) saturate(1.3)`,
          transform: "scale(1.09)",
          opacity: 0.95
        }}
        aria-hidden
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "rgba(18,18,30,0.37)",
          backdropFilter: "blur(1px) saturate(1.08)",
          WebkitBackdropFilter: "blur(1px) saturate(1.08)"
        }}
      />
      {/* Main content */}
      <div
        className={`relative z-10 flex items-center ${mobileView ? "gap-2 px-2.5 py-2.5" : "gap-5 px-7 py-5"}`}
        style={{
          background: "rgba(255,255,255,0.07)",
          borderRadius: mobileView ? "1.15rem" : "2rem",
          border: "1.5px solid rgba(180,180,180,0.16)",
          minHeight: mobileView ? "70px" : "104px",
          boxShadow: "0 1px 8px 0 rgba(100,100,100,0.08)",
          transition: "background 0.2s, box-shadow 0.2s"
        }}
      >
        <div
          style={{
            position: "relative",
            flexShrink: 0,
            width: mobileView ? "50px" : "86px",
            height: mobileView ? "50px" : "86px",
            borderRadius: mobileView ? "0.9rem" : "1.3rem",
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
              borderRadius: mobileView ? "0.9rem" : "1.3rem",
              border: mobileView ? "1.1px solid rgba(225,225,225,0.11)" : "2px solid rgba(225,225,225,0.16)",
              boxShadow: "0 3px 11px 0 rgba(80,80,80,0.09), 0 1px 7px #fff2",
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
              borderRadius: mobileView ? "0.9rem" : "1.3rem",
              background: "linear-gradient(135deg,#e8e8e8 10%,#bbb 90%)",
              position: "absolute", left: 0, top: 0
            }} />
          )}
        </div>
        <div className="flex flex-col min-w-0" style={{ flex: 1, minWidth: 0 }}>
          <span
            className="text-[0.72rem] uppercase tracking-widest mb-1"
            style={{
              background: "linear-gradient(90deg, #fff 55%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
              letterSpacing: "0.15em",
              fontWeight: 600,
              opacity: 0.91
            }}
          >
            Now Playing
          </span>
          <div className="flex items-center gap-2">
            <div
              className="truncate font-bold text-[1.02rem] md:text-[1.13rem] max-w-full relative"
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
              <span
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
              </span>
            </div>
            <SoftEqualizer mobile={mobileView} />
          </div>
          <span
            className="truncate text-[0.93rem] md:text-[1.01rem] font-semibold mt-2"
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
          <div style={{ marginLeft: 13, display: "flex", alignItems: "center" }}>
            <FaMusic
              size={28}
              style={{
                background: "linear-gradient(90deg,#fff 85%, #b0b0b0 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 2px 10px #fff5)"
              }}
            />
          </div>
        )}
      </div>
      {/* Horizontal popping visualizer */}
      <HorizontalPopVisualizer mobile={mobileView} />
      <style>{`
        @media (max-width: 767px) {
          .now-listening-container {
            max-width: 99vw !important;
            margin-bottom: 1rem !important;
            border-radius: 1.15rem !important;
          }
          .now-listening-container .thumbnail-wrapper {
            min-width: 49px !important;
            min-height: 49px !important;
          }
        }
        .thumbnail-wrapper:hover .thumbnail-img,
        .thumbnail-wrapper:focus .thumbnail-img {
          transform: scale(1.06);
          z-index: 3;
          box-shadow: 0 7px 31px #fff5, 0 2px 10px #9997;
        }
        .thumbnail-img {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default NowListening;

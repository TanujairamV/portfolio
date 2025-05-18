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

const BoxWideVisualizer: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  // 16 bars for desktop, 8 for mobile
  const barCount = mobile ? 8 : 16;
  const [heights, setHeights] = useState(Array(barCount).fill(8));
  useEffect(() => {
    let raf: number;
    let anim = true;
    const animate = () => {
      setHeights(
        Array(barCount)
          .fill(0)
          .map((_, i) =>
            10 +
            Math.abs(
              Math.sin(Date.now() / (330 + i * 13)) +
              Math.cos(Date.now() / (210 + i * 41))
            ) * (mobile ? 14 : 20)
          )
      );
      if (anim) raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      anim = false;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line
  }, [barCount, mobile]);
  return (
    <div
      className="box-wide-visualizer"
      style={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        height: mobile ? 18 : 28,
        marginTop: mobile ? 9 : 13,
        gap: mobile ? 3 : 5,
        justifyContent: "center",
        pointerEvents: "none"
      }}
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: mobile ? 6 : 9,
            height: h,
            borderRadius: 5,
            background: "linear-gradient(90deg,#fff 80%,#b0b0b0 100%)",
            opacity: 0.88,
            boxShadow: "0 1.5px 7px 0 rgba(255,255,255,0.19)",
            transition: "height 0.17s cubic-bezier(.2,1.2,.41,.8)"
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

  return (
    <div
      className={`now-listening-container relative w-full mx-auto mb-8 ${mobileView ? "mobile" : ""}`}
      style={{
        maxWidth: mobileView ? "100vw" : "460px",
        borderRadius: mobileView ? "1.15rem" : "2rem",
        overflow: "hidden",
        boxShadow: mobileView
          ? "0 4px 16px rgba(60,60,60,0.14), 0 1px 6px rgba(200,200,200,0.07)"
          : "0 6px 22px rgba(60,60,60,0.12), 0 2px 10px rgba(200,200,200,0.08)",
        fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', sans-serif",
        background: "rgba(255,255,255,0.05)",
        position: "relative",
        cursor: "pointer"
      }}
      tabIndex={0}
    >
      {/* Constant Particles Blur Ripple Android 15 style */}
      <span className="particle-blur-bg" aria-hidden="true">
        <span className="particle p1"></span>
        <span className="particle p2"></span>
        <span className="particle p3"></span>
        <span className="particle p4"></span>
        <span className="particle p5"></span>
        <span className="particle p6"></span>
        <span className="particle p7"></span>
        <span className="particle p8"></span>
      </span>
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
        className={`relative z-10 flex items-center ${mobileView ? "gap-2 px-2.5 py-2.5" : "gap-7 px-8 py-6"}`}
        style={{
          background: "rgba(255,255,255,0.07)",
          borderRadius: mobileView ? "1.15rem" : "2rem",
          border: "1.5px solid rgba(180,180,180,0.16)",
          minHeight: mobileView ? "80px" : "120px",
          boxShadow: "0 1px 8px 0 rgba(100,100,100,0.08)",
          transition: "background 0.2s, box-shadow 0.2s"
        }}
      >
        {/* Album art */}
        <div
          style={{
            position: "relative",
            flexShrink: 0,
            width: mobileView ? "62px" : "98px",
            height: mobileView ? "62px" : "98px",
            borderRadius: mobileView ? "1.15rem" : "1.9rem",
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
              borderRadius: mobileView ? "1.15rem" : "1.9rem",
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
              borderRadius: mobileView ? "1.15rem" : "1.9rem",
              background: "linear-gradient(135deg,#e8e8e8 10%,#bbb 90%)",
              position: "absolute", left: 0, top: 0
            }} />
          )}
        </div>
        {/* Info block */}
        <div className="flex flex-col min-w-0 flex-1" style={{ marginLeft: mobileView ? 10 : 22, position: "relative" }}>
          <span
            className="text-[0.75rem] uppercase tracking-widest mb-1"
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
            Now Listening
          </span>
          <span
            className="truncate font-bold text-[1.15rem] md:text-[1.24rem] max-w-full relative"
            style={{
              background: "linear-gradient(90deg, #fff 75%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
              fontWeight: 700,
              lineHeight: 1.17,
              maxWidth: "100%",
              letterSpacing: "0.01em",
              overflow: "hidden"
            }}
          >
            {t.name}
          </span>
          <span
            className="truncate text-[1.03rem] md:text-[1.11rem] font-semibold mt-1"
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
          <BoxWideVisualizer mobile={mobileView} />
        </div>
        {/* Music Icon right */}
        <span style={{
          color: "#fff",
          fontSize: mobileView ? 22 : 32,
          marginLeft: mobileView ? 7 : 15,
          filter: "drop-shadow(0 2px 6px #fff5)",
          opacity: 0.92,
          flexShrink: 0
        }}>
          <FaMusic />
        </span>
      </div>
    </div>
  );
};

export default NowListening;

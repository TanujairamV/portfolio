import React, { useEffect, useState } from "react";
import { fetchRecentTrack, LastFMTrack } from "./lastFmApi";

// Use iTunes Search API (no API key, no limit) for song artwork
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

        // Use iTunes thumbnail for the current track (free, no key, no limit)
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
  },

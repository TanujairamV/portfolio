import { useState, useEffect } from 'react';

const LastFM = () => {
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch('https://inquisitive-gamefowl-tanujairam-tg-e1360444.koyeb.app/api/lastfm');
        if (!response.ok) {
          throw new Error('Failed to fetch track data');
        }
        const data = await response.json();
        setTrack(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching Last.fm data:', err.message);
        setError('Unable to fetch track data');
      }
    };

    fetchTrack();
  }, []);

  if (error) {
    return (
      <div className="lastfm-section text-red-500 bg-black/30 rounded-xl p-4 text-sm">
        {error}
      </div>
    );
  }

  if (!track) {
    return (
      <div className="lastfm-section bg-black/30 rounded-xl p-4 text-white text-sm">
        Fetching track...
      </div>
    );
  }

  return (
    <div className="lastfm-section bg-black/30 backdrop-blur-xl text-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-3 max-w-xs mx-auto">
      <h3 className="text-lg font-semibold text-white/90">🎵 Now Playing</h3>
      <img
        src={track.image}
        alt={`${track.name} by ${track.artist}`}
        className="w-32 h-32 object-cover rounded-md border border-white/20"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
        }}
      />
      <p className="text-center text-sm font-medium">
        {track.name} <br /> <span className="text-white/60">by {track.artist}</span>
      </p>
      <p className="text-xs text-white/50 italic">Album: {track.album}</p>
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline hover:text-accent/80 transition text-sm mt-1"
      >
        Listen on Last.fm →
      </a>
    </div>
  );
};

export default LastFM;

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
    return <div className="lastfm-section text-red-500">{error}</div>;
  }

  if (!track) {
    return <div className="lastfm-section">Loading...</div>;
  }

  return (
    <div className="lastfm-section">
      <h3>Now Playing</h3>
      <img
        src={track.image}
        alt={`${track.name} by ${track.artist}`}
        className="w-32 h-32 object-cover"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
        }}
      />
      <p>{track.name} by {track.artist}</p>
      <p>Album: {track.album}</p>
      <a href={track.url} target="_blank" rel="noopener noreferrer">Listen on Last.fm</a>
    </div>
  );
};

export default LastFM;

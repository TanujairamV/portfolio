import { useState, useEffect } from 'react';

const LastFM = () => {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch('https://your-lastfm-proxy.herokuapp.com/api/recent-tracks');
        const data = await response.json();
        setTrack(data);
      } catch (error) {
        console.error('Error fetching Last.fm data:', error);
      }
    };

    fetchTrack();
  }, []);

  if (!track) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lastfm-section">
      <h3>Now Playing</h3>
      <img src={track.image} alt={`${track.name} by ${track.artist}`} className="w-32 h-32 object-cover" />
      <p>{track.name} by {track.artist}</p>
      <p>Album: {track.album}</p>
      <a href={track.url} target="_blank" rel="noopener noreferrer">Listen on Last.fm</a>
    </div>
  );
};

export default LastFM;

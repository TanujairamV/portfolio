import { useState, useEffect } from 'react';
import { fetchRecentTrack, LastFMTrack } from './lastFmApi';

const LastFm = () => {
  const [track, setTrack] = useState<LastFMTrack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadTrack = async () => {
      try {
        const trackData = await fetchRecentTrack();
        setTrack(trackData);
        setError(null);
      } catch (err) {
        console.error('Error fetching Last.fm data:', err.message);
        setError('Unable to fetch track data');
      }
    };

    loadTrack();
    const interval = setInterval(loadTrack, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="lastfm-section bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Now Playing</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="lastfm-section bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Now Playing</h3>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="lastfm-section bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Now Playing</h3>
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 rounded-lg">
              <p className="text-gray-400 text-xs">Loading...</p>
            </div>
          )}
          <img
            src={track.image}
            alt={`${track.name} by ${track.artist}`}
            className={`w-20 h-20 object-cover rounded-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
              setImageLoaded(true);
            }}
          />
        </div>
        <div>
          <p className="text-lg font-medium">{track.name}</p>
          <p className="text-gray-400">by {track.artist}</p>
          <p className="text-sm text-gray-500">Album: {track.album}</p>
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm"
          >
            Listen on Last.fm
          </a>
        </div>
      </div>
    </div>
  );
};

export default LastFm;

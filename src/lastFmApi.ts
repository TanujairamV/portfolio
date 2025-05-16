import { TrackData } from './types';

export const fetchListeningData = async (): Promise<TrackData> => {
  try {
    const response = await fetch('https://inquisitive-gamefowl-tanujairam-tg-e1360444.koyeb.app/api/lastfm');
    
    // Check if the response is successful
    if (!response.ok) {
      console.error(`Proxy API request failed with status: ${response.status} ${response.statusText}`);
      throw new Error('Proxy API request failed');
    }

    const data = await response.json();
    console.log('Proxy API Response:', data);

    if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
      const track = data.recenttracks.track[0];
      const isPlaying = track['@attr']?.nowplaying === 'true'; // Ensure proper check for nowplaying
      const imageUrl = track.image?.[3]?.['#text'] || 'https://via.placeholder.com/150?text=No+Image';
      return {
        track: track.name || 'Unknown Track',
        artist: track.artist?.['#text'] || 'Unknown Artist',
        isPlaying: !!isPlaying, // Ensure boolean value
        imageUrl
      };
    }

    console.log('No recent tracks found in proxy response');
    return { track: '', artist: '', isPlaying: false, imageUrl: '' };
  } catch (error) {
    console.error('Error fetching data from proxy:', error);
    
    // Fallback to mock data if the proxy fails
    console.log('Falling back to mock data due to proxy failure');
    return {
      track: 'Blinding Lights',
      artist: 'The Weeknd',
      isPlaying: true,
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36'
    };
  }
};

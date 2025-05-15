import { TrackData } from '../types';

export const fetchListeningData = async (): Promise<TrackData> => {
  try {
    const response = await fetch(
      'https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Tanujairam&api_key=fb511fc171607840e4a48bbd618ef011&format=json&limit=1'
    );
    const data = await response.json();
    console.log('Last.fm API Response:', data);
    if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
      const track = data.recenttracks.track[0];
      const isPlaying = track['@attr'] && track['@attr'].nowplaying;
      const imageUrl = track.image && track.image[3] ? track.image[3]['#text'] : '';
      return {
        track: track.name || 'Unknown Track',
        artist: track.artist['#text'] || 'Unknown Artist',
        isPlaying: isPlaying,
        imageUrl: imageUrl || 'https://via.placeholder.com/150?text=No+Image'
      };
    }
    console.log('No recent tracks found');
    return { track: '', artist: '', isPlaying: false, imageUrl: '' };
  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    return { track: '', artist: '', isPlaying: false, imageUrl: '' };
  }
};

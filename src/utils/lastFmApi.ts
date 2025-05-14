export interface TrackData {
  track: string;
  artist: string;
  isPlaying: boolean;
}

export const fetchListeningData = async (): Promise<TrackData> => {
  try {
    const response = await fetch(
      'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Tanujairam&api_key=fb511fc171607840e4a48bbd618ef011&format=json&limit=1'
    );
    const data = await response.json();
    if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
      const track = data.recenttracks.track[0];
      const isPlaying = track['@attr'] && track['@attr'].nowplaying;
      return {
        track: track.name || 'Unknown Track',
        artist: track.artist['#text'] || 'Unknown Artist',
        isPlaying: isPlaying
      };
    }
    return { track: '', artist: '', isPlaying: false };
  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    return { track: '', artist: '', isPlaying: false };
  }
};

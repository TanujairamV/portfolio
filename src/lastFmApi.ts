export interface LastFMTrack {
  artist: string;
  name: string;
  album: string;
  image: string;
  url: string;
}

export const fetchRecentTrack = async (): Promise<LastFMTrack> => {
  const response = await fetch('https://inquisitive-gamefowl-tanujairam-tg-e1360444.koyeb.app/api/lastfm');
  if (!response.ok) {
    throw new Error(`Failed to fetch recent track: ${response.statusText}`);
  }
  const data = await response.json();
  // Validate the response data
  if (!data.artist || !data.name || !data.album || !data.image || !data.url) {
    throw new Error('Invalid track data received from Last.fm proxy');
  }
  return data as LastFMTrack;
};

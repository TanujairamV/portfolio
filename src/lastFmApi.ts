export interface LastFMTrack {
  artist: string;
  name: string;
  album: string;
  image: string;
  url: string;
}

export const fetchRecentTrack = async (): Promise<LastFMTrack> => {
  try {
    const response = await fetch('https://inquisitive-gamefowl-tanujairam-tg-e1360444.koyeb.app/api/lastfm');
    if (!response.ok) {
      throw new Error('Failed to fetch recent track');
    }
    const data: LastFMTrack = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Last.fm track:', error.message);
    throw error;
  }
};

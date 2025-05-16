// src/lastFmApi.ts

export interface LastFMTrack {
  artist: string;
  name: string;
  album: string;
  image: string;
  url: string;
}

// Optional: Move this to a config file if needed
const LAST_FM_PROXY_URL = 'https://inquisitive-gamefowl-tanujairam-tg-e1360444.koyeb.app/api/lastfm';

// Type guard to ensure API response matches LastFMTrack interface
function isLastFMTrack(data: any): data is LastFMTrack {
  return (
    typeof data.artist === 'string' &&
    typeof data.name === 'string' &&
    typeof data.album === 'string' &&
    typeof data.image === 'string' &&
    typeof data.url === 'string'
  );
}

export const fetchRecentTrack = async (): Promise<LastFMTrack> => {
  try {
    const response = await fetch(LAST_FM_PROXY_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch recent track: ${response.statusText}`);
    }

    const data = await response.json();

    if (!isLastFMTrack(data)) {
      throw new Error('Invalid track data received from Last.fm proxy');
    }

    return data;
  } catch (error) {
    console.error('[LastFM API Error]', error);
    throw error;
  }
};

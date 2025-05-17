export const fetchRecentTrack = async (): Promise<LastFMTrack> => {
  try {
    const response = await fetch(LAST_FM_PROXY_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch recent track: ${response.statusText}`);
    }

    const data = await response.json();

    // Handle Last.fm API response shape
    const trackData = data?.recenttracks?.track?.[0];
    if (!trackData) {
      throw new Error("No recent track data found.");
    }

    // Find the largest image available
    const imageObj = Array.isArray(trackData.image)
      ? trackData.image.find((img: any) => img.size === "extralarge") ||
        trackData.image[trackData.image.length - 1] // fallback to last
      : null;

    const imageUrl = imageObj?.["#text"] || "";

    const mappedTrack: LastFMTrack = {
      artist: trackData.artist["#text"] || trackData.artist,
      name: trackData.name,
      album: trackData.album?.["#text"] || "",
      image: imageUrl,
      url: trackData.url,
    };

    return mappedTrack;
  } catch (error) {
    console.error("[LastFM API Error]", error);
    throw error;
  }
};

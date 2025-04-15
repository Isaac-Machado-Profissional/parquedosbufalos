// Pegar o caminho correto do backend
export const fetchInstagramFeed = async () => {
  try {
    const response = await fetch('/api/instagram-feed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Instagram feed:", error);
  }
};

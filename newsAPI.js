
export const fetchNews = async (category, page) => {
  const apiKey = '10cdd2afe4eb4667a84c0af16d4a75f9'; 
  const url = `https://newsapi.org/v2/everything?q=Apple&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

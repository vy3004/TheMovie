const baseUrl = process.env.TMDB_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
  const searchParams = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${key}&${searchParams}`;
};

export default { getUrl };

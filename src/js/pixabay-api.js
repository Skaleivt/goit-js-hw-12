import axios from 'axios';

export async function getImagesByQuery(query, page, perPage) {
  const searchParams = new URLSearchParams({
    key: '48886554-241e539fadf1e6089b951f472',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: perPage,
    safesearch: true
  });

  try {
    const response = await axios.get(`https://pixabay.com/api/?${searchParams}`)
    return response.data;
    } catch(err) {
      throw err;
  };
}
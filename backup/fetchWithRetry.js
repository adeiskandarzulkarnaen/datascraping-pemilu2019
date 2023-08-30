const axios = require('axios');

async function fetchDataWithRetries() {
  const maxRetries = 3;
  const retryDelay = 2000; // in milliseconds

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axios.get('https://example.com');
      return response.data;
    } catch (error) {
      console.error('Request failed:', error.message);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }

  throw new Error('Max retries reached, unable to fetch data.');
}

fetchDataWithRetries()
  .then((data) => console.log('Data:', data))
  .catch((error) => console.error('Error:', error.message));

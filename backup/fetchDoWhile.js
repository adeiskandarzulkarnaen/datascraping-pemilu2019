const axios = require('axios');


async function fetchDataWithRetries() {
  let success;
  while (!success) {
    try {
      const { data } = await axios.get();
      success = true;
      return data;
    } catch (error) {
      console.error('Request failed:', error.message);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Retrying...');
    }
  }
}

const init = async () => {
  const result = await fetchDataWithRetries();
  console.log(result);
};

init();

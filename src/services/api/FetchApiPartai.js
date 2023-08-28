const axios = require('axios');

class FetchApiPartai {
  constructor() {
    this._axios = axios;
    this._baseUrl = 'https://pemilu2019.kpu.go.id/static/json';
  }

  async getPartai() {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/partai.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = FetchApiPartai;

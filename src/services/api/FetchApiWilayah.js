const axios = require('axios');

class FetchApiWilayah {
  constructor() {
    this._axios = axios;
    this._baseUrl = 'https://pemilu2019.kpu.go.id/static/json';
  }

  async getDataWilayah(kodeLokasi='0') {
    /* Parameter kodeLokasi :
     * nasional = '0'
     * provinsi = 'kodeProvinsi'
     * kabupaten = 'kodeProvinsi/kodeKabupaten'
     * kecamatan = 'kodeProvinsi/kodeKabupaten/kodeKecamatan'
     * tps = 'kodeProvinsi/kodeKabupaten/kodeKecamatan/kodeTps'
     */
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/wilayah/${kodeLokasi}.json`);
      return data;
    } catch (error) {
      console.log(`terjadi kesalahan: ${kodeLokasi}`);
      console.log(error);
    }
  }
};

module.exports = FetchApiWilayah;

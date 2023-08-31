class FetchApiWilayah {
  constructor(axios) {
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
    let success;
    while (!success) {
      try {
        const { data } = await this._axios.get(`${this._baseUrl}/wilayah/${kodeLokasi}.json`);
        success = true;
        return data;
      } catch (error) {
        console.error('Request failed:', error.message);
        console.log('terjadi kesalahan: ', kodeLokasi);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('retrying...');
      }
    }
  }
};

module.exports = FetchApiWilayah;

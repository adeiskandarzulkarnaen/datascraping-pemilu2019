class FetchApiPilegDpr {
  constructor(axios) {
    this._axios = axios;
    this._baseUrl = 'https://pemilu2019.kpu.go.id/static/json';
  }

  async getDapilDpr() {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/dapil/dprri.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // hasil => Dapil
  async getHasilHitungCalegDprDapil() {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/hhcd/0.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // hasil DPRD Provindi => Dapil Provisi
  async getHasilHitungCalegDprDapilProvonsi(kodeProvinsi) {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/hhcd/${kodeProvinsi}.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  /* =========================================================================== */
  async getHasilHitungSuara(kodeLokasi=null) {
    /* Parameter kodeLokasi
    * default => return tingkat nasional
    * untuk detail provinsi => 'kodeProvinsi'
    * untuk detail kabupaten => 'kodeProvinsi/kodeKabupaten'
    * untuk detail kecamatan => 'kodeProvinsi/kodeKabupaten/kodeKecamatan'
    * untuk detail kelurahan => 'kodeProvinsi/kodeKabupaten/kodeKelurahan'
    * untul detail tps => 'kodeProvinsi/kodeKabupaten/kodeKecamatan/kodeTps'
    */

    const locationCode = (kodeLokasi) ? `dprri/${kodeLokasi}` : 'dprri';

    let success;
    while (!success) {
      try {
        const { data } = await this._axios.get(`${this._baseUrl}/hhcw/${locationCode}.json`);
        return data;
      } catch (error) {
        console.log('request gagal:', error.message);
        console.log('terjadi kesalahan: ', kodeLokasi);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('reconnect...');
      }
    }
  }
}


module.exports = FetchApiPilegDpr;

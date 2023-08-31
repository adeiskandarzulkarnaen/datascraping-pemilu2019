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
  // Hasil => Wilayah Nasional
  async getHitungCalegDprWilayah() {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/hhcw/dprri.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // Hasil => Wilayah Provinsi
  async getHitungCalegDprWilayahProvinsi(kodeProvinsi) {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/hhcw/dprri/${kodeProvinsi}.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // Hasil => Wilayah Kabupaten
  async getHitungCalegDprWilayahKabupaten(kodeProvinsi, kodeKabupaten) {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/hhcw/dprri/${kodeProvinsi}/${kodeKabupaten}.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // Hasil => Wilayah Kecamatan
  async getHitungCalegDprWilayahKecamatan(kodeProvinsi, kodeKabupaten, kodeKecamatan) {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/hhcw/dprri/${kodeProvinsi}/${kodeKabupaten}/${kodeKecamatan}.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // Hasil => Wilayah Kelurahan
  async getHitungCalegDprWilayahKelurahan(kodeProvinsi, kodeKabupaten, kodeKecamatan, kodeKelurahan) {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/hhcw/dprri/${kodeProvinsi}/${kodeKabupaten}/${kodeKecamatan}/${kodeKelurahan}.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // Hasil => Wilayah TPS
  async getHitungCalegDprWilayahTps(kodeProvinsi, kodeKabupaten, kodeKecamatan, kodeKelurahan, kodeTps) {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/hhcw/dprri/${kodeProvinsi}/${kodeKabupaten}/${kodeKecamatan}/${kodeKelurahan}/${kodeTps}.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}


module.exports = FetchApiPilegDpr;

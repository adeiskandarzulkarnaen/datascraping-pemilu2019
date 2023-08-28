const axios = require('axios');

class FetchApiPilpres {
  constructor() {
    this._axios = axios;
    this._baseUrl = 'https://pemilu2019.kpu.go.id/static/json';
  }

  async getDaftarCalon() {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/ppwp.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Parameter typeHasil
   * Gunakan 'hhcw' untuk Hitung Hasil Caleg Wilayah
   * Gunakan 'hr' untuk Hasil Rekapitulasi; // () => hanya sampai tingkat kelurahan
   * Gunakan 'ds' untuk Data Sengketa;
   * Gunakan 'ph' untuk Penetapan Hasil;
   */
  /* Parameter kodeLokasi :
   * untuk detail provinsi => 'kodeProvinsi'
   * untuk detail kabupaten => 'kodeProvinsi/kodeKabupaten'
   * untuk detail kecamatan => 'kodeProvinsi/kodeKabupaten/kodeKecamatan'
   * untuk detail kelurahan => 'kodeProvinsi/kodeKabupaten/kodeKelurahan'
   * untul detail tps => 'kodeProvinsi/kodeKabupaten/kodeKecamatan/kodeTps'
   */

  async getHasilPilpres(typeHasil, kodeLokasi=null) {
    try {
      this._typeHasilValidator(typeHasil);
      if (!kodeLokasi) {
        const { data } = await this._axios.get(`${this._baseUrl}/${typeHasil}/ppwp.json`);
        return data;
      }
      const { data } = await this._axios.get(`${this._baseUrl}/${typeHasil}/ppwp/${kodeLokasi}.json`);
      return data;
    } catch (error) {
      console.log(`terjadi kesalahan: ${kodeLokasi}`);
      console.log(error.message);
    }
  }

  _typeHasilValidator(typeHasil) {
    if ((typeHasil !== 'hhcw') && (typeHasil !== 'hr') && (typeHasil !== 'ds') && (typeHasil !== 'ph')) {
      console.log(typeHasil);
      throw new Error('Parameter typeHasil tidak sesuai!!! \nGunakan \'hhcw\' untuk hitung hasil; \nGunakan \'hr\' untuk hasil rekapitulasi; \nGunakan \'ds\' untuk data sengketa; \nGunakan \'ph\' untuk penetapan hasil;');
    }
  }
};

module.exports = FetchApiPilpres;

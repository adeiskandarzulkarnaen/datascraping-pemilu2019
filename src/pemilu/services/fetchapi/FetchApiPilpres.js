class FetchApiPilpres {
  constructor(axios) {
    this._axios = axios;
    this._baseUrl = 'https://pemilu2019.kpu.go.id/static/json';
  }

  async getDaftarCawapres() {
    try {
      const { data } = await this._axios.get(`${this._baseUrl}/ppwp.json`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getHasilPilpres(typeHasil='hhcw', kodeLokasi=null) {
  /* Parameter typeHasil
    * Gunakan 'hhcw' untuk Hitung Hasil Caleg Wilayah
    * Gunakan 'hr' untuk Hasil Rekapitulasi; // () => hanya sampai tingkat kelurahan
    * Gunakan 'ds' untuk Data Sengketa;
    * Gunakan 'ph' untuk Penetapan Hasil;
    *
    /* Parameter kodeLokasi
    * default => return tingkat nasional
    * untuk detail provinsi => 'kodeProvinsi'
    * untuk detail kabupaten => 'kodeProvinsi/kodeKabupaten'
    * untuk detail kecamatan => 'kodeProvinsi/kodeKabupaten/kodeKecamatan'
    * untuk detail kelurahan => 'kodeProvinsi/kodeKabupaten/kodeKelurahan'
    * untul detail tps => 'kodeProvinsi/kodeKabupaten/kodeKecamatan/kodeTps'
    */

    this._typeHasilValidator(typeHasil);
    const locationCode = (kodeLokasi) ? `ppwp/${kodeLokasi}` : 'ppwp';

    let success;
    while (!success) {
      try {
        const { data } = await this._axios.get(`${this._baseUrl}/${typeHasil}/${locationCode}.json`);
        return data;
      } catch (error) {
        console.log('request gagal:', error.message);
        console.log('terjadi kesalahan: ', kodeLokasi);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('reconnect...');
      }
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

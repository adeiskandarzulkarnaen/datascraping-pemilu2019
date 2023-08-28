const pool = require('../../config/pool');

class WilayahDataRepository {
  constructor() {
    this._pool = pool;
  }

  async addWilayahData(kodeWilayah, namaWilayah, penduduk=null) {
    const query = {
      sql: `INSERT INTO wilayah_data(kode, nama, penduduk) VALUES(?, ?, ?)`,
      values: [kodeWilayah, namaWilayah, penduduk],
    };
    await this._pool.query(query);
    // console.log(`Berhasil menambahkan "data_wilayah" => Kode: ${kodeWilayah}, nama: ${namaWilayah}`);
  }
}

module.exports = WilayahDataRepository;

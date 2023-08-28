const pool = require('../../config/pool');

class WilayahRepository {
  constructor() {
    this._pool = pool;
  }

  async addWilayah(kodeWilayah, namaWilayah, tingkatWilayah) {
    const query = {
      sql: `INSERT INTO wilayah(kode, nama, tingkat_wilayah) VALUES(?, ?, ?)`,
      values: [kodeWilayah, namaWilayah, tingkatWilayah],
    };
    await this._pool.query(query);
    // console.log(`Berhasil menambahkan wilayah => Kode: ${kodeWilayah}, nama: ${namaWilayah}, tingkat: ${tingkatWilayah}`);
  }
}

module.exports = WilayahRepository;

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
    console.log('add wilayah success +1');
  }
}

module.exports = WilayahRepository;

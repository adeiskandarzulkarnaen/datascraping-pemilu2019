const pool = require('../../config/pool');

class DapilWilayahRepository {
  constructor() {
    this._pool = pool;
  }

  async addDapilWilayah(dapilId, kodeWilayah, keterangan, jumlahKursi=null) {
    const query = {
      sql: `INSERT INTO dapil_wilayah(dapil_id, kode_wilayah, keterangan, jumlah_kursi) 
        VALUES(?, ?, ?, ?)`,
      values: [dapilId, kodeWilayah, keterangan, jumlahKursi],
    };
    await this._pool.query(query);
    console.log('berhasil menambahkan data dapil_wilayah +1');
  }
}

module.exports = DapilWilayahRepository;

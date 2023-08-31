class DapilRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addDapil(idPemilu, kodeProvinsi, namaDapil, jumlahKursi) {
    const query = {
      sql: `INSERT INTO dapil(pemilu_id, provinsi, nama, jumlah_kursi) 
        VALUES(?, ?, ?, ?)`,
      values: [idPemilu, kodeProvinsi, namaDapil, jumlahKursi],
    };
    await this._pool.query(query);
    console.log('berhasil menambahkan data dapil +1');
  }
}

module.exports = DapilRepository;

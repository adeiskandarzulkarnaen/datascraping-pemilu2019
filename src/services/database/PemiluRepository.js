class PemiluRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addPemilu(namaPemilu, IdJenisPemilu, tahun, keterangan=null) {
    const query = {
      sql: `INSERT INTO pemilu(pemilu, jenis_pemilu_id, tahun, keterangan) VALUES(?, ?, ?, ?)`,
      values: [namaPemilu, IdJenisPemilu, tahun, keterangan],
    };
    await this._pool.query(query);
    console.log('berhasil menambahkan data pemilu +1');
  }
}

module.exports = PemiluRepository;

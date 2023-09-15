class PemiluJenisRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addPemiluJenis(jenisPemilu, keterangan) {
    const query = {
      sql: `INSERT INTO pemilu_jenis(jenis, keterangan) VALUES(?, ?)`,
      values: [jenisPemilu, keterangan],
    };
    await this._pool.query(query);
    console.log('berhasil menambahkan jenis pemilu +1');
  }
}

module.exports = PemiluJenisRepository;

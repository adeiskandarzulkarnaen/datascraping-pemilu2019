const pool = require('../../config/pool');

class PemiluCapresRepository {
  constructor() {
    this._pool = pool;
  }

  async addPemiluCapres(idPemilu, noUrut, namaCapres, namaWakilCapres) {
    const query = {
      sql: `INSERT INTO pemilu_capres(pemilu_id, no_urut, calon_presiden, wakil_presiden) 
        VALUES(?, ?, ?, ?)`,
      values: [idPemilu, noUrut, namaCapres, namaWakilCapres],
    };
    await this._pool.query(query);
    console.log('berhasil menambahkan data cawapres +1');
  }
}

module.exports = PemiluCapresRepository;


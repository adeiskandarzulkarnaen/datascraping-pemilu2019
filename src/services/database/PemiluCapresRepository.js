class PemiluCapresRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addPemiluCapres({ id=null, idPemilu, noUrut, namaCapres, namaWakilCapres }) {
    const query = {
      sql: `INSERT INTO pemilu_capres(id, pemilu_id, no_urut, calon_presiden, wakil_presiden) 
        VALUES(?, ?, ?, ?, ?)`,
      values: [id, idPemilu, noUrut, namaCapres, namaWakilCapres],
    };
    await this._pool.query(query);
  }
}

module.exports = PemiluCapresRepository;


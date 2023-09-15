class ParpolRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addParpol(idParpol=null, namaParpol, singkatan) {
    const query = {
      sql: `INSERT INTO parpol(id, nama, singkatan) 
        VALUES(?, ?, ?)`,
      values: [idParpol, namaParpol, singkatan],
    };
    await this._pool.query(query);
    console.log('berhasil menambahkan data parpol +1');
  }
};

module.exports = ParpolRepository;

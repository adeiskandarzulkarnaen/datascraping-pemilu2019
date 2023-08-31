class HasilPemiluParpolRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addHasilPemiluCapres(idHasilPemiluTps, idPemiluParpol, jumlahSuaraSah) {
    const query = {
      sql: `INSERT INTO hasil_pemilu_parpol(hasil_pemilu_tps_id, pemilu_parpol_id, jml_suara_sah) 
        VALUES(?, ?, ?)`,
      values: [idHasilPemiluTps, idPemiluParpol, jumlahSuaraSah],
    };
    await this._pool.query(query);
    console.log('berhasil menambahkan data hasil_pemilu_parpol +1');
  }
};

module.exports = HasilPemiluParpolRepository;

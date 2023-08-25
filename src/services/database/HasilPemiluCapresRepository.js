const pool = require('../../config/pool');

class HasilPemiluCapresRepository {
  constructor() {
    this._pool = pool;
  }

  async addHasilPemiluCapres(idHasilPemiluTps, idPemiluCapres, jumlahSuaraSah) {
    const query = {
      sql: `INSERT INTO hasil_pemilu_capres(hasil_pemilu_tps_id, pemilu_capres_id, jml_suara_sah) 
        VALUES(?, ?, ?)`,
      values: [idHasilPemiluTps, idPemiluCapres, jumlahSuaraSah],
    };
    await this._pool.query(query);
    console.log('berhasil menambahkan data hasil_pemilu_capres +1');
  }
};

module.exports = HasilPemiluCapresRepository;

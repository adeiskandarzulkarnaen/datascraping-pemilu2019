const pool = require('../../config/pool');

class HasilPemiluTpsRepository {
  constructor() {
    this._pool = pool;
  }

  async addHasilPemiluTps({
    idPemilu,
    kodeWilayah,
    namaTps,
    pemilihTerdaftar,
    penggunaHakPilih,
    jmlSuaraSah,
    jmlSuaraTdkSah,
  }) {
    const query = {
      sql: `INSERT INTO hasil_pemilu_tps(
          pemilu_id, 
          kode_wilayah, 
          no_tps, 
          pemilih_terdaftar_dpt, 
          pengguna_hak_pilih, 
          jml_suara_sah, 
          jml_suara_tdk_sah) 
        VALUES(?, ?, ?, ?, ?, ?, ?)`,
      values: [idPemilu, kodeWilayah, namaTps, pemilihTerdaftar, penggunaHakPilih, jmlSuaraSah, jmlSuaraTdkSah],
    };
    await this._pool.query(query);
    console.log('berhasil menambahkan data hasil_pemilu_tps +1');
  }

  async getIdHasilPemiluTpsByKodeWilayahAndNamaTps({ kodeWilayah, namaTps }) {
    const query = {
      sql: `SELECT id FROM hasil_pemilu_tps WHERE kode_wilayah=? AND no_tps = ?`,
      values: [kodeWilayah, namaTps],
    };
    const [result] = await this._pool.query(query);
    return result[0];
  }
};

module.exports = HasilPemiluTpsRepository;

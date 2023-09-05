class HasilPemiluTpsRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addHasilPemiluTps({
    idPemilu,
    kodeWilayah=null,
    kodeWilayahKpu,
    kodeTps,
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
          kode_wilayah_kpu,
          kode_tps,
          no_tps, 
          pemilih_terdaftar_dpt, 
          pengguna_hak_pilih, 
          jml_suara_sah, 
          jml_suara_tdk_sah) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [idPemilu, kodeWilayah, kodeWilayahKpu, kodeTps, namaTps, pemilihTerdaftar, penggunaHakPilih, jmlSuaraSah, jmlSuaraTdkSah],
    };
    await this._pool.query(query);
  }

  async getHasilPemiluTpsByKodeWilayahKpuAndKodeTps({ kodeWilayahKpu, kodeTps }) {
    const query = {
      sql: `SELECT * FROM hasil_pemilu_tps 
        WHERE kode_wilayah_kpu = ? AND kode_tps = ?`,
      values: [kodeWilayahKpu, kodeTps],
    };

    const [rows] = await this._pool.query(query);
    return rows[0];
  }
};

module.exports = HasilPemiluTpsRepository;

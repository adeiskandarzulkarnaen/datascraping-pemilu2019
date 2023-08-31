class HasilPemiluTpsRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addHasilPemiluTps({
    id,
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
          id,
          pemilu_id, 
          kode_wilayah, 
          no_tps, 
          pemilih_terdaftar_dpt, 
          pengguna_hak_pilih, 
          jml_suara_sah, 
          jml_suara_tdk_sah) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [id, idPemilu, kodeWilayah, namaTps, pemilihTerdaftar, penggunaHakPilih, jmlSuaraSah, jmlSuaraTdkSah],
    };
    await this._pool.query(query);
  }
};

module.exports = HasilPemiluTpsRepository;

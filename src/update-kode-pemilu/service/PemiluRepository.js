class HasilPemiluTpsRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async updateKodeMendagriByKodeWilayahKPU({ kodeWilayahMendagri, kodeWilayahKpu }) {
    const query = {
      sql: `UPDATE hasil_pemilu_tps SET kode_wilayah = ? WHERE kode_wilayah_kpu = ?`,
      values: [kodeWilayahMendagri, kodeWilayahKpu],
    };

    await this._pool.query(query);
  }
}


module.exports = HasilPemiluTpsRepository;

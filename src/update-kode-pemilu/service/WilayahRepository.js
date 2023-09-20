class WilayahRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async getAllWilayahInProvince(kodeProvinsiKpu) {
    const query = {
      sql: `SELECT id, kode, kode_wilayah_kpu FROM wilayah WHERE kode LIKE ?`,
      values: [`${kodeProvinsiKpu}%`],
    };

    const [rows] = await this._pool.query(query);
    return rows;
  }
}

module.exports = WilayahRepository;

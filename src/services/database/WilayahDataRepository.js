class WilayahDataRepository {
  constructor(pool) {
    this._pool = pool;
  }

  /* old */
  async addWilayahData(kodeWilayah, namaWilayah, penduduk=null) {
    const query = {
      sql: `INSERT INTO wilayah_data(kode, nama, penduduk) VALUES(?, ?, ?)`,
      values: [kodeWilayah, namaWilayah, penduduk],
    };
    await this._pool.query(query);
  }

  async getWilayahDataByKodeWilayahMendagri(kode) {
    const query = {
      sql: `SELECT * FROM wilayah_data WHERE kode = ?`,
      values: [kode],
    };
    const [rows] = await this._pool.query(query);
    console.log(rows);
  }

  async editAllWilayahDataWhichContainKodeMendagri({ kode, kodeWilayahKpu }) {
    const query = {
      sql: 'UPDATE wilayah_data SET kode_wilayah_kpu = ? WHERE kode LIKE ?',
      values: [kodeWilayahKpu, `${kode}%`],
    };
    await this._pool.query(query);
  }

  async editWilyahDataByKodeMendagri({ kode, kodeWilayahKpu }) {
    const query = {
      sql: 'UPDATE wilayah_data SET kode_wilayah_kpu = ? WHERE kode = ?',
      values: [kodeWilayahKpu, kode],
    };
    await this._pool.query(query);
  }
}

module.exports = WilayahDataRepository;

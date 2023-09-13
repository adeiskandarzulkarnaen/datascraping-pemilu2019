class WilayahRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async editAllWilayahWhichContainKodeKpu(kodeKpu, { kodeMendagri, addPrefixNull=false }) {
    const kodeWilayah = addPrefixNull ? `${kodeMendagri}.null` : kodeMendagri;

    const query = {
      sql: 'UPDATE wilayah SET kode = ? WHERE kode_wilayah_kpu LIKE ?',
      values: [kodeWilayah, `${kodeKpu}%`],
    };
    await this._pool.query(query);
  }

  async editWilayahById(id, { kodeMendagri }) {
    const query = {
      sql: 'UPDATE wilayah SET kode = ? WHERE id = ?',
      values: [kodeMendagri, id],
    };
    await this._pool.query(query);
  }

  async getListWilayahByKodeMendagri(kodeMendagri, { tingkatWilayah, containPrefixNull=false }) {
    const kode = containPrefixNull ? `${kodeMendagri}.null` : kodeMendagri;

    const query = {
      sql: 'SELECT * FROM wilayah WHERE kode = ? AND tingkat_wilayah = ?',
      values: [kode, tingkatWilayah],
    };

    const [rows] = await this._pool.query(query);
    return rows;
  }

  async editWilayahNameById(id, nama) {
    const query = {
      sql: `UPDATE wilayah SET nama = ? WHERE id = ?`,
      values: [nama, id],
    };
    await this._pool.query(query);
  }

  async getNameById(id) {
    const query = {
      sql: 'SELECT nama FROM wilayah WHERE id = ?',
      values: [id],
    };
    const [rows] = await this._pool.query(query);
    return rows[0];
  }
};

module.exports = WilayahRepository;

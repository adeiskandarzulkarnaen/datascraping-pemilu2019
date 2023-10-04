
class FillTableService {
  constructor(pool) {
    this._pool = pool;
  }

  async execute(kodeMendagri) {
    const listWilayah = await this._getWilayahByKodeMendagri(kodeMendagri);

    for (const wilayah of listWilayah) {
      const nama = wilayah.nama;
      const kodeMendagri = wilayah.kode;
      const kodeKpu = wilayah.kode_wilayah_kpu;

      await this._updateTableHasilPemiluTps(kodeMendagri, kodeKpu);
      console.log(`update ${nama} selesai`);
    }
  }

  async _getWilayahByKodeMendagri(kodeMendagri) {
    const query = {
      sql: `SELECT kode, kode_wilayah_kpu, nama FROM wilayah WHERE kode LIKE ? AND tingkat_wilayah = 4`,
      values: [`${kodeMendagri}%`],
    };
    const [rows] = await this._pool.query(query);
    return rows;
  }

  async _updateTableHasilPemiluTps(kodeMendagri, kodeKpu) {
    const query = {
      sql: `UPDATE hasil_pemilu_tps 
        SET kode_wilayah = ? 
        WHERE kode_wilayah_kpu = ? 
        AND kode_wilayah IS NOT NULL;`,
      values: [kodeMendagri, kodeKpu],
    };
    await this._pool.query(query);
  }
}


module.exports = FillTableService;

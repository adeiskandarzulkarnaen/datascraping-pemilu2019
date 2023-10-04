const pool = require('./config/pool');

class CleanPileg2019Prov {
  constructor() {
    this._pool = pool;
  }

  async execute(kodeProvKpu) {
    const listHasilPemiluTps = await this._getIdHasilPemiluTpsbyKodeProvinsi(kodeProvKpu);
    for (const hasilPemiluTps of listHasilPemiluTps) {
      const hasilPemiluTpsId = hasilPemiluTps.id;
      await this._deleteHasilPemiluParpolByHasilPemiluTpsId(hasilPemiluTpsId);
      await this._deleteHasilPemiluTpsById(hasilPemiluTpsId);
      console.log(`delete id ${hasilPemiluTpsId} success!!!`);
    }
    console.log('HAPUS SEMUA DATA SUCCESS');
  }

  async _getIdHasilPemiluTpsbyKodeProvinsi(kodeProvKpu, pemiluId=2) {
    const query = {
      sql: `SELECT id FROM hasil_pemilu_tps 
        WHERE kode_wilayah_kpu LIKE ? AND pemilu_id = ?`,
      values: [`${kodeProvKpu}%`, pemiluId],
    };
    const [rows] = await this._pool.query(query);
    return rows;
  }

  async _deleteHasilPemiluParpolByHasilPemiluTpsId(hasilPemiluTpsId) {
    const query = {
      sql: `DELETE FROM hasil_pemilu_parpol WHERE hasil_pemilu_tps_id = ?`,
      values: [hasilPemiluTpsId],
    };
    await this._pool.query(query);
  }

  async _deleteHasilPemiluTpsById(idHasilPemiluTps) {
    const query = {
      sql: `DELETE FROM hasil_pemilu_tps WHERE id = ?`,
      values: [idHasilPemiluTps],
    };
    await this._pool.query(query);
  }
}


const cleanPileg2019Prov = new CleanPileg2019Prov();
cleanPileg2019Prov.execute('32676'); // jawa tengah

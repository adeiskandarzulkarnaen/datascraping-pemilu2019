const { existsSync, mkdirSync } = require('fs');
const { writeFile } = require('fs/promises');


const createLogFile = async (dir, fileName, logData) => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  await writeFile(`${dir}/${fileName}.json`, JSON.stringify(logData, null, 2));
};

class WilayahRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addWilayah({ kode=null, kodeWilayahKpu, namaWilayah, tingkatWilayah }) {
    const query = {
      sql: `INSERT INTO wilayah(kode, kode_wilayah_kpu, nama, tingkat_wilayah) VALUES(?, ?, ?, ?)`,
      values: [kode, kodeWilayahKpu, namaWilayah, tingkatWilayah],
    };
    await this._pool.query(query);
  }

  async editWilayahByKodeMendagri({ kodeWilayahMendagri, kodeWilayahKpu }) {
    const query = {
      sql: `UPDATE wilayah SET kode_wilayah_kpu = ? WHERE kode = ?`,
      values: [kodeWilayahKpu, kodeWilayahMendagri],
    };
    await this._pool.query(query);
  }

  async editWilayahById({ id, kodeWilayahKpu }) {
    const query = {
      sql: 'UPDATE wilayah SET kode_wilayah_kpu = ? WHERE id = ?',
      values: [kodeWilayahKpu, id],
    };
    await this._pool.query(query);
  }

  async editAllWilayahWhichContainKodeMendagri({ kode, kodeWilayahKpu }) {
    const query = {
      sql: `UPDATE wilayah SET kode_wilayah_kpu = ? WHERE kode LIKE ?`,
      values: [kodeWilayahKpu, `${kode}%`],
    };

    await this._pool.query(query);
  }

  async getWilayahIdByKodeWilayahMendagri({ kodeWilayahMendagri }) {
    const query = {
      sql: `SELECT id FROM wilayah WHERE kode = ?`,
      values: [kodeWilayahMendagri],
    };
    const [rows] = await this._pool.query(query);
    return rows;
  }

  async getWilayahByNameAndTingkatWilayah({ namaWilayah, tingkatWilayah }) {
    const query = {
      sql: `SELECT id, kode, nama 
        FROM wilayah 
        WHERE 
          UPPER(nama) = UPPER(?) AND 
          tingkat_wilayah = ?`,
      values: [namaWilayah, tingkatWilayah],
    };
    const [rows] = await this._pool.query(query);

    if (rows.length > 1) {
      await createLogFile('./log/duplikat', namaWilayah, rows);
    }
    // console.log(`Hasil query dari getWilayahByNameAndTingkat`);
    console.log(rows);
    return rows[0];
  }

  async getWilayahByNameAndTingkatAndContainKodeWilayahKpu({ namaWilayah, tingkatWilayah, kodeWilayahKpu }) {
    const query = {
      sql: `SELECT id, kode, nama 
        FROM wilayah 
        WHERE 
          UPPER(nama) = UPPER(?) AND 
          tingkat_wilayah = ? AND
          kode_wilayah_kpu LIKE ?`,
      values: [namaWilayah, tingkatWilayah, `${kodeWilayahKpu}%`],
    };
    const [rows] = await this._pool.query(query);

    if (rows.length > 1) {
      await createLogFile('./log/duplikat', namaWilayah, rows);
    }

    // console.log(`Hasil query dari getWilayahByNameAndTingkatAndContainkodeWilayahKpu`);
    console.log(rows);
    return rows[0];
  }
}

module.exports = WilayahRepository;

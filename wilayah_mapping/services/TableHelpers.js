const pool = require('../config/pool');

class TableHelpers {
  constructor(pool) {
    this._pool = pool;
  }

  async cleanNullWilayah() {
    await this._pool.query('UPDATE wilayah SET kode = NULL');
  }

  async removePrefixKab() {
    // get daftar kabupaten
    const [daftarKabupaten] = await this._pool.query(`
      SELECT id, UPPER(nama) as nama FROM wilayah_mendagri 
      WHERE UPPER(nama) LIKE 'KAB.%'`,
    );

    // modifkabupaten
    for (const kabupaten of daftarKabupaten) {
      const { id, nama } = kabupaten;

      const renamedKabupaten = nama.replace('KAB.', '').trim();

      await this._pool.query({
        sql: `UPDATE wilayah_mendagri SET nama = ? WHERE id = ?`,
        values: [renamedKabupaten, id],
      });
      console.log(`rename ${nama} to ${renamedKabupaten} success`);
    }
    console.log('RENAME BERHASIL');
  }
};

// module.exports = TableHelpers;

const tableHelpers = new TableHelpers(pool);

const main = async () => {
  await tableHelpers.cleanNullWilayah();
  console.log('Berhasil');
};

main();

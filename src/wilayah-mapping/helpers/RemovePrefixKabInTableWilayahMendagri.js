const pool = require('../config/pool');

const init = async () => {
  /* get daftar kabupaten */
  const [daftarKabupaten] = await pool.query({
    sql: `SELECT id, UPPER(nama) as nama FROM wilayah_mendagri WHERE UPPER(nama) LIKE 'KAB.%'`,
  });

  /* modifkabupaten */
  for (const kabupaten of daftarKabupaten) {
    const { id, nama } = kabupaten;

    const renamedKabupaten = nama.replace('KAB.', '').trim();

    await pool.query({
      sql: `UPDATE wilayah_mendagri SET nama = ? WHERE id = ?`,
      values: [renamedKabupaten, id],
    });
    console.log(`success: rename ${nama} to ${renamedKabupaten}`);
  }

  console.log('RENAME BERHASIL');
};


init();

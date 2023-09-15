const pool = require('../config/pool');

const init = async () => {
  await pool.query('UPDATE wilayah SET kode = NULL');
  console.log(`Success: semua column 'kode' di tabel 'wilayah' telah di set Null`);
};

init();

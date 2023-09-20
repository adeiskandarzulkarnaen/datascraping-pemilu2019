const pool = require('./config/pool');

const listQuery = [
  `UPDATE wilayah SET kode = '31.01.02' WHERE kode_wilayah_kpu = '25823.25824.25829'`,
  `UPDATE wilayah_mendagri SET nama = 'KEPULAUAN SERIBU SELATAN' WHERE kode = '31.01.02'`,
];


const init = async () =>{
  for (query of listQuery) {
    await pool.query(query);
    console.log('done');
  }
  console.log('Success: data updated');
};

init();

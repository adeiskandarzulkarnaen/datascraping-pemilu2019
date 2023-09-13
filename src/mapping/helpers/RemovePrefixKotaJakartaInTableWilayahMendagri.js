const pool = require('../config/pool');

const listQuery = [
  `UPDATE wilayah_mendagri SET nama = 'KEPULAUAN SERIBU' WHERE kode = '31.01'`,
  `UPDATE wilayah_mendagri SET nama = 'JAKARTA PUSAT' WHERE kode = '31.71'`,
  `UPDATE wilayah_mendagri SET nama = 'JAKARTA UTARA' WHERE kode = '31.72'`,
  `UPDATE wilayah_mendagri SET nama = 'JAKARTA BARAT' WHERE kode = '31.73'`,
  `UPDATE wilayah_mendagri SET nama = 'JAKARTA SELATAN' WHERE kode = '31.74'`,
  `UPDATE wilayah_mendagri SET nama = 'JAKARTA TIMUR' WHERE kode = '31.75'`,
];


const init = async () =>{
  for (query of listQuery) {
    await pool.query(query);
  }
  console.log('Success: data updated');
};

init();

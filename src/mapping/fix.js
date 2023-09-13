const pool = require('./config/pool');

const listQuery = [
  `UPDATE wilayah SET kode = '36.02.16.2018' WHERE kode_wilayah_kpu = '51578.51913.52277.52286'`,
];


const init = async () =>{
  for (query of listQuery) {
    await pool.query(query);
    console.log('done');
  }
  console.log('Success: data updated');
};

init();

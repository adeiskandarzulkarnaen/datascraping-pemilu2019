const pool = require('./config/pool');

const listQuery = [
  `UPDATE wilayah SET kode = '33.02.22', nama = 'BATURRADEN' WHERE kode_wilayah_kpu = '32676.32986.33286'`,
  `UPDATE wilayah SET kode = '33.04.02', nama = 'PURWOREJA KLAMPOK' WHERE kode_wilayah_kpu = '32676.33603.33620'`,
  `UPDATE wilayah SET kode = '33.04.04',  nama = 'PURWANEGARA' WHERE kode_wilayah_kpu = '32676.33603.33646'`,
  `UPDATE wilayah SET kode = '33.19.02', nama = 'KOTA KUDUS' WHERE kode_wilayah_kpu = '32676.38564.38581'`,
];


const init = async () =>{
  for (query of listQuery) {
    await pool.query(query);
    console.log('done');
  }
  console.log('Success: data updated');
};

init();

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'sqlyoguser',
  password: 'password',
  database: 'indovoters_dev',
  debug: false,
}).promise();


const getHasilPemiluTps = async () => {
  const query = {
    sql: `SELECT id, kode_tps FROM hasil_pemilu_tps`,
  };
  const [rows] = await pool.query(query);
  return rows;
};

const updateIdHasilPemiluCapres = async ({ newId, kodeTps }) => {
  const query = {
    sql: `UPDATE hasil_pemilu_capres SET id_hasil_pemilu_tps = ? WHERE hasil_pemilu_tps_id = ?`,
    values: [newId, kodeTps],
  };
  await pool.query(query);
};


const main = async () => {
  const listItem = await getHasilPemiluTps();

  for (const item of listItem) {
    const { id, kode_tps: kodeTps } = item;
    await updateIdHasilPemiluCapres({
      newId: id,
      kodeTps,
    });
    console.log(`Update ${kodeTps} berhasil! `);
  }
  console.log('SEMUA UPDATE BERHASIL!!!');
};

main();

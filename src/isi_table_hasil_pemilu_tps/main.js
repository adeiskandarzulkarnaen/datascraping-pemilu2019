const pool = require('./config/pool');
const FillTableService = require('./service/FillTableService');

const fillTableService = new FillTableService(pool);

const main = async () => {
  await fillTableService.execute('32');
  console.log('UPDATE SELESAI');
};

main();

const pool = require('./config/pool');
const WilayahRepository = require('./services/WilayahRepository');

const wilayahRepository = new WilayahRepository(pool);

const main = async ({ id, newName }) => {
  await wilayahRepository.editWilayahNameById(id, newName);
  const { nama } = await wilayahRepository.getNameById(id);
  console.log('success: update nama', nama);
};

main({
  id: 280194,
  newName: 'CIHOE',
});

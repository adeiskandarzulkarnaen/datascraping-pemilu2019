const pool = require('./pool');
const WilayahMendagriRepository = require('./WilayahMendagriRepository');


const wilayahMendagriRepository = new WilayahMendagriRepository(pool);


const main = async () => {
  const result = await wilayahMendagriRepository.getWilayahWhichContainName({
    nama: 'limbangan',
    kode: '32.05',
    tingkat: 3,
  });

  console.log(result);
};

main();

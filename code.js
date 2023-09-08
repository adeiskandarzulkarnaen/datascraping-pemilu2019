const fs = require('fs');
const pool = require('./tests/pool');

const CreateLogFile = require('./tests/CreateLogFile');
const WilayahRepository = require('./tests/WilayahRepository');
const WilayahMendagriRepository = require('./tests/WilayahMendagriRepository');

const ProcessWilayah = require('./tests/ProcessWilayah');

const createLogFile = new CreateLogFile(fs);
const wilayahRepository = new WilayahRepository(pool);
const wilayahMendagriRepository = new WilayahMendagriRepository(pool);

const processWilayah = new ProcessWilayah(createLogFile, wilayahRepository, wilayahMendagriRepository);

const main = async () => {
  await processWilayah.execute('281402', {
    kodeKpu: '26141.27714',
    kodeMendagri: '32.05',
    tingkatWilayah: 2,
  });
  console.log('BERES KABEH');
};


main();

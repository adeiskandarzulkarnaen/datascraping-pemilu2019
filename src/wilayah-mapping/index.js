const fs = require('fs');
const pool = require('./config/pool');

const CreateLogFile = require('./services/CreateLogFile');
const WilayahRepository = require('./services/WilayahRepository');
const WilayahMendagriRepository = require('./services/WilayahMendagriRepository');

const ProcessWilayah = require('./services/ProcessWilayah');

const createLogFile = new CreateLogFile(fs);
const wilayahRepository = new WilayahRepository(pool);
const wilayahMendagriRepository = new WilayahMendagriRepository(pool);

const processWilayah = new ProcessWilayah(createLogFile, wilayahRepository, wilayahMendagriRepository);

const main = async () => {
  await processWilayah.execute('286398', {
    kodeKpu: '32676',
    kodeMendagri: '33',
    tingkatWilayah: 1,
  });
  console.log('JAWA TENGAH BERES KABEH');
};

main();

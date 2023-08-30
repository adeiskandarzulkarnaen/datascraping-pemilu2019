
const HasilPemiluTpsRepository = require('../src/services/database/HasilPemiluTpsRepository');


const hasilPemiluTpsRepository = new HasilPemiluTpsRepository();

const init = async () => {
  await hasilPemiluTpsRepository.addHasilPemiluTps({
    idPemilu: 1, kodeWilayah: '12.12.12', namaTps: '123441',
  });

  const result = await hasilPemiluTpsRepository.getIdHasilPemiluTpsByKodeWilayahAndNamaTps({
    kodeWilayah: '12.12.12',
    namaTps: '123441',
  });

  console.log(result.id);
};


init();

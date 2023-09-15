const axios = require('axios');
const pool = require('./config/pool');

/* api service */
const FetchApiWilayah = require('./services/fetchapi/FetchApiWilayah');
const FetchApiPilpres = require('./services/fetchapi/FetchApiPilpres');
const HasilPemiluTpsRepository = require('./services/database/HasilPemiluTpsRepository');
const HasilPemiluCapresRepository = require('./services/database/HasilPemiluCapresRepository');

/* create instance */
const fetchApiWilayah = new FetchApiWilayah(axios);
const fetchApiPilpres = new FetchApiPilpres(axios);
const hasilPemiluTpsRepository = new HasilPemiluTpsRepository(pool);
const hasilPemiluCapresRepository = new HasilPemiluCapresRepository(pool);


const processTps = async ({
  provinsiId, provinsiName,
  kabupatenId, kabupatenName,
  kecamatanId, kecamatanName,
  kelurahanId, kelurahanName,
  tpsId, tpsName,
}) => {
  const hasilPemiluTps = await fetchApiPilpres.getHasilPilpres(
    'hhcw', `${provinsiId}/${kabupatenId}/${kecamatanId}/${kelurahanId}/${tpsId}`,
  );

  const kodeWilayahKpu = `${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`;

  // todo: menambahkan ke tabel hasil pemilu tps
  await hasilPemiluTpsRepository.addHasilPemiluTps({
    idPemilu: 1, /* pilpres 2019 */
    // kodeWilayah, /* kode wilayah mendagri */
    kodeWilayahKpu,
    kodeTps: tpsId,
    namaTps: tpsName,
    pemilihTerdaftar: hasilPemiluTps['pemilih_j'],
    penggunaHakPilih: hasilPemiluTps['pengguna_j'],
    jmlSuaraSah: hasilPemiluTps['suara_sah'],
    jmlSuaraTdkSah: hasilPemiluTps['suara_tidak_sah'],
  });

  // todo: revisi input suara
  const { id: pemiluTpsId } = await hasilPemiluTpsRepository.getIdHasilPemiluTps({
    pemiluId: 1, /* pilpres 2019 */
    kodeWilayahKpu,
    kodeTps: tpsId,
  });

  for (key in hasilPemiluTps.chart) {
    if (hasilPemiluTps.chart.hasOwnProperty(key)) {
      await hasilPemiluCapresRepository.addHasilPemiluCapres({
        idHasilPemiluTps: pemiluTpsId,
        idPemiluCapres: key,
        jumlahSuaraSah: hasilPemiluTps.chart[key],
      });
    }
  }

  /* loging */
  console.log(
    'Berhasil add-pilpres 2019:',
    'prov.', provinsiName,
    '- kab.', kabupatenName,
    '- kec.', kecamatanName,
    '- kel.', kelurahanName,
    '-', tpsName,
  );
};

const processKelurahan = async ({
  provinsiId, provinsiName,
  kabupatenId, kabupatenName,
  kecamatanId, kecamatanName,
  kelurahanId, kelurahanName,
}) => {
  const daftarTps = await fetchApiWilayah.getWilayahData(`${provinsiId}/${kabupatenId}/${kecamatanId}/${kelurahanId}`);
  for (tpsId in daftarTps) {
    if (daftarTps.hasOwnProperty(tpsId)) {
      const tpsName = daftarTps[tpsId].nama;
      await processTps({
        provinsiId, provinsiName,
        kabupatenId, kabupatenName,
        kecamatanId, kecamatanName,
        kelurahanId, kelurahanName,
        tpsId, tpsName,
      });
    }
  }
};

const processKecamatan = async ({
  provinsiId, provinsiName,
  kabupatenId, kabupatenName,
  kecamatanId, kecamatanName,
}) => {
  const daftarKelurahan = await fetchApiWilayah.getWilayahData(`${provinsiId}/${kabupatenId}/${kecamatanId}`);
  for (kelurahanId in daftarKelurahan) {
    if (daftarKelurahan.hasOwnProperty(kelurahanId)) {
      const kelurahanName = daftarKelurahan[kelurahanId].nama;
      await processKelurahan({
        provinsiId, provinsiName,
        kabupatenId, kabupatenName,
        kecamatanId, kecamatanName,
        kelurahanId, kelurahanName,
      });
    }
  }
};

const processKabupaten = async ({ provinsiId, provinsiName, kabupatenId, kabupatenName }) => {
  const daftarKecamatan = await fetchApiWilayah.getWilayahData(`${provinsiId}/${kabupatenId}`);

  for (kecamatanId in daftarKecamatan) {
    if (daftarKecamatan.hasOwnProperty(kecamatanId)) {
      const kecamatanName = daftarKecamatan[kecamatanId].nama;
      await processKecamatan({
        provinsiId, provinsiName,
        kabupatenId, kabupatenName,
        kecamatanId, kecamatanName,
      });
    }
  }
};

const processProvinsi = async ({ provinsiId, provinsiName }) => {
  const daftarKabupaten = await fetchApiWilayah.getWilayahData(`${provinsiId}`);
  for (kabupatenId in daftarKabupaten) {
    if (daftarKabupaten.hasOwnProperty(kabupatenId)) {
      const kabupatenName = daftarKabupaten[kabupatenId].nama;
      await processKabupaten({
        provinsiId, provinsiName,
        kabupatenId, kabupatenName,
      });
    }
  }
};

const main = async () => {
  const daftarProvinsi = await fetchApiWilayah.getWilayahData();
  for (provinsiId in daftarProvinsi) {
    if (daftarProvinsi.hasOwnProperty(provinsiId)) {
      const provinsiName = daftarProvinsi[provinsiId].nama;
      await processProvinsi({ provinsiId, provinsiName });
    }
  }

  console.log('SEMUA DATA PILPRES 2019 BERHASIL DITAMBAHKAN!!');
};


main();

// processKelurahan({
//   provinsiId: '26141', provinsiName: 'JawaBarat',
//   kabupatenId: '27714', kabupatenName: 'Garut',
//   kecamatanId: '27715', kecamatanName: 'Garut Kota',
//   kelurahanId: '27718', kelurahanName: 'Margawati',
// });

// const kabupatenId = '26141'; // Jawabarat
// const kabupatenId = '27714'; // Garut
// const kecamatanId = '27715'; // Garut Kota
// const kelurahanId = '27718'; // Margawati
// const kodeTps = '900228437'; // Tps 01

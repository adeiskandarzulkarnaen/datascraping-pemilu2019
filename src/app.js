/* eslint-disable indent */

/* api service */
const FetchApiWilayah = require('./services/api/FetchApiWilayah');
// const FetchApiPartai = require('./services/api/FetchApiPartai');
// const FetchApiPilpres = require('./services/api/FetchApiPilpres');

/* database service */
const WilayahRepository = require('./services/database/WilayahRepository');
const WilayahDataRepository = require('./services/database/WilayahDataRepository');


/* create instance */
const fetchApiWilayah = new FetchApiWilayah();
const wilayahRepository = new WilayahRepository();
const wilayahDataRepository = new WilayahDataRepository();

const addWilayahToDatabase = async () => {
  try {
    /* Looping data Provinsi */
    const daftarProvinsi = await fetchApiWilayah.getDataWilayah();
    Object.keys(daftarProvinsi).forEach(async (kodeProvinsi) => {
      /* add data provinsi to table "wilayah" and table "wilayah_data" */
      await wilayahRepository.addWilayah(kodeProvinsi, daftarProvinsi[kodeProvinsi].nama, 1); // param 1 untuk tingkat prov.
      await wilayahDataRepository.addWilayahData(kodeProvinsi, `Prov. ${daftarProvinsi[kodeProvinsi].nama}`);

      /* Looping data  Kabupaten */
      const daftarKabupaten = await fetchApiWilayah.getDataWilayah(kodeProvinsi);
      Object.keys(daftarKabupaten).forEach(async (kodeKabupaten) => {
        /* add data kabupaten to table "wilayah" and table "wilayah_data" */
        await wilayahRepository.addWilayah(`${kodeProvinsi}.${kodeKabupaten}`, daftarKabupaten[kodeKabupaten].nama, 2); // param 2 untuk tingkat kab.
        await wilayahDataRepository.addWilayahData(`${kodeProvinsi}.${kodeKabupaten}`, `Kab. ${daftarKabupaten[kodeKabupaten].nama}`);

        /* Looping data  Kecamatan */
        const daftarKecamatan = await fetchApiWilayah.getDataWilayah(`${kodeProvinsi}/${kodeKabupaten}`);
        Object.keys(daftarKecamatan).forEach(async (kodeKecamatan) => {
          /* add data kecamatan to table "wilayah" and table "wilayah_data" */
          await wilayahRepository.addWilayah(`${kodeProvinsi}.${kodeKabupaten}.${kodeKecamatan}`, daftarKecamatan[kodeKecamatan].nama, 3); // param 3 untuk tingkat kec.
          await wilayahDataRepository.addWilayahData(`${kodeProvinsi}.${kodeKabupaten}.${kodeKecamatan}`, `Kec. ${daftarKecamatan[kodeKecamatan].nama}`);

          /* Looping data Kelurahan */
          const daftarKelurahan = await fetchApiWilayah.getDataWilayah(`${kodeProvinsi}/${kodeKabupaten}/${kodeKecamatan}`);
          Object.keys(daftarKelurahan).forEach(async (kodeKelurahan) => {
            /* add data kelurahan to table "wilayah" and table "wilayah_data" */
            await wilayahRepository.addWilayah(`${kodeProvinsi}.${kodeKabupaten}.${kodeKecamatan}.${kodeKelurahan}`, daftarKelurahan[kodeKelurahan].nama, 4); // param 4 untuk tingkat Kel.
            await wilayahDataRepository.addWilayahData(`${kodeProvinsi}.${kodeKabupaten}.${kodeKecamatan}.${kodeKelurahan}`, `Kel. ${daftarKelurahan[kodeKelurahan].nama}`);

            /* Log Result */
            console.log(`Success[ Prov. ${daftarKelurahan[kodeKelurahan].nama} - Kab. ${daftarKabupaten[kodeKabupaten].nama} - Kec. ${daftarKecamatan[kodeKecamatan].nama} - Kel. ${daftarKelurahan[kodeKelurahan].nama}`);
          });
        });
      });
    });

    /* notif successfull */
    console.log('SEMUA DATA WILAYAH BERHASIL DITAMBAHKAN!!!');
  } catch (error) {
    console.log('tejadi kesalahan pada fungsi: addWilayahToDatabase');
    console.log(error.message);
  }
};


const addDataHasilPemiluToDatabase = async () => {
  try {
    /* Looping data Provinsi */
    const daftarProvinsi = await fetchApiWilayah.getDataWilayah();
    Object.keys(daftarProvinsi).forEach(async (kodeProvinsi) => {
      /* Looping data  Kabupaten */
      const daftarKabupaten = await fetchApiWilayah.getDataWilayah(kodeProvinsi);
      Object.keys(daftarKabupaten).forEach(async (kodeKabupaten) => {
        /* Looping data  Kecamatan */
        const daftarKecamatan = await fetchApiWilayah.getDataWilayah(`${kodeProvinsi}/${kodeKabupaten}`);
        Object.keys(daftarKecamatan).forEach(async (kodeKecamatan) => {
          /* Looping data Kelurahan */
          const daftarKelurahan = await fetchApiWilayah.getDataWilayah(`${kodeProvinsi}/${kodeKabupaten}/${kodeKecamatan}`);
          Object.keys(daftarKelurahan).forEach(async (kodeKelurahan) => {
            /* Log Result */
            console.log(`Success[ Prov. ${daftarKelurahan[kodeKelurahan].nama} - Kab. ${daftarKabupaten[kodeKabupaten].nama} - Kec. ${daftarKecamatan[kodeKecamatan].nama} - Kel. ${daftarKelurahan[kodeKelurahan].nama}`);
          });
        });
      });
    });

    /* notif successfull */
    console.log('SEMUA DATA WILAYAH BERHASIL DITAMBAHKAN!!!');
  } catch (error) {
    console.log('tejadi kesalahan pada fungsi: addWilayahToDatabase');
    console.log(error.message);
  }
};


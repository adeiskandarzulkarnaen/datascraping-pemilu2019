/* eslint-disable camelcase */
/* api service */
const FetchApiWilayah = require('../services/api/FetchApiWilayah');
const FetchApiPilpres = require('../services/api/FetchApiPilpres');

/* database service */
const WilayahRepository = require('../services/database/WilayahRepository');
const WilayahDataRepository = require('../services/database/WilayahDataRepository');
const HasilPemiluTpsRepository = require('../services/database/HasilPemiluTpsRepository');
const HasilPemiluCapresRepository = require('../services/database/HasilPemiluCapresRepository');

/* create instance */
const fetchApiWilayah = new FetchApiWilayah();
const fetchApiPilpres = new FetchApiPilpres();
const wilayahRepository = new WilayahRepository();
const wilayahDataRepository = new WilayahDataRepository();
const hasilPemiluTpsRepository = new HasilPemiluTpsRepository();
const hasilPemiluCapresRepository = new HasilPemiluCapresRepository();


const init = async () => {
  /* looping provinsi di indonesia */
  const daftarProvinsi = await fetchApiWilayah.getDataWilayah();
  for (provinsiId in daftarProvinsi) {
    if (daftarProvinsi.hasOwnProperty(provinsiId)) {
    // add data to table "wilayah" and table "wilayah_data"
      await wilayahRepository.addWilayah(provinsiId, daftarProvinsi[provinsiId].nama, 1); // param 1 untuk tingkat prov.
      await wilayahDataRepository.addWilayahData(provinsiId, `Prov. ${daftarProvinsi[provinsiId].nama}`);

      /* loop kabupaten di provinsi-i */
      const daftarKabupaten = await fetchApiWilayah.getDataWilayah(`${provinsiId}`);
      for (kabupatenId in daftarKabupaten) {
        if (daftarKabupaten.hasOwnProperty(kabupatenId)) {
        // menambahkan data kabupaten ke database;
          await wilayahRepository.addWilayah(`${provinsiId}.${kabupatenId}`, daftarKabupaten[kabupatenId].nama, 2); // param 2 untuk tingkat kab.
          await wilayahDataRepository.addWilayahData(`${provinsiId}.${kabupatenId}`, `Kab. ${daftarKabupaten[kabupatenId].nama}`);

          /* looping kecamatan di kabupaten-i*/
          const daftarKecamatan = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}`);
          for (kecamatanId in daftarKecamatan) {
            if (daftarKecamatan.hasOwnProperty(kecamatanId)) {
            // menambahkan data kecamatan ke database;
              await wilayahRepository.addWilayah(`${provinsiId}.${kabupatenId}.${kecamatanId}`, daftarKecamatan[kecamatanId].nama, 3); // param 3 untuk tingkat kec.
              await wilayahDataRepository.addWilayahData(`${provinsiId}.${kabupatenId}.${kecamatanId}`, `Kec. ${daftarKecamatan[kecamatanId].nama}`);

              /* looping kelurahan di kecamatan-i */
              const daftarKelurahan = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}/${kecamatanId}`);
              for (kelurahanId in daftarKelurahan) {
                if (daftarKelurahan.hasOwnProperty(kelurahanId)) {
                // menambahkan data kelurahan ke database;
                  await wilayahRepository.addWilayah(`${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`, daftarKelurahan[kelurahanId].nama, 4); // param 4 untuk tingkat Kel.
                  await wilayahDataRepository.addWilayahData(`${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`, `Desa/Kel. ${daftarKelurahan[kelurahanId].nama}`);

                  /* Log Result */
                  console.log(`Success[ Prov. ${daftarProvinsi[provinsiId].nama} - Kab. ${daftarKabupaten[kabupatenId].nama} - Kec. ${daftarKecamatan[kecamatanId].nama} - Kel. ${daftarKelurahan[kelurahanId].nama} ]`);
                }
              }
            }
          }
        }
      }
    }
  }
  console.log('semua data wilayah berhasil di tambahkan');
};


init();

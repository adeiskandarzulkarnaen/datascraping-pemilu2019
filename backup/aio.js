/* eslint-disable camelcase */
/* api service */
const FetchApiWilayah = require('../src/services/api/FetchApiWilayah');
const FetchApiPilpres = require('../src/services/api/FetchApiPilpres');

/* database service */
const WilayahRepository = require('../src/services/database/WilayahRepository');
const WilayahDataRepository = require('../src/services/database/WilayahDataRepository');
const HasilPemiluTpsRepository = require('../src/services/database/HasilPemiluTpsRepository');
const HasilPemiluCapresRepository = require('../src/services/database/HasilPemiluCapresRepository');

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

                  /* looping tps di kelurahan-i */
                  const daftarTps = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}/${kecamatanId}/${kelurahanId}`);
                  for (tpsId in daftarTps) {
                    if (daftarTps.hasOwnProperty(tpsId)) {
                      // console.log(daftarTps[tpsId]);

                      const hasilPemiluTps = await fetchApiPilpres.getHasilPilpres('hhcw', `${provinsiId}/${kabupatenId}/${kecamatanId}/${kelurahanId}/${tpsId}`);

                      console.log(hasilPemiluTps);
                      await hasilPemiluTpsRepository.addHasilPemiluTps({
                        idPemilu: 1,
                        kodeWilayah: `${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`,
                        namaTps: daftarTps[tpsId].nama,
                        pemilihTerdaftar: hasilPemiluTps['pemilih_j'],
                        penggunaHakPilih: hasilPemiluTps['pengguna_j'],
                        jmlSuaraSah: hasilPemiluTps['suara_sah'],
                        jmlSuaraTdkSah: hasilPemiluTps['suara_tidak_sah'],
                      });

                      const idHasilPemiluTps = await hasilPemiluTpsRepository.getIdHasilPemiluTpsByKodeWilayahAndNamaTps({
                        kodeWilayah: `${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`,
                        namaTps: daftarTps[tpsId].nama,
                      });

                      for (key in hasilPemiluTps.chart) {
                        if (hasilPemiluTps.chart.hasOwnProperty(key)) {
                          await hasilPemiluCapresRepository.addHasilPemiluCapres({
                            idHasilPemiluTps: idHasilPemiluTps.id,
                            idPemiluCapres: key,
                            jumlahSuaraSah: hasilPemiluTps.chart[key],
                          });
                        }
                      }

                      /* loging */
                      console.log(
                        'Berhasil menambahkan data: ',
                        'prov.', daftarProvinsi[provinsiId].nama,
                        'kab. ', daftarKabupaten[kabupatenId].nama,
                        'kec. ', daftarKecamatan[kecamatanId].nama,
                        'kel.', daftarKelurahan[kelurahanId].nama,
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};


init();

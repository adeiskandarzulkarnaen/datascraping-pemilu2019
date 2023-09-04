const axios = require('axios');
const pool = require('../src/config/pool');

/* api service */
const FetchApiWilayah = require('../src/services/api/FetchApiWilayah');
const FetchApiPilpres = require('../src/services/api/FetchApiPilpres');

/* database service */
const HasilPemiluTpsRepository = require('../src/services/database/HasilPemiluTpsRepository');
const HasilPemiluCapresRepository = require('../src/services/database/HasilPemiluCapresRepository');

/* create instance */
const fetchApiWilayah = new FetchApiWilayah(axios);
const fetchApiPilpres = new FetchApiPilpres(axios);

const hasilPemiluTpsRepository = new HasilPemiluTpsRepository(pool);
const hasilPemiluCapresRepository = new HasilPemiluCapresRepository(pool);


const init = async () => {
  const daftarProvinsi = await fetchApiWilayah.getDataWilayah();
  for (provinsiId in daftarProvinsi) {
    if (daftarProvinsi.hasOwnProperty(provinsiId)) {
      /* loop kabupaten di provinsi-i */
      const daftarKabupaten = await fetchApiWilayah.getDataWilayah(`${provinsiId}`);
      for (kabupatenId in daftarKabupaten) {
        if (daftarKabupaten.hasOwnProperty(kabupatenId)) {
          /* looping kecamatan di kabupaten-i*/
          const daftarKecamatan = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}`);

          for (kecamatanId in daftarKecamatan) {
            if (daftarKecamatan.hasOwnProperty(kecamatanId)) {
              /* looping kelurahan di kecamatan-i */
              const daftarKelurahan = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}/${kecamatanId}`);

              for (kelurahanId in daftarKelurahan) {
                if (daftarKelurahan.hasOwnProperty(kelurahanId)) {
                  /* looping tps di kelurahan-i */
                  const daftarTps = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}/${kecamatanId}/${kelurahanId}`);

                  for (tpsId in daftarTps) {
                    if (daftarTps.hasOwnProperty(tpsId)) {
                      const hasilPemiluTps = await fetchApiPilpres.getHasilPilpres('hhcw', `${provinsiId}/${kabupatenId}/${kecamatanId}/${kelurahanId}/${tpsId}`);

                      /* log detail */
                      // console.log(hasilPemiluTps);

                      await hasilPemiluTpsRepository.addHasilPemiluTps({
                        id: tpsId,
                        idPemilu: 1,
                        kodeWilayah: `${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`,
                        namaTps: daftarTps[tpsId].nama,
                        pemilihTerdaftar: hasilPemiluTps['pemilih_j'],
                        penggunaHakPilih: hasilPemiluTps['pengguna_j'],
                        jmlSuaraSah: hasilPemiluTps['suara_sah'],
                        jmlSuaraTdkSah: hasilPemiluTps['suara_tidak_sah'],
                      });

                      for (key in hasilPemiluTps.chart) {
                        if (hasilPemiluTps.chart.hasOwnProperty(key)) {
                          await hasilPemiluCapresRepository.addHasilPemiluCapres({
                            idHasilPemiluTps: tpsId,
                            idPemiluCapres: key,
                            jumlahSuaraSah: hasilPemiluTps.chart[key],
                          });
                        }
                      }

                      /* loging */
                      console.log(
                        'Berhasil menambahkan data:',
                        'prov.', daftarProvinsi[provinsiId].nama,
                        'kab.', daftarKabupaten[kabupatenId].nama,
                        '- kec.', daftarKecamatan[kecamatanId].nama,
                        '- kel.', daftarKelurahan[kelurahanId].nama,
                        '-', daftarTps[tpsId].nama,
                      );
                    }
                  }
                }
              }
            }
          }

          console.log(`DATA KAB. ${daftarKabupaten[kabupatenId].nama} BERHASIL DITAMBAHKAN`);
        }
      }
    }
  }
};


init();

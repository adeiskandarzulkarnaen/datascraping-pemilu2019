const axios = require('axios');
const { existsSync, mkdirSync } = require('fs');
const { writeFile } = require('fs/promises');

const pool = require('../config/pool');

/* service */
const FetchApiWilayah = require('../services/api/FetchApiWilayah');
const WilayahRepository = require('../services/database/WilayahRepository');
const WilayahDataRepository = require('../services/database/WilayahDataRepository');

/* create instance */
const fetchApiWilayah = new FetchApiWilayah(axios);
const wilayahRepository = new WilayahRepository(pool);
const wilayahDataRepository = new WilayahDataRepository(pool);


const createLogFile = async (dir, fileName, logData) => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  await writeFile(`${dir}/${fileName}.json`, JSON.stringify(logData, null, 2));
};

const updateWilayah = async ({ idWilayah, kode, kodeWilayahKpu, addNullToKodeWilayahKpu=true }) => {
  const nullSuffix = addNullToKodeWilayahKpu ? '.null' : '';

  /* UPDATE TABEL wilayah */
  await wilayahRepository.editAllWilayahWhichContainKodeMendagri({
    kode,
    kodeWilayahKpu: `${kodeWilayahKpu}${nullSuffix}`,
  });
  await wilayahRepository.editWilayahById({
    id: idWilayah,
    kodeWilayahKpu: kodeWilayahKpu,
  });

  /* UPDATE TABEL wilayah_data */
  await wilayahDataRepository.editAllWilayahDataWhichContainKodeMendagri({
    kode,
    kodeWilayahKpu: `${kodeWilayahKpu}${nullSuffix}`,
  });
  await wilayahDataRepository.editWilyahDataByKodeMendagri({
    kode,
    kodeWilayahKpu: kodeWilayahKpu,
  });
};

const processKelurahan = async ({ provinsiId, kabupatenId, kecamatanId }) => {
  const daftarKelurahan = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}/${kecamatanId}`);

  for (kelurahanId in daftarKelurahan) {
    if (daftarKelurahan.hasOwnProperty(kelurahanId)) {
      const namaKelurahan = daftarKelurahan[kelurahanId].nama;

      const result = await wilayahRepository.getWilayahByNameAndTingkatAndContainKodeWilayahKpu({
        namaWilayah: namaKelurahan,
        tingkatWilayah: 4, // 4 => kelurahan
        kodeWilayahKpu: `${provinsiId}.${kabupatenId}.${kecamatanId}.null`,
      });

      if (result) {
        const { id, kode } = result;
        await updateWilayah({
          idWilayah: id,
          kode,
          kodeWilayahKpu: `${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`,
          addNullToKodeWilayahKpu: false,
        });

        console.log('SUCCESS: Update data wilayah kab. '+ namaKelurahan); // loging
        console.log(`${namaKelurahan}: ${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`);
        // todo: processTPS();
        continue;
      }

      // await wilayahRepository.addWilayah({
      //   kode: null,
      //   tingkatWilayah: 4, // 4 => kelurahan
      //   namaWilayah: namaKelurahan,
      //   kodeWilayahKpu: `${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`,
      // });

      await createLogFile(`./log/wilayah/${provinsiId}/${kabupatenId}/${kecamatanId}`, kelurahanId, {
        kode: null,
        kode_wilayah_kpu: `${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`,
        nama: namaKelurahan,
        tingkat_wilayah: 4,
      });

      console.log(`Failed update wilayah: ${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`);
      // todo: processTPS();
    }
  }
  // console.log('semua data wilayah Kelurahan berhasil di tambahkan');
};

const processKecamatan = async ({ provinsiId, kabupatenId }) => {
  const daftarKecamatan = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}`);

  for (kecamatanId in daftarKecamatan) {
    if (daftarKecamatan.hasOwnProperty(kecamatanId)) {
      const namaKecamatan = daftarKecamatan[kecamatanId].nama;

      const result = await wilayahRepository.getWilayahByNameAndTingkatAndContainKodeWilayahKpu({
        namaWilayah: namaKecamatan,
        tingkatWilayah: 3, // 3 => kecamatan
        kodeWilayahKpu: `${provinsiId}.${kabupatenId}.null`,
      });

      if (result) {
        const { id, kode } = result;
        await updateWilayah({
          idWilayah: id,
          kode,
          kodeWilayahKpu: `${provinsiId}.${kabupatenId}.${kecamatanId}`,
          addNullToKodeWilayahKpu: true,
        });

        console.log('SUCCESS: Update data wilayah kec. '+ namaKecamatan); // loging


        // todo: processKelurahan();
        await processKelurahan({ provinsiId, kabupatenId, kecamatanId });
        continue;
      }

      // await wilayahRepository.addWilayah({
      //   kode: null,
      //   tingkatWilayah: 3, // 3 => kecamatan
      //   namaWilayah: namaKecamatan,
      //   kodeWilayahKpu: `${provinsiId}.${kabupatenId}.${kecamatanId}`,
      // });

      await createLogFile(`./log/wilayah/${provinsiId}/${kabupatenId}`, kecamatanId, {
        kode: null,
        kode_wilayah_kpu: `${provinsiId}.${kabupatenId}.${kecamatanId}`,
        nama: namaKecamatan,
        tingkat_wilayah: 3,
      });

      console.log(`Failed update wilayah: ${namaKecamatan}`);
      // todo: processKelurhan();
    }
  }
  // console.log('semua data wilayah Kecamatan berhasil di tambahkan');
};

const processKabupaten = async ({ provinsiId }) => {
  const daftarKabupaten = await fetchApiWilayah.getDataWilayah(provinsiId);

  for (kabupatenId in daftarKabupaten) {
    if (daftarKabupaten.hasOwnProperty(kabupatenId)) {
      const namaKabupaten = daftarKabupaten[kabupatenId].nama;
      // todo: manipulasi nama
      const kabupatenAtauKota = namaKabupaten.toLocaleUpperCase().includes('KOTA') ? namaKabupaten : 'KAB. '+namaKabupaten;

      const result = await wilayahRepository.getWilayahByNameAndTingkatAndContainKodeWilayahKpu({
        namaWilayah: kabupatenAtauKota,
        tingkatWilayah: 2, // 2 => kabupaten
        kodeWilayahKpu: provinsiId + '.null',
      });

      if (result) {
        const { id, kode } = result;
        await updateWilayah({
          idWilayah: id,
          kode,
          kodeWilayahKpu: `${provinsiId}.${kabupatenId}`,
          addNullToKodeWilayahKpu: true,
        });

        console.log('SUCCESS: Update data wilayah kab. '+ namaKabupaten); // loging

        // todo: processKecamatan();
        await processKecamatan({ provinsiId, kabupatenId });
        continue;
      }

      // await wilayahRepository.addWilayah({
      //   kode: null,
      //   tingkatWilayah: 2,
      //   namaWilayah: kabupatenAtauKota,
      //   kodeWilayahKpu: `${provinsiId}.${kabupatenId}`,
      // });

      await createLogFile(`./log/wilayah/${provinsiId}`, kabupatenId, {
        kode: null,
        kode_wilayah_kpu: `${provinsiId}.${kabupatenId}`,
        nama: kabupatenAtauKota,
        tingkat_wilayah: 2,
      });

      console.log('Failed update wilayah: '+ kabupatenAtauKota);
      // todo: processKecamatan();
    }
  }

  // console.log('semua data wilayah Kabupaten berhasil di tambahkan');
};

const main = async () => {
  const daftarProvinsi = await fetchApiWilayah.getDataWilayah();

  for (provinsiId in daftarProvinsi) {
    if (daftarProvinsi.hasOwnProperty(provinsiId)) {
      const namaProvinsi = daftarProvinsi[provinsiId].nama;
      const result = await wilayahRepository.getWilayahByNameAndTingkatWilayah({
        namaWilayah: namaProvinsi,
        tingkatWilayah: 1, // 1 => provinsi
      });

      if (result) {
        const { id, kode } = result;

        await updateWilayah({
          idWilayah: id,
          kode,
          kodeWilayahKpu: provinsiId,
          addNullToKodeWilayahKpu: true,
        });
        console.log('SUCCESS: Update data wilayah prov. '+ namaProvinsi);

        // todo: processKabupaten();
        await processKabupaten({
          provinsiId,
        });

        continue;
      }

      /* ADD TO TABEL wilayah */
      // await wilayahRepository.addWilayah({
      //   kode: null,
      //   tingkatWilayah: 1,
      //   namaWilayah: namaProvinsi,
      //   kodeWilayahKpu: provinsiId,
      // });

      await createLogFile('./log/wilayah', provinsiId, {
        kode: null,
        kode_wilayah_kpu: provinsiId,
        nama: namaProvinsi,
        tingkat_wilayah: 1,
      });

      console.log('Failed update wilayah: '+ namaProvinsi);
      // todo: processKabupaten();
    }
  }
  console.log('DATA WILAYAH PROVINSI BERHASIL DI TAMBAHKAN');
};


main();

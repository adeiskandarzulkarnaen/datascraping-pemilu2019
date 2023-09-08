const fs = require('fs');
const pool = require('./pool');

const CreateLogFile = require('./CreateLogFile');
const WilayahRepository = require('./WilayahRepository');
const WilayahMendagriRepository = require('./WilayahMendagriRepository');

const createLogFile = new CreateLogFile(fs);
const wilayahRepository = new WilayahRepository(pool);
const wilayahMendagriRepository = new WilayahMendagriRepository(pool);


const processWilayah = async (idWilayah, { kodeKpu, kodeMendagri, tingkatWilayah }) => {
  /* UPDATE COLUMN KODE PADA TABEL WILAYAH */
  await wilayahRepository.editAllWilayahWhichContainKodeKpu(kodeKpu, {
    kodeMendagri, addPrefixNull: true,
  });

  await wilayahRepository.editWilayahById(idWilayah, { kodeMendagri });

  /* AMBIL LIST-DATA 1 TINGKAT DI BAWAHNYA */
  const listWilayah = await wilayahRepository.getListWilayahByKodeMendagri(kodeMendagri, {
    tingkatWilayah: tingkatWilayah + 1,
    containPrefixNull: true,
  });

  /* PROCESS LIST WILAYAH */
  const logError = [];
  for (const wilayah of listWilayah) {
    const {
      id,
      kode_wilayah_kpu: kodeWilayahKpu,
      nama: namaWilayah,
      tingkat_wilayah: tingkatWilayah,
    } = wilayah;

    /* CEK KETERSEDIAN DARI TABEL WILAYAH_MENDAGRI */
    const result = await wilayahMendagriRepository.getWilayahWhichContainName({
      nama: namaWilayah,
      tingkat: tingkatWilayah,
      kode: kodeMendagri,
    });

    /* JIKA TERSEDIA UPDATE TABEL WILAYAH, DENGAN MAMASUAKN DATA DARI TABEL WILAYAH_MENDAGRI  */
    if (result.length == 1) {
      const { kode } = result[0];

      if (tingkatWilayah <= 4) {
        await processWilayah(id, {
          kodeKpu: kodeWilayahKpu,
          kodeMendagri: kode,
          tingkatWilayah: tingkatWilayah,
        });
        console.log('success:', namaWilayah, '-tingkat', tingkatWilayah);
        continue;
      }

      /* LOOPING KEDUA */
      await wilayahRepository.editAllWilayahWhichContainKodeKpu(kodeWilayahKpu, {
        kodeMendagri: kode, addPrefixNull: false,
      });
      await wilayahRepository.editWilayahById(id, { kodeMendagri: kode });
      console.log('success:', namaWilayah, '-tingkat', tingkatWilayah);
      continue;
    }

    console.log('failed :', kodeWilayahKpu, namaWilayah);
    logError.push({
      type: (result.length >= 2) ? 'data dupilikat' : 'data tidak ditemukan',
      data: {
        tabel_wilayah: wilayah,
        tabel_wilayah_mendagri: result,
      },
    });
  }

  /* LOG HASIL PROCESS LIST WILAYAH */
  if (logError.length) await createLogFile.execute('./log', idWilayah, logError);
};


const main = async () => {
  await processWilayah('281402', {
    kodeKpu: '26141.27714',
    kodeMendagri: '32.05',
    tingkatWilayah: 2,
  });
  console.log('sync wilayah selesai');
};

main();

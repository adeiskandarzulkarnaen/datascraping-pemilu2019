const fs = require('fs');
const pool = require('./pool');

const CreateLogFile = require('./CreateLogFile');
const WilayahRepository = require('./WilayahRepository');
const WilayahMendagriRepository = require('./WilayahMendagriRepository');

const createLogFile = new CreateLogFile(fs);
const wilayahRepository = new WilayahRepository(pool);
const wilayahMendagriRepository = new WilayahMendagriRepository(pool);


const main = async (idWilayah, { kodeKpu, kodeMendagri, tingkatWilayah }) => {
  /* EDIT WILAYAH */
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
    const { id, kode_wilayah_kpu, nama: namaWill, tingkat_wilayah } = wilayah;

    /* CEK KETERSEDIAN DARI TABEL WILAYAH_MENDAGRI */
    const result = await wilayahMendagriRepository.getWilayahWhichContainName({
      nama: namaWill,
      tingkat: tingkat_wilayah,
      kode: kodeMendagri,
    });

    /* JIKA TERSEDIA UPDATE TABEL WILAYAH, DENGAN MAMASUAKN DATA DARI TABEL WILAYAH_MENDAGRI  */
    if (result.length == 1) {
      const { kode } = result[0];

      // await processWilayah(id, {
      //   kodeKpu: kode_wilayah_kpu,
      //   kodeMendagri: kode,
      //   tingkatWilayah: tingkat_wilayah,
      // })

      /* LOOPING KEDUA */
      await wilayahRepository.editAllWilayahWhichContainKodeKpu(kode_wilayah_kpu, {
        kodeMendagri: kode, addPrefixNull: true,
      });
      await wilayahRepository.editWilayahById(id, { kodeMendagri: kode });

      /* AMBIL LIST 1 TINGKAT DI BAWAHNYA */

      console.log('success: add data wilayah ', namaWill);
      continue;
    }

    console.log('failed :', kode_wilayah_kpu, namaWill);
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
  console.log('Done');
};


main('281402', {
  kodeKpu: '26141.27714',
  kodeMendagri: '32.05',
  tingkatWilayah: 2,
});

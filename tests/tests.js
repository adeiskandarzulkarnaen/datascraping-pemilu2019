const fs = require('fs');
const pool = require('./pool');

const CreateLogFile = require('./CreateLogFile');
const WilayahRepository = require('./WilayahRepository');
const WilayahMendagriRepository = require('./WilayahMendagriRepository');

const createLogFile = new CreateLogFile(fs);
const wilayahRepository = new WilayahRepository(pool);
const wilayahMendagriRepository = new WilayahMendagriRepository(pool);


const main = async (idWilayah, { kodeKpu, kodeMendagri, tingkatWilayah }) => {
  await wilayahRepository.editAllWilayahWhichContainKodeKpu(kodeKpu, {
    kodeMendagri, addPrefixNull: true,
  });
  await wilayahRepository.editWilayahById(idWilayah, { kodeMendagri });


  const listWilayah = await wilayahRepository.getListWilayahByKodeMendagri(kodeMendagri, {
    tingkatWilayah: tingkatWilayah + 1,
    containPrefixNull: true,
  });

  const logError = [];
  // todo: ini dari tabel "wilayah"
  for (const wilayah of listWilayah) {
    const { id, kode_wilayah_kpu, nama: namaWill, tingkat_wilayah } = wilayah;


    // todo: search 'kode' dari tabel 'wilayah_mendagri'
    const result = await wilayahMendagriRepository.getWilayahWhichContainName({
      nama: namaWill,
      tingkat: tingkat_wilayah,
      kode: kodeMendagri,
    });


    if (result.length == 1) {
      const { kode } = result[0];
      await wilayahRepository.editAllWilayahWhichContainKodeKpu(kode_wilayah_kpu, {
        kodeMendagri: kode, addPrefixNull: true,
      });
      await wilayahRepository.editWilayahById(id, { kodeMendagri: kode });
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


  if (logError.length) await createLogFile.execute('./log', idWilayah, logError);
  console.log('Done');
};

main('281402', {
  kodeKpu: '26141.27714',
  kodeMendagri: '32.05',
  tingkatWilayah: 2,
});

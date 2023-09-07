const fs = require('fs');
const pool = require('./pool');

const CreateLogFile = require('./CreateLogFile');
const WilayahRepository = require('./WilayahRepository');
const WilayahMendagriRepository = require('./WilayahMendagriRepository');

const createLogFile = new CreateLogFile(fs);
const wilayahRepository = new WilayahRepository(pool);
const wilayahMendagriRepository = new WilayahMendagriRepository(pool);


const processKabupaten = async (idWilayah, { kodeKpu, kodeMendagri, tingkatWilayah }) => {
  /* Penjelasan Paramaeter
   * idWilayah      : column 'id' pada tabel 'wilayah'
   * kodeMendagri   : column 'kode_wilayah' pada tabel 'wilayah'
   * kodeKpu        : column 'kode_wilayah_kpu' pada tabel 'wilayah'
   * tingkatWilayah : column 'tingkat_wilayah' pada tabel 'wilayah'
   */

  // Update table-data
  await wilayahRepository.editAllWilayahWhichContainKodeKpu(kodeKpu, {
    kodeMendagri, addPrefixNull: true,
  });
  await wilayahRepository.editWilayahById(idWilayah, { kodeMendagri });

  const listWilayah = await wilayahRepository.getListWilayahByKodeMendagri(kodeMendagri, {
    tingkatWilayah: tingkatWilayah + 1,
    containPrefixNull: true,
  });

  const logError = [];
  for (const wilayah of listWilayah) {
    // Base wilayah
    const { id,
      nama: namaWilayah,
      kode: kodeWilayahMendagri,
      kode_wilayah_kpu: kodeWilayahKpu,
      tingkat_wilayah: tingkat,
    } = wilayah; // BASE WILAYAH

    // Mendagri wilayah
    const result = await wilayahMendagriRepository.getWilayahWhichContainName(namaWilayah, tingkat);

    if (result.length == 1) {
      const { code: kodeMendagriNew } = result[0];
      await wilayahRepository.editAllWilayahWhichContainKodeKpu(kodeWilayahKpu, {
        kodeMendagri: kodeMendagriNew, addPrefixNull: true,
      });
      await wilayahRepository.editWilayahById(id, { kodeMendagri: kodeMendagriNew });
      console.log('add data wilayah success:', namaWilayah);
      continue;
    }

    logError.push({
      idWilayah: id,
      data: result,
    });
  }

  if (logError.length) await createLogFile.execute('./log', idWilayah, logError);
  console.log('Semua Data berhasil ditambahkan');
};

processKabupaten(281402, {
  kodeKpu: '26141.27714',
  kodeMendagri: 32.05,
  tingkatWilayah: 2,
});

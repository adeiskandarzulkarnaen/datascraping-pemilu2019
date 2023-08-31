const FetchApiPilpres = require('../services/api/FetchApiPilpres');
const PemiluCapresRepository = require('../services/database/PemiluCapresRepository');

const main = async () => {
  /* create insance */
  const fetchApiPilpres = new FetchApiPilpres();
  const pemiluCapresRepository = new PemiluCapresRepository();

  const daftarPresiden = await fetchApiPilpres.getDaftarCalon();
  for (cawapresId in daftarPresiden) {
    if (daftarPresiden.hasOwnProperty(cawapresId)) {
      const capresDanCawapres = daftarPresiden[cawapresId].nama;
      const capresDanCawapresSplited = capresDanCawapres.replace(/\(\d+\)/g, '').split('-');

      const namaCapres = capresDanCawapresSplited[0].trim();
      const namaWakilCapres = capresDanCawapresSplited[1].trim();

      await pemiluCapresRepository.addPemiluCapres({
        id: cawapresId,
        idPemilu: 1, // id pilpres 2019
        noUrut: daftarPresiden[cawapresId].nomor_urut,
        namaCapres,
        namaWakilCapres,
      });

      console.log(`Berhasil menambahkan (${cawapresId}): ${namaCapres} - ${namaWakilCapres}`);
    }
  }
};

main();

const pool = require('./config/pool');

const PemiluRepository = require('./service/PemiluRepository');
const WilayahRepository = require('./service/WilayahRepository');

/* create instance */
const pemiluRepository = new PemiluRepository(pool);
const wilayahRepository = new WilayahRepository(pool);

const updateHasilPemiluTps = async (kodeProvinsiMendagri, kodeProvinsiKpu) => {
  const daftarWilayah = await wilayahRepository.getAllWilayahInProvince(kodeProvinsiKpu);

  for (wilayah of daftarWilayah) {
    const { kode, kode_wilayah_kpu: kodeWilayahKpu } = wilayah;

    await pemiluRepository.updateKodeMendagriByKodeWilayahKPU({
      kodeWilayahKpu,
      kodeWilayahMendagri: kode,
    });

    console.log(`update ${kodeWilayahKpu} sucess!! `);
  }
};

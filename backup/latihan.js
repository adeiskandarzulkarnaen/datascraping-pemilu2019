

const test = async () => {
  const daftarKelurahan = await fetchApiWilayah.getDataWilayah(`26141/27714/27715`);
  for (kelurahanId in daftarKelurahan) {
    if (daftarKelurahan.hasOwnProperty(kelurahanId)) {
      // console.log('kel.', daftarKelurahan[kelurahanId].nama);

      /* looping tps di kelurahan-i */
      const daftarTps = await fetchApiWilayah.getDataWilayah(`26141/27714/27715/${kelurahanId}`);
      for (tpsId in daftarTps) {
        if (daftarTps.hasOwnProperty(tpsId)) {
          // console.log(daftarTps[tpsId]);
          const hasilPemiluTps = await fetchApiPilpres.getHasilPilpres(
            'hhcw',
            `26141/27714/27715/${kelurahanId}/${tpsId}`,
          );

          await hasilPemiluTpsRepository.addHasilPemiluTps({
            idPemilu: 1,
            kodeWilayah: `26141.27714.27715.${kelurahanId}`,
            namaTps: daftarTps[tpsId].nama,
            pemilihTerdaftar: Number(hasilPemiluTps.pemilih_j),
            penggunaHakPilih: Number(hasilPemiluTps.pengguna_j),
            jmlSuaraSah: Number(hasilPemiluTps.suara_sah),
            jmlSuaraTdkSah: Number(hasilPemiluTps.suara_tidak_sah),
          });

          const idHasilPemiluTps = await hasilPemiluTpsRepository.getIdHasilPemiluTpsByKodeWilayahAndNamaTps({
            kodeWilayah: `26141.27714.27715.${kelurahanId}`,
            namaTps: daftarTps[tpsId].nama,
          });

          // eslint-disable-next-line guard-for-in
          for (key in hasilPemiluTps.chart) {
            await hasilPemiluCapresRepository.addHasilPemiluCapres({
              idHasilPemiluTps: idHasilPemiluTps.id,
              idPemiluCapres: key,
              jumlahSuaraSah: hasilPemiluTps.chart[key],
            });
          }
        }
      }
    }
  }
};

test();

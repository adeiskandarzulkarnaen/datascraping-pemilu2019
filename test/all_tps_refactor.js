const addWilayahData = async (level, id, namePrefix, fullName) => {
  await wilayahRepository.addWilayah(id, namePrefix + fullName, level);
  await wilayahDataRepository.addWilayahData(id, fullName);
};

const processTps = async (provinsiId, kabupatenId, kecamatanId, kelurahanId, tpsId) => {
  const hasilPemiluTps = await fetchApiPilpres.getHasilPilpres('hhcw', `${provinsiId}/${kabupatenId}/${kecamatanId}/${kelurahanId}/${tpsId}`);

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

  for (const key in hasilPemiluTps.chart) {
    if (hasilPemiluTps.chart.hasOwnProperty(key)) {
      await hasilPemiluCapresRepository.addHasilPemiluCapres({
        idHasilPemiluTps: idHasilPemiluTps.id,
        idPemiluCapres: key,
        jumlahSuaraSah: hasilPemiluTps.chart[key],
      });
    }
  }

  /* logging */
  console.log(
    'Berhasil menambahkan data:',
    'prov.', daftarProvinsi[provinsiId].nama,
    'kab.', daftarKabupaten[kabupatenId].nama,
    'kec.', daftarKecamatan[kecamatanId].nama,
    'kel.', daftarKelurahan[kelurahanId].nama,
  );
};

const processKelurahan = async (provinsiId, kabupatenId, kecamatanId, kelurahanId) => {
  await addWilayahData(4, `${provinsiId}.${kabupatenId}.${kecamatanId}.${kelurahanId}`, 'Desa/Kel. ', daftarKelurahan[kelurahanId].nama);

  const daftarTps = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}/${kecamatanId}/${kelurahanId}`);
  for (const tpsId in daftarTps) {
    if (daftarTps.hasOwnProperty(tpsId)) {
      await processTps(provinsiId, kabupatenId, kecamatanId, kelurahanId, tpsId);
    }
  }
};

const processKecamatan = async (provinsiId, kabupatenId, kecamatanId) => {
  await addWilayahData(3, `${provinsiId}.${kabupatenId}.${kecamatanId}`, 'Kec. ', daftarKecamatan[kecamatanId].nama);

  const daftarKelurahan = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}/${kecamatanId}`);
  for (const kelurahanId in daftarKelurahan) {
    if (daftarKelurahan.hasOwnProperty(kelurahanId)) {
      await processKelurahan(provinsiId, kabupatenId, kecamatanId, kelurahanId);
    }
  }
};

const processKabupaten = async (provinsiId, kabupatenId) => {
  await addWilayahData(2, `${provinsiId}.${kabupatenId}`, 'Kab. ', daftarKabupaten[kabupatenId].nama);

  const daftarKecamatan = await fetchApiWilayah.getDataWilayah(`${provinsiId}/${kabupatenId}`);
  for (const kecamatanId in daftarKecamatan) {
    if (daftarKecamatan.hasOwnProperty(kecamatanId)) {
      await processKecamatan(provinsiId, kabupatenId, kecamatanId);
    }
  }
};

const init = async () => {
  const daftarProvinsi = await fetchApiWilayah.getDataWilayah();
  for (const provinsiId in daftarProvinsi) {
    if (daftarProvinsi.hasOwnProperty(provinsiId)) {
      await addWilayahData(1, provinsiId, '', daftarProvinsi[provinsiId].nama);

      const daftarKabupaten = await fetchApiWilayah.getDataWilayah(`${provinsiId}`);
      for (const kabupatenId in daftarKabupaten) {
        if (daftarKabupaten.hasOwnProperty(kabupatenId)) {
          await processKabupaten(provinsiId, kabupatenId);
        }
      }
    }
  }
};

init();

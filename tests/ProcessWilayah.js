class ProcessWilayah {
  constructor(createLogFile, wilayahRepository, wilayahMendagriRepository) {
    this._createLogFile = createLogFile;
    this._wilayahRepository = wilayahRepository;
    this._wilayahMendagriRepository = wilayahMendagriRepository;
    this.maxTingkatWilayah = 4;
  }

  async execute(idWilayah, { kodeKpu, kodeMendagri, tingkatWilayah }) {
    if (tingkatWilayah >= this.maxTingkatWilayah) {
      await this._wilayahRepository.editWilayahById(idWilayah, { kodeMendagri });
      return;
    }
    await this._processWilayah(idWilayah, { kodeKpu, kodeMendagri, tingkatWilayah });
  }

  async _processWilayah(idWilayah, { kodeKpu, kodeMendagri, tingkatWilayah }) {
    await this._wilayahRepository.editAllWilayahWhichContainKodeKpu(kodeKpu, {
      kodeMendagri, addPrefixNull: true,
    });
    await this._wilayahRepository.editWilayahById(idWilayah, { kodeMendagri });
    console.log('success:', 'tingkat', tingkatWilayah, '|| UPDATED' );

    /* PROCESS CHILD WILAYAH */
    await this._processChildWilayah(kodeMendagri, tingkatWilayah + 1); // todo : err
  }

  async _processChildWilayah(kodeMendagri, tingkatWilayah) {
    const listWilayah = await this._wilayahRepository.getListWilayahByKodeMendagri(kodeMendagri, {
      tingkatWilayah, containPrefixNull: true, // tingkat +1
    });

    const logError = [];
    for (const wilayah of listWilayah) {
      const { id, kode_wilayah_kpu: kodeKpu, nama: namaWilayah, tingkat_wilayah: tingkatWilayah } = wilayah;

      const searchResultTableMendagri = await this._wilayahMendagriRepository.getWilayahWhichContainName({
        nama: namaWilayah,
        tingkat: tingkatWilayah,
        kode: kodeMendagri,
      });

      if (searchResultTableMendagri.length === 1) {
        const { kode } = searchResultTableMendagri[0];
        await this.execute(id, { kodeKpu, kodeMendagri: kode, tingkatWilayah });

        console.log('success:', 'tingkat', tingkatWilayah, '||', namaWilayah );
        continue;
      }

      console.log('failed :', 'tingkat', tingkatWilayah, '||', namaWilayah );
      logError.push({
        type: (searchResultTableMendagri.length >= 2) ? 'data dupilikat' : 'data tidak ditemukan',
        data: {
          tabel_wilayah: wilayah,
          tabel_wilayah_mendagri: searchResultTableMendagri,
        },
      });
    }

    if (logError.length) await this._createLogFile.execute('./log', kodeMendagri, logError);
  }
}

module.exports = ProcessWilayah;

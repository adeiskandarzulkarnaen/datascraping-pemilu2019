class WilayahMendagriRepository {
  /* Wilayah MENDAGRI repository
   * Melakuakan query dari database yang berisi data wilayah (seperti id dan nama)
   * seperti 'kode_wilayah' dan 'nama' dengan menggunkan sumber data dari MENDAGRI.
  /*
   * kode_wilayah : berisi penomoran wilayah dengan format dari mendagri
   * nama         : berisi nama wilayah
   */

  constructor(pool) {
    this._pool = pool;
  }

  async getWilayahWhichContainName({ nama, kode, tingkat }) {
    /* Penjelasan Parameter
     * nama : column "nama" pada tabel wilayah..
     * kode : column "kode" pada tabel wilayah..
     * tingkat : column "tingkat_wilayah" pada tabel wilayah..
    */
    const query = {
      sql: `SELECT * FROM wilayah_mendagri 
        WHERE 
          UPPER(nama) LIKE UPPER(?) AND 
          kode LIKE ? AND
          tingkat_wilayah = ? `,
      values: [`${nama}`, `${kode}%`, tingkat],
    };
    const [rows] = await this._pool.query(query);
    return rows;
  }
}

module.exports = WilayahMendagriRepository;

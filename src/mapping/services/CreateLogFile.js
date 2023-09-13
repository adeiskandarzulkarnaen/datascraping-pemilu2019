class CreateLogFile {
  constructor(fs) {
    this._fs = fs;
  }

  async execute(fileLocation='./log', fileName, data) {
    if (!this._fs.existsSync(fileLocation)) {
      this._fs.mkdirSync(fileLocation, { recursive: true });
    }

    this._fs.writeFile(`${fileLocation}/${fileName}.json`,
      JSON.stringify(data, null, 2),
      (err) => console.log(err),
    );
  };
}

module.exports = CreateLogFile;

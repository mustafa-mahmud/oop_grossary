class Storage {
  constructor() {}

  static setStorage(allData) {
    localStorage.setItem('grossary', JSON.stringify(allData));
  }

  static getStorage() {
    return JSON.parse(localStorage.getItem('grossary'));
  }

  static removeStorage() {
    localStorage.removeItem('grossary');
    15;
  }
}

export default Storage;

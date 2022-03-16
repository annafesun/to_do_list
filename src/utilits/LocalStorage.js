export class LS {
  static set(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  static delete(key) {
    localStorage.removeItem(key)
  }
}
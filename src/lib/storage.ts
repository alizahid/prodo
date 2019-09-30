import Local from 'secure-ls'

import { isElectron } from './electron'

class Storage {
  store?: any
  storage?: any

  constructor() {
    if (isElectron()) {
      const Store = window.require('electron-store')

      this.store = new Store()
    } else {
      this.storage = new Local()
    }
  }

  get(key: string, fallback: any) {
    try {
      if (this.store) {
        return this.store.get(key)
      } else if (this.storage) {
        return this.storage.get(key)
      }
    } catch (error) {
      return fallback
    }
  }

  set(key: string, data: boolean | string) {
    if (this.store) {
      this.store.set(key, data)
    } else if (this.storage) {
      this.storage.set(key, data)
    }
  }

  remove(key: string) {
    if (this.store) {
      this.store.delete(key)
    } else if (this.storage) {
      this.storage.remove(key)
    }
  }

  clear() {
    if (this.store) {
      this.store.clear()
    } else if (this.storage) {
      this.storage.clear()
    }
  }
}

export default new Storage()

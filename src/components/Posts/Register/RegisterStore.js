import { makeAutoObservable } from 'mobx'

class RegisterStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default RegisterStore

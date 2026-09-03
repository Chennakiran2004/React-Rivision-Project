import { makeAutoObservable } from 'mobx'

class EditPostStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default EditPostStore

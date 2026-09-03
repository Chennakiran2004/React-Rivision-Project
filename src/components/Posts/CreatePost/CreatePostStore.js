import { makeAutoObservable } from 'mobx'

class CreatePostStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default CreatePostStore

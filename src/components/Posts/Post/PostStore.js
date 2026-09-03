import { makeAutoObservable } from 'mobx'

class PostStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default PostStore

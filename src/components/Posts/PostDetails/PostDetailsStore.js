import { makeAutoObservable } from 'mobx'

class PostDetailsStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default PostDetailsStore

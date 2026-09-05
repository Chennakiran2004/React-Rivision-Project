import { makeAutoObservable } from 'mobx'
import { BASE_URL, authHeaders } from '../api'

class PostDetailsStore {
  post = null
  error = ''

  constructor() {
    makeAutoObservable(this)
  }

  fetchDetails = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/`, {
        headers: authHeaders(),
      })
      const data = await response.json()
      this.post = data
    } catch (fetchError) {
      console.error(fetchError)
      this.error = 'Unable to load this post right now.'
    }
  }
}

export default PostDetailsStore

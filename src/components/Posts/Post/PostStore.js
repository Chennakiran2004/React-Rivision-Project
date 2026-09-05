import { makeAutoObservable } from 'mobx'
import { BASE_URL, authHeaders } from '../api'
import { VIEW_STATUS } from '../categories'

const PAGE_SIZE = 10

class PostStore {
  postsData = []
  status = VIEW_STATUS.LOADING
  error = ''
  searchValue = ''
  page = 1
  totalCount = 0

  constructor() {
    makeAutoObservable(this)
  }

  setSearchValue = (value) => {
    this.searchValue = value
    this.page = 1
  }

  goToNextPage = () => {
    if (this.page * PAGE_SIZE < this.totalCount) {
      this.page += 1
    }
  }

  goToPrevPage = () => {
    if (this.page > 1) {
      this.page -= 1
    }
  }

  removePost = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/`, {
        method: 'DELETE',
        headers: authHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      this.postsData = this.postsData.filter((item) => item.id !== id)
    } catch (error) {
      this.error = error
    }
  }

  fetchPosts = async () => {
    this.status = VIEW_STATUS.LOADING
    this.error = ''
    try {
      let url = `${BASE_URL}/posts/?page=${this.page}`

      if (this.searchValue) {
        url += `&search=${this.searchValue}`
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: authHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await response.json()

      this.postsData = data.results
      this.totalCount = data.count
      if (this.postsData.length === 0) this.status = VIEW_STATUS.EMPTY
      else this.status = VIEW_STATUS.SUCCESS
    } catch (fetchError) {
      console.error(fetchError)
      this.error = 'Unable to load posts right now.'
      this.status = VIEW_STATUS.FAILURE
    }
  }
}

export default PostStore

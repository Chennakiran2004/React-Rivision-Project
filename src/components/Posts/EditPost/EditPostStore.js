import { makeAutoObservable } from 'mobx'
import { BASE_URL, authHeaders, authorizedFetch } from '../api'

const INITIAL_FORM_DATA = {
  title: '',
  body: '',
  status: 'draft',
  categories: [1],
}

class EditPostStore {
  formData = { ...INITIAL_FORM_DATA }
  error = ''
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setField = (name, value) => {
    this.formData = { ...this.formData, [name]: value }
  }

  toggleCategory = (categoryId) => {
    const categories = this.formData.categories.includes(categoryId)
      ? this.formData.categories.filter((item) => item !== categoryId)
      : [...this.formData.categories, categoryId]

    this.formData = { ...this.formData, categories }
  }

  fetchPost = async (id) => {
    this.isLoading = true

    try {
      const response = await authorizedFetch(`${BASE_URL}/posts/${id}/`, {
        headers: authHeaders(),
      })

      const data = await response.json()

      this.formData = {
        title: data.title,
        body: data.body,
        status: data.status,
        categories: data.categories,
      }
    } catch (fetchError) {
      console.error(fetchError)
      this.error = 'Unable to load this post right now.'
    } finally {
      this.isLoading = false
    }
  }

  submit = async (id, navigate) => {
    try {
      const response = await authorizedFetch(`${BASE_URL}/posts/${id}/`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(this.formData),
      })

      const data = await response.json()
      console.log('updated', data)

      if (!response.ok) {
        this.error = 'Fill the details'
        return
      }

      navigate('/')
    } catch (submitError) {
      console.error(submitError)
      this.error = 'Something went wrong while updating the post.'
    }
  }
}

export default EditPostStore

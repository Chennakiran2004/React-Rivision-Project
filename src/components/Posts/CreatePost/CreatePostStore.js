import { makeAutoObservable } from 'mobx'
import { authHeaders, BASE_URL } from '../api'

const INITIAL_FORM_DATA = {
  title: '',
  body: '',
  status: 'draft',
  categories: [1],
}

class CreatePostStore {
  error = ''
  formData = { ...INITIAL_FORM_DATA }

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

  reset = () => {
    this.formData = { ...INITIAL_FORM_DATA }
    this.error = ''
  }

  submit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(this.formData),
      })

      const data = await response.json()
      console.log('create', data)

      if (!response.ok) {
        this.error = 'Fill the details'
        return
      }

      this.formData = { ...INITIAL_FORM_DATA }
      this.error = ''
    } catch (error) {
      this.error = 'Something Went Wrong'
      console.log(error)
    }
  }
}

export default CreatePostStore

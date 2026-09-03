import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL, authHeaders } from './api'

const EditPost = () => {
  const { id } = useParams()

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    status: 'draft',
    categories: [1],
  })

  const navigate = useNavigate()

  const [error, setError] = useState()

  // Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts/${id}/`)

        const data = await response.json()

        setFormData({
          title: data.title,
          body: data.body,
          status: data.status,
          categories: data.categories,
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchPost()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      console.log('updated', data)

      if (!response.ok) {
        setError('Fill the details')
        return
      }

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleCategoryChange = (event) => {
    const selectedCategory = Number(event.target.value)

    setFormData((prev) => {
      let categories = [...prev.categories]

      if (categories.includes(selectedCategory)) {
        categories = categories.filter((item) => item !== selectedCategory)
      } else {
        categories.push(selectedCategory)
      }

      return {
        ...prev,
        categories: categories,
      }
    })
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <section className="form-shell">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <p className="eyebrow">Edit post</p>
          <h2>Update a post</h2>
        </div>

        <div className="field-group">
          <label className="field-label">Title</label>

          <input
            className="text-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Body</label>

          <textarea
            className="text-area"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Status</label>

          <select
            className="select-input"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="field-group">
          <label className="field-label">Categories</label>

          <div className="categories-grid">
            <label className="checkbox-item">
              <input
                type="checkbox"
                value={1}
                checked={formData.categories.includes(1)}
                onChange={handleCategoryChange}
              />
              <span>Django</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value={2}
                checked={formData.categories.includes(2)}
                onChange={handleCategoryChange}
              />
              <span>Python</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value={3}
                checked={formData.categories.includes(3)}
                onChange={handleCategoryChange}
              />
              <span>DevOps</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value={4}
                checked={formData.categories.includes(4)}
                onChange={handleCategoryChange}
              />
              <span>SQL</span>
            </label>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button className="primary-button" type="submit">
            Confirm
          </button>

          <button className="secondary-button" type="button" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditPost

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authHeaders, BASE_URL } from '../api'
import { CATEGORY_OPTIONS } from '../categories'

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    status: 'draft',
    categories: [1],
  })

  const navigate = useNavigate()

  const [error, setError] = useState()

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log('submit')
    try {
      const response = await fetch(`${BASE_URL}/posts/`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('create', data)

      if (!response.ok) {
        setError('Fill the details')
        return
      }

      //   setPostsData((prev) => [...prev, data])
      navigate(-1)

      setFormData({
        title: '',
        body: '',
        status: 'draft',
        categories: [1],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleCategoryChange = (event) => {
    // console.log('category change')
    const selectedCategory = event.target.value
    // console.log(selectedCategory)

    setFormData((prev) => {
      let categories = [...prev.categories]
      // console.log('prev', categories)

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
          <p className="eyebrow">New post</p>
          <h2>Create a post</h2>
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

        {/* <div className="field-group">
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
        </div> */}

        {CATEGORY_OPTIONS.map((category, index) => (
          <label key={index} className="checkbox-item">
            <input
              type="checkbox"
              value={index + 1}
              checked={formData.categories.includes(index + 1)}
              onChange={handleCategoryChange}
            />
            <span>{category}</span>
          </label>
        ))}

        {error && <h1 className="form-error">{error}</h1>}

        <div className="form-actions">
          <button className="primary-button" type="submit">
            Create Post
          </button>
          <button className="secondary-button" type="button" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePostForm

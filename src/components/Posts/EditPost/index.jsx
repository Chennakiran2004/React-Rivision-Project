import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../StoreProvide'
import { CATEGORY_OPTIONS } from '../categories'

const EditPost = observer(() => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    store: { editPostStore },
  } = useStore()

  const { formData, error, fetchPost, setField, toggleCategory, submit } = editPostStore

  useEffect(() => {
    fetchPost(id)
  }, [id, fetchPost])

  const handleChange = (event) => {
    const { name, value } = event.target
    setField(name, value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submit(id, navigate)
  }

  const handleCategoryChange = (event) => {
    toggleCategory(Number(event.target.value))
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
})

export default EditPost

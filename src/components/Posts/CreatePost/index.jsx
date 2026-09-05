import { useNavigate } from 'react-router-dom'
import { CATEGORY_OPTIONS } from '../categories'
import { useStore } from '../StoreProvide'
import { observer } from 'mobx-react-lite'

const CreatePostForm = observer(() => {
  const {
    store: { createPostStore },
  } = useStore()

  const { error, setField, submit, toggleCategory, formData } = createPostStore

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target

    setField(name, value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    submit()
    navigate('/')
  }

  const handleCategoryChange = (categoryId) => {
    toggleCategory(categoryId)
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

        {CATEGORY_OPTIONS.map((category, index) => (
          <label key={index} className="checkbox-item">
            <input
              type="checkbox"
              value={index + 1}
              checked={formData.categories.includes(index + 1)}
              onChange={() => handleCategoryChange(index + 1)}
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
})

export default CreatePostForm

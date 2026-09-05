import { useNavigate } from 'react-router-dom'
import './index.css'
import { useStore } from '../StoreProvide'

const formatDate = (value) => {
  if (!value) return 'Recently'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const formatStatus = (status) => {
  if (!status) return 'Draft'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const PostCard = ({ post }) => {
  // const { postStore } = useStore()
  const {
    store: { postStore },
  } = useStore()

  const { removePost } = postStore

  const navigate = useNavigate()

  const handleCardClick = (id) => {
    navigate(`/post-details/${id}`)
  }

  const handleDelete = async (event, id) => {
    event.stopPropagation()
    removePost(id)
  }

  const handleEdit = (event, id) => {
    event.stopPropagation()
    navigate(`/edit-post/${id}`)
  }

  return (
    <article key={post.id} className="post-card" onClick={() => handleCardClick(post.id)}>
      <div className="post-card-top">
        <span className="post-number">{String(post.id).padStart(2, '0')}</span>
        <span className={`status-pill ${post.status || 'draft'}`}>{formatStatus(post.status)}</span>
      </div>

      <div className="post-meta">
        <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
        <div className="tag-list" aria-label="Post categories">
          {(post.categories ?? []).map((category) => (
            <span key={`${post.id}-${category}`} className="tag">
              {category}
            </span>
          ))}
        </div>
      </div>

      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div className="card-actions">
        <button
          className="card-button"
          type="button"
          onClick={(event) => handleEdit(event, post.id)}
        >
          Edit
        </button>
        <button
          className="card-button danger"
          type="button"
          onClick={(event) => handleDelete(event, post.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default PostCard

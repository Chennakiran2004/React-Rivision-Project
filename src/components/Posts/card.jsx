import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
import { BASE_URL } from './api'

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

const categoryLabels = {
  1: 'Django',
  2: 'Python',
  3: 'DevOps',
  4: 'SQL',
}

const formatStatus = (status) => {
  if (!status) return 'Draft'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const PostCard = ({ post, setPostsData }) => {
  const navigate = useNavigate()

  const handleCardClick = (id) => {
    navigate(`/post-details/${id}`)
  }

  const handleDelete = async (event, id) => {
    event.stopPropagation()
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/`, {
        method: 'DELETE',
      })

      console.log(response)
      //   const data = response.json()
      console.log('Deleted')
      //   setPostsData((prev) => [...prev, data])
      setPostsData((prev) => prev.filter((item) => item.id !== id))
      //   navigate('/')
    } catch (error) {
      console.log(error)
    }
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
          {(post.categories ?? []).map((categoryId) => (
            <span key={`${post.id}-${categoryId}`} className="tag">
              {categoryLabels[categoryId] ?? `Category ${categoryId}`}
            </span>
          ))}
        </div>
      </div>

      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button
        className="delete-button"
        type="button"
        onClick={(event) => handleDelete(event, post.id)}
      >
        Delete
      </button>
      <button
        className="delete-button"
        type="button"
        onClick={(event) => handleEdit(event, post.id)}
      >
        Edit
      </button>
    </article>
  )
}

export default PostCard

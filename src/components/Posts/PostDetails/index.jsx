import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../StoreProvide'
import './index.css'

const PostDetails = observer(() => {
  const { id } = useParams()
  const {
    store: { postDetailsStore },
  } = useStore()

  const { post, error, fetchDetails } = postDetailsStore

  useEffect(() => {
    fetchDetails(id)
  }, [id, fetchDetails])

  if (!post) {
    return (
      <main className="detail-page">
        <p className="empty-state">{error || 'Loading...'}</p>
      </main>
    )
  }

  return (
    <main className="detail-page">
      <article className="post-detail-card">
        <div className="detail-header">
          <span className="detail-kicker">Article</span>
          <span className={`status-pill ${post.status || 'draft'}`}>{post.status}</span>
        </div>

        <h1>{post.title}</h1>

        <div className="detail-meta">
          <time dateTime={post.created_at}>{post.created_at}</time>
          <div className="detail-tags">
            {post.categories.map((each) => (
              <span key={each} className="detail-tag">
                {each}
              </span>
            ))}
          </div>
        </div>

        <p className="detail-body">{post.body}</p>
      </article>
    </main>
  )
})

export default PostDetails

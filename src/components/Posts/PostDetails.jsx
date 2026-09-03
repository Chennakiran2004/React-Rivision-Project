/* eslint-disable react-hooks/set-state-in-effect */
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from './api'

const PostDetails = () => {
  const { id } = useParams()
  const [post, setPostData] = useState()

  const fetchDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/`)
      const data = await response.json()
      console.log(data)
      setPostData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [id])

  if (!post) {
    return <p>Loading...</p>
  }

  console.log(post)

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
}

export default PostDetails

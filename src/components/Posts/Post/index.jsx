/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import PostCard from '../Card'
import '../index.css'
// import CreatePostForm from './CreatePost'
import Pagination from '../../Pagination'

import { BASE_URL, authHeaders, logout } from '../api'

import { useNavigate } from 'react-router-dom'

const VIEW_STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  EMPTY: 'EMPTY',
}

const PAGE_SIZE = 10

const Posts = () => {
  const [postsData, setPostsData] = useState([])
  const [status, setStatus] = useState(VIEW_STATUS.LOADING)
  const [error, setError] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      setStatus(VIEW_STATUS.LOADING)
      setError('')

      // const response = await fetch('http://127.0.0.1:8000/api/posts/')
      let url = `${BASE_URL}/posts/?page=${page}`

      if (searchValue) {
        url += `&search=${searchValue}`
      }

      // if (searchValue) {
      //   url = `${BASE_URL}/posts/?search=${searchValue}`
      // } else {
      //   url = `${BASE_URL}/posts/`
      // }

      const response = await fetch(url, {
        method: 'GET',
        headers: authHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await response.json()
      setPostsData(data.results)
      setTotalCount(data.count)

      if (data.length === 0) {
        setStatus(VIEW_STATUS.EMPTY)
      } else {
        setStatus(VIEW_STATUS.SUCCESS)
      }
    } catch (fetchError) {
      console.error(fetchError)
      setError('Unable to load posts right now.')
      setStatus(VIEW_STATUS.FAILURE)
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchData()
    }, 500)

    return () => clearTimeout(debounce)
  }, [searchValue, page])

  const renderLoadingView = () => <p className="empty-state">Loading your posts...</p>

  const renderFailureView = () => (
    <p className="empty-state">{error || 'Unable to load posts right now.'}</p>
  )

  const renderEmptyView = () => <p className="empty-state">No posts are available.</p>

  const renderSuccessView = () => {
    console.log(postsData)
    return postsData?.map((post) => (
      <PostCard key={post.id} post={post} setPostsData={setPostsData} />
    ))
  }

  const renderGrid = () => {
    switch (status) {
      case VIEW_STATUS.LOADING:
        return renderLoadingView()
      case VIEW_STATUS.SUCCESS:
        return renderSuccessView()
      case VIEW_STATUS.FAILURE:
        return renderFailureView()
      case VIEW_STATUS.EMPTY:
        return renderEmptyView()
      default:
        return null
    }
  }

  const onClickCreate = () => {
    navigate('/create-post')
  }

  const onClickLogout = () => {
    logout()
    navigate('/login')
  }

  const totalPosts = Array.isArray(postsData) ? postsData.length : 0

  const handleClickNext = () => {
    if (page * PAGE_SIZE < totalCount) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handleClickPrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <main className="dashboard">
      <header className="page-header">
        <div>
          <p className="eyebrow">Content library</p>
          <h1>Posts, in focus.</h1>
          <p className="subtitle">A considered view of every note in your collection.</p>
        </div>
        <div className="header-actions">
          <button className="secondary-button" type="button" onClick={onClickLogout}>
            Log out
          </button>
          <div className="header-mark" aria-hidden="true">
            01
          </div>
        </div>
      </header>

      <section className="summary" aria-label="Post summary">
        <div>
          <span className="summary-label">Published posts</span>
          <strong>{totalPosts}</strong>
        </div>
        <div>
          <span className="summary-label">Current view</span>
          <strong>{status === VIEW_STATUS.LOADING ? '...' : totalPosts}</strong>
        </div>
        <div className="summary-note">Updated from your remote collection</div>
      </section>
      <div className="toolbar">
        <input
          className="text-input search-input"
          type="search"
          placeholder="Search by title"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        {/* <CreatePostForm setPostsData={setPostsData} /> */}
        <button className="primary-button" type="button" onClick={onClickCreate}>
          Create Post
        </button>
      </div>
      <section className="post-grid" aria-label="Posts">
        {renderGrid()}

        {totalPosts > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPosts}
            handleClickNext={handleClickNext}
            handleClickPrev={handleClickPrev}
          />
        )}
      </section>
    </main>
  )
}

export default Posts

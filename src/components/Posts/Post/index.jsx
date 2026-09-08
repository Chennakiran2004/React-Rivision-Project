import { useEffect } from 'react'
import PostCard from '../Card'
import '../index.css'
import Pagination from '../../Pagination'
import { useStore } from '../StoreProvide'
import { observer } from 'mobx-react-lite'
import { VIEW_STATUS } from '../categories'

import { logout } from '../api'

import { useNavigate } from 'react-router-dom'

const PAGE_SIZE = 10

const Posts = observer(() => {
  const {
    store: { postStore },
  } = useStore()

  const {
    postsData,
    status,
    setSearchValue,
    goToNextPage,
    goToPrevPage,
    fetchPosts,
    page,
    searchValue,
    error,
    totalCount,
  } = postStore

  const navigate = useNavigate()

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchPosts()
    }, 500)

    return () => clearTimeout(debounce)
  }, [searchValue, page, fetchPosts])

  const renderLoadingView = () => <p className="empty-state">Loading your posts...</p>

  const renderFailureView = () => (
    <p className="empty-state">{error || 'Unable to load posts right now.'}</p>
  )

  const renderEmptyView = () => <p className="empty-state">No posts are available.</p>

  const renderSuccessView = () => {
    console.log(postsData)
    return postsData?.map((post) => <PostCard key={post.id} post={post} />)
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

  const totalPosts = Math.ceil(totalCount / PAGE_SIZE)

  const handleClickNext = () => {
    goToNextPage()
  }

  const handleClickPrev = () => {
    goToPrevPage()
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
})

export default Posts

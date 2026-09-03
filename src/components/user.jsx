import { useState, useEffect } from 'react'
import Card from './card'
import Pagination from './Pagination'

const VIEW_STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  EMPTY: 'EMPTY',
}

const User = () => {
  const [postData, setPostData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, isError] = useState(false)
  const [status, setStatus] = useState(VIEW_STATUS.LOADING)

  const postPerPage = 10

  const fetchData = async () => {
    try {
      setStatus(VIEW_STATUS.LOADING)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      setPostData(data)
      // setStatus(VIEW_STATUS.SUCCESS)

      if (data == 0) setStatus(VIEW_STATUS.EMPTY)
      else setStatus(VIEW_STATUS.SUCCESS)
    } catch (error) {
      console.log(error)
      setStatus(VIEW_STATUS.FAILURE)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [])

  const handleDelete = (id) => {
    setPostData((prevData) => prevData.filter((user) => user.id !== id))
  }

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const totalPages = Math.ceil(postData.length / postPerPage)
  const lastIndex = currentPage * postPerPage
  const firstIndex = lastIndex - postPerPage

  const paginationData = postData.slice(firstIndex, lastIndex)

  const renderSuccessView = () => {
    return paginationData.map((user) => (
      <Card key={user.id} user={user} handleDelete={handleDelete} />
    ))
  }

  const renderLoadingView = () => {
    return <p className="empty-state">Loading your posts...</p>
  }

  const renderFailerView = () => {
    return <p>Error While fetching data</p>
  }

  const renderEmptyView = () => {
    return <p>No Posts are Available</p>
  }

  const renderGrid = () => {
    switch (status) {
      case VIEW_STATUS.LOADING:
        return renderLoadingView()

      case VIEW_STATUS.FAILURE:
        return renderFailerView()

      case VIEW_STATUS.EMPTY:
        return renderEmptyView()

      case VIEW_STATUS.SUCCESS:
        return renderSuccessView()

      default:
        null
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
        <div className="header-mark" aria-hidden="true">
          01
        </div>
      </header>
      <section className="summary" aria-label="Post summary">
        <div>
          <span className="summary-label">Published posts</span>
          <strong>{postData.length}</strong>
        </div>
        <div>
          <span className="summary-label">Current view</span>
          <strong>
            {status === VIEW_STATUS.LOADING
              ? '...'
              : `${paginationData.length} of ${postData.length}`}
          </strong>
        </div>
        <div className="summary-note">Updated from your remote collection</div>
      </section>
      <section className="post-grid" aria-label="Posts">
        {/* {isLoading
          ? renderLoadingView()
          : paginationData.length
            ? renderSuccessView()
            : renderEmptyView()} */}
        {renderGrid()}
      </section>

      <Pagination
        totalPages={Math.max(1, totalPages)}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
        currentPage={currentPage}
      />
    </main>
  )
}

export default User

const Pagination = ({ currentPage, totalPages, handleClickNext, handleClickPrev }) => {
  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="page-button" onClick={handleClickPrev} disabled={currentPage === 1}>
        <span aria-hidden="true">←</span>
        Previous
      </button>

      <span className="page-status">
        {String(currentPage).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
      </span>

      <button
        className="page-button"
        onClick={handleClickNext}
        disabled={currentPage === totalPages}
      >
        Next
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  )
}

export default Pagination

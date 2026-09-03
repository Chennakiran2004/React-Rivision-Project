const Card = ({ user, handleDelete }) => {
  return (
    <article className="post-card">
      <div className="post-card-top">
        <span className="post-number">{String(user.id).padStart(2, '0')}</span>
        <button
          className="delete-button"
          onClick={() => handleDelete(user.id)}
          aria-label={`Delete ${user.title}`}
        >
          Delete
        </button>
      </div>
      <h2>{user.title}</h2>
      <p>{user.body}</p>
    </article>
  )
}

export default Card

import { Routes, Route } from 'react-router-dom'
import Posts from './Post'
import CreatePostForm from './CreatePost'
import PostDetails from './PostDetails'
import EditPost from './EditPost'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'

const PostRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Posts />} />
        <Route path="/create-post" element={<CreatePostForm />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Route>
    </Routes>
  )
}

export default PostRoutes

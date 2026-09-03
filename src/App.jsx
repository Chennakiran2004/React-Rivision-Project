import './App.css'
// import User from './components/user'
import Posts from './components/Posts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePostForm from './components/Posts/createPost'
import PostDetails from './components/Posts/PostDetails'
import EditPost from './components/Posts/EditPost'
import Login from './components/Posts/login'
import Register from './components/Posts/register'
import ProtectedRoute from './components/Posts/ProctectedRoute'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <User /> */}
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  )
}

export default App

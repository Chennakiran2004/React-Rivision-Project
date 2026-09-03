import './App.css'
import { BrowserRouter } from 'react-router-dom'
import PostRoutes from './components/Posts/PostRoutes'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <User /> */}
      <BrowserRouter>
        <PostRoutes />
      </BrowserRouter>
    </>
  )
}

export default App

import { createContext, useContext } from 'react'
import LoginStore from './Login/LoginStore'
import RegisterStore from './Register/RegisterStore'
import CreatePostStore from './CreatePost/CreatePostStore'
import EditPostStore from './EditPost/EditPostStore'
import PostDetailsStore from './PostDetails/PostDetailsStore'
import PostStore from './Post/PostStore'

const StoreContext = createContext(null)

const store = {
  loginStore: new LoginStore(),
  registerStore: new RegisterStore(),
  createPostStore: new CreatePostStore(),
  editPostStore: new EditPostStore(),
  postDetailsStore: new PostDetailsStore(),
  postStore: new PostStore(),
}

const StoreProvider = ({ children }) => {
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => {
  return useContext(StoreContext)
}

export default StoreProvider

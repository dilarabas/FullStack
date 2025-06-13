import { useState, useEffect, useRef } from 'react' // useRef'i içeri aktarın
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable' // Togglable'ı içeri aktarın
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef() // Ref oluşturun

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotificationMessage({ text: message, type: type })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Welcome, ${user.name}!`, 'success')
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    showNotification('Logged out successfully', 'success')
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility() // Formu gizle
      const returnedBlog = await blogService.create(blogObject)
      // Backend'den dönen blog objesinde user bilgisi eksik olabilir (5.9 için),
      // bu yüzden eğer yoksa mevcut user objesini ekleyebiliriz.
      // Bu geçici bir çözüm, backend'in tam user objesini döndürmesi daha iyi.
      if (!returnedBlog.user) {
        returnedBlog.user = {
          username: user.username,
          name: user.name,
          id: user.id || user.token.split('.')[0] // Geçici bir id atama
        }
      }
      setBlogs(blogs.concat(returnedBlog))
      showNotification(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`, 'success')
    } catch (exception) {
      showNotification('Error adding blog', 'error')
    }
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogListAndForm = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in {' '}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={notificationMessage} />
      {user === null ? loginForm() : blogListAndForm()}
    </div>
  )
}

export default App

// src/App.jsx içinde handleLike ve handleRemove fonksiyonlarını ekleyin
// (BlogListAndForm render fonksiyonunda Blog bileşenine geçirilmesi gerekiyor)

const handleLike = async (blogToUpdate) => {
  try {
    const updatedBlog = await blogService.update(blogToUpdate.id, blogToUpdate)
    setBlogs(blogs.map(blog =>
      blog.id === updatedBlog.id
        ? { ...updatedBlog, user: blog.user } // 5.9: Mevcut user objesini koru
        : blog
    ))
    showNotification(`You liked "${updatedBlog.title}"!`, 'success')
  } catch (exception) {
    showNotification('Error liking the blog', 'error')
  }
}

const handleRemove = async (idToRemove) => {
  try {
    await blogService.remove(idToRemove)
    setBlogs(blogs.filter(blog => blog.id !== idToRemove))
    showNotification('Blog successfully removed!', 'success')
  } catch (exception) {
    showNotification('Error removing the blog', 'error')
  }
}

// blogListAndForm fonksiyonunda Blog bileşenine prop olarak geçirme:
const blogListAndForm = () => (
  <div>
    {/* ... */}
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        updateBlog={handleLike}  // handleLike fonksiyonunu Blog bileşenine geçirin
        removeBlog={handleRemove} // handleRemove fonksiyonunu Blog bileşenine geçirin
      />
    )}
  </div>
)
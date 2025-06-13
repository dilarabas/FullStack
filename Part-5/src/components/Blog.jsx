import { useState } from 'react'
import PropTypes from 'prop-types' // PropTypes'ı içeri aktarın

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      // Backend'in beklentisine göre user id'si veya objesi
      user: blog.user && blog.user.id ? blog.user.id : blog.user
    }
    updateBlog(updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }

  // Blogu ekleyen kullanıcı ise silme butonunu göster
  const showDeleteButton = user && blog.user && user.username === blog.user.username

  return (
    <div style={blogStyle} className="blog-item">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleDetails} className="view-button">view</button>
      </div>
      <div style={showWhenVisible} className="blog-details">
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike} className="like-button">like</button>
        </div>
        {/* Kullanıcı bilgisi mevcutsa göster */}
        <div>{blog.user ? blog.user.name : 'Unknown'}</div>
        {showDeleteButton && <button onClick={handleDelete} className="delete-button">remove</button>}
      </div>
    </div>
  )
}

// PropTypes tanımlamaları
Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    // user alanı da object veya string olabilir, duruma göre ayarlayın
    user: PropTypes.oneOfType([
      PropTypes.shape({
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
      PropTypes.string, // Backend sadece id döndürebilir
    ]).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string, // id bazen olmayabilir, isteğe bağlı yapın
  }),


}



export default Blog



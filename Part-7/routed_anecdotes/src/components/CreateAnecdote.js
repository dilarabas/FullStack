import React from 'react'
import { useField } from '../hooks/useField'

const CreateAnecdote = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  // reset prop'u inputa verilmez, burada spread'den reset çıkarıyoruz
  const omitReset = ({ reset, ...rest }) => rest

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...omitReset(content)} />
        </div>
        <div>
          author
          <input {...omitReset(author)} />
        </div>
        <div>
          url for more info
          <input {...omitReset(info)} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateAnecdote

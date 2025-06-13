import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/queries'  // dosya yolunu kendi yapına göre kontrol et

const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (loading) return <div>Loading books...</div>
  if (error) return <div>Error fetching books: {error.message}</div>

  if (!data || !data.allBooks || data.allBooks.length === 0) {
    return <div>No books found</div>
  }

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data.allBooks.map((book) => (
          <li key={book.title}>
            <b>{book.title}</b> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Books

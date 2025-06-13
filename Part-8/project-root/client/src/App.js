import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import SetBirthYear from './components/SetBirthYear'

const App = () => {
  const [page, setPage] = useState('authors')
  const token = null // ya da gerçek token değeri

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Yazarlar</button>
        <button onClick={() => setPage('books')}>Kitaplar</button>
        <button onClick={() => setPage('add')}>Kitap Ekle</button>
        <button onClick={() => setPage('setBirth')}>Doğum Yılı Ayarla</button>
      </div>

      {page === 'authors' && <Authors show={true} token={token} />}
      {page === 'books' && <Books show={true} />}
      {page === 'add' && <NewBook show={true} />}
      {page === 'setBirth' && <SetBirthYear show={true} />}
    </div>
  )
}

export default App

import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

import AnecdoteList from './components/AnecdoteList'
import CreateAnecdote from './components/CreateAnecdote'
import Anecdote from './components/Anecdote'
import Footer from './components/Footer'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      id: '1',
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
    },
    {
      id: '2',
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
    },
  ])

  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote "${anecdote.content}" created!`)
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Navigation />
        <Notification message={notification} />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateAnecdote addNew={addNew} />} />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

const Navigation = () => {
  const style = {
    padding: 5,
  }
  return (
    <div>
      <Link style={style} to="/">
        anecdotes
      </Link>
      <Link style={style} to="/create">
        create new
      </Link>
      <Link style={style} to="/about">
        about
      </Link>
    </div>
  )
}

export default App

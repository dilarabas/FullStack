import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN)

  const submit = async (event) => {
    event.preventDefault()
    const { data } = await login({ variables: { username, password } })
    setToken(data.login.value)
    localStorage.setItem('library-user-token', data.login.value)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Username</label>
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm

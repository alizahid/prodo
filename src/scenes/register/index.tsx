import React, { FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'

import { Form, Main } from './components'

export const Register: FunctionComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Main>
      <Form>
        <label>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <p>
          <button>Register</button>
          <Link to="/login">Login</Link>
        </p>
      </Form>
    </Main>
  )
}

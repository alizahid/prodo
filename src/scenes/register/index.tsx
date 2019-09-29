import React, { FunctionComponent, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Spinner } from '../../components'
import { useStoreActions, useStoreState } from '../../store'
import { Form, Main } from './components'

export const Register: FunctionComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { register } = useStoreActions(state => state.state)
  const { loading, user } = useStoreState(state => state.state)

  if (user) {
    return <Redirect to="/snippets" />
  }

  return (
    <Main>
      <Form
        onSubmit={event => {
          event.preventDefault()

          if (email && password) {
            register({
              email,
              password
            })
          }
        }}>
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
          <button>{loading ? <Spinner small /> : 'Register'}</button>
          <Link to="/login">Login</Link>
        </p>
      </Form>
    </Main>
  )
}

import React, { FunctionComponent, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Spinner } from '../../components'
import { useStoreActions, useStoreState } from '../../store'
import { Form, Main } from './components'

export const ResetPassword: FunctionComponent = () => {
  const [email, setEmail] = useState('')

  const { resetPassword } = useStoreActions(state => state.state)
  const { loading, user } = useStoreState(state => state.state)

  if (user) {
    return <Redirect to="/snippets" />
  }

  return (
    <Main>
      <Form
        onSubmit={event => {
          event.preventDefault()

          if (email) {
            resetPassword(email)
          }
        }}>
        <label>
          <input
            onChange={event => setEmail(event.target.value)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />
        </label>
        <p>
          <button>{loading ? <Spinner tiny /> : 'Submit'}</button>
          <Link to="/login">Login</Link>
        </p>
      </Form>
    </Main>
  )
}

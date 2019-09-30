import React, { FunctionComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { prodo } from '../../assets'
import { useStoreActions, useStoreState } from '../../store'
import { Content, Header, Heading, Logo, Main } from './components'
import { Spinner } from '../../components'

export const Landing: FunctionComponent = () => {
  const { loginAnonymously } = useStoreActions(actions => actions.state)
  const { loading, user } = useStoreState(state => state.state)

  if (user) {
    return <Redirect to="/snippets" />
  }

  return (
    <Main>
      <Header>
        <Logo src={prodo} alt="Prodo" />
        <Heading>Prodo</Heading>
      </Header>
      <p>Snippets manager</p>
      {loading && <Spinner dark small />}
      {!loading && (
        <>
          <Content>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </Content>
          <Content>
            <Link to="/reset-password">Forgot password?</Link>
            <Link to="#" onClick={() => loginAnonymously()}>
              Later
            </Link>
          </Content>
        </>
      )}
    </Main>
  )
}

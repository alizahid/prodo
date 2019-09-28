import React, { FunctionComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { prodo } from '../../assets'
import { useStoreActions, useStoreState } from '../../store'
import { Content, Header, Heading, Logo, Main } from './components'

export const Landing: FunctionComponent = () => {
  const { loginAnonymously } = useStoreActions(actions => actions.state)
  const { user } = useStoreState(state => state.state)

  if (user) {
    return <Redirect to="/snippets" />
  }

  return (
    <Main>
      <Header>
        <Logo src={prodo} alt="Prodo" />
        <Heading>Prodo</Heading>
      </Header>
      <p>Code and text snippets</p>
      <Content>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="#" onClick={() => loginAnonymously()}>
          Later
        </Link>
      </Content>
    </Main>
  )
}

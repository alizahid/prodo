import React, { FunctionComponent, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Button, Spinner } from '../../components'
import { useStoreActions, useStoreState } from '../../store'
import { Content, Footer, Form, Main, SideBar } from './components'

export const Settings: FunctionComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { link, logout } = useStoreActions(state => state.state)
  const { loading, user } = useStoreState(state => state.state)

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <Main>
      <Content>
        <p>
          {user.isAnonymous
            ? `You're not logged in.`
            : `You're logged as ${user.email}`}
        </p>
        {user.isAnonymous && (
          <>
            <p>
              Link your account so you can access your snippets from other
              places.
            </p>
            <Form
              onSubmit={event => {
                event.preventDefault()

                if (email && password) {
                  link({
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
                <button>{loading ? <Spinner small /> : 'Link'}</button>
              </p>
            </Form>
          </>
        )}
        <Footer>
          <p>
            <Button label="Logout" loading={loading} onClick={() => logout()} />
          </p>
        </Footer>
      </Content>
      <SideBar>
        <h2>Prodo</h2>
        <p>Prodo is a snippets manager for your code and text.</p>
        <p>It's open-source and build using React, TypeScript, and Firebase.</p>
        <p>
          You can read about it on&nbsp;
          <a
            href="https://alizahid.dev/blog/prodo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={event => {
              event.preventDefault()

              if (window.require) {
                window
                  .require('electron')
                  .shell.openExternal('https://alizahid.dev/blog/prodo')
              }
            }}>
            my blog
          </a>
          .
        </p>
        <p>
          And you can find the&nbsp;
          <a
            href="https://github.com/alizahid/prodo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={event => {
              event.preventDefault()

              if (window.require) {
                window
                  .require('electron')
                  .shell.openExternal('https://github.com/alizahid/prodo')
              }
            }}>
            source code
          </a>
          &nbsp;on GitHub.
        </p>
      </SideBar>
    </Main>
  )
}

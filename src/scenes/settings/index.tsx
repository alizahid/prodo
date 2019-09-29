import React, { FunctionComponent, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Button, Spinner } from '../../components'
import { confirmDialog, openUrl } from '../../lib/electron'
import { useStoreActions, useStoreState } from '../../store'
import { Content, Footer, Form, Main, SideBar } from './components'

export const Settings: FunctionComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { link, logout } = useStoreActions(state => state.state)
  const { snippets } = useStoreState(state => state.snippets)
  const { loading, loggingOut, user } = useStoreState(state => state.state)

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
                <button>{loading ? <Spinner tiny /> : 'Link'}</button>
              </p>
            </Form>
          </>
        )}
        <Footer>
          <p>
            <Button
              label="Logout"
              loading={loggingOut}
              onClick={async () => {
                if (user.isAnonymous && snippets.length > 0) {
                  const yes = await confirmDialog(
                    `Are you sure you want to logout? You haven't linked your account with an email and password and you'll lose your data once you logout.`
                  )

                  if (yes) {
                    logout(true)
                  }
                } else {
                  logout(user.isAnonymous && snippets.length === 0)
                }
              }}
            />
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
            rel="noopener noreferrer"
            target="_blank"
            onClick={event =>
              openUrl('https://alizahid.dev/blog/prodo', event)
            }>
            my blog
          </a>
          .
        </p>
        <p>
          And you can find the&nbsp;
          <a
            href="https://github.com/alizahid/prodo"
            rel="noopener noreferrer"
            target="_blank"
            onClick={event =>
              openUrl('https://github.com/alizahid/prodo', event)
            }>
            source code
          </a>
          &nbsp;on GitHub.
        </p>
      </SideBar>
    </Main>
  )
}

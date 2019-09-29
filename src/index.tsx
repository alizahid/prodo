import 'firebase/auth'
import 'firebase/firestore'

import './index.scss'

import { StoreProvider } from 'easy-peasy'
import { auth, initializeApp } from 'firebase/app'
import React, { FunctionComponent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import { Spinner, TitleBar } from './components'
import { config } from './lib/firebase'
import { Landing, Login, Register, Settings, Snippets } from './scenes'
import * as serviceWorker from './serviceWorker'
import createStore from './store'

initializeApp(config())

auth().setPersistence(auth.Auth.Persistence.LOCAL)

const store = createStore()

store.getActions().state.init()

const App: FunctionComponent = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    auth().onAuthStateChanged(() => setReady(true))
  }, [])

  if (!ready) {
    return <Spinner />
  }

  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <TitleBar />
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/snippets" component={Snippets} />
        <Route path="/settings" component={Settings} />
      </BrowserRouter>
    </StoreProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()

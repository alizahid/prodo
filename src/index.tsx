import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import { Landing } from './scenes'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" exact component={Landing} />
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()

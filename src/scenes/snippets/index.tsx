import React, { FunctionComponent, useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'

import { List } from '../../components'
import { useStoreActions, useStoreState } from '../../store'
import { Create } from '../create'
import { Snippet } from '../snippet'
import { Main } from './components'

export const Snippets: FunctionComponent<RouteComponentProps> = ({
  location: { pathname },
  history
}) => {
  const { fetch } = useStoreActions(actions => actions.snippets)
  const { loading, snippets } = useStoreState(state => state.snippets)
  const { user } = useStoreState(state => state.state)

  useEffect(() => {
    if (user) {
      fetch()
    }
  }, [user, fetch])

  useEffect(() => {
    if (pathname === '/snippets') {
      if (snippets.length > 0) {
        history.push(`/snippets/${snippets[0].id}`)
      } else if (!loading) {
        history.push('/snippets/new')
      }
    }
  }, [loading, snippets, pathname, history])

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <Main>
      <List loading={loading} snippets={snippets} />
      <Switch>
        <Route path="/snippets/new" component={Create} />
        <Route path="/snippets/:id" component={Snippet} />
      </Switch>
    </Main>
  )
}

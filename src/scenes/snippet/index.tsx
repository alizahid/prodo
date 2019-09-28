import moment from 'moment'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Form, Spinner } from '../../components'
import { useStoreActions, useStoreState } from '../../store'
import { Snippet as SnippetInterface } from '../../store/models/snippets'
import { Main, SideBar } from './components'

interface Props {
  id: string
}

export const Snippet: FunctionComponent<RouteComponentProps<Props>> = ({
  match: {
    params: { id }
  }
}) => {
  const [snippet, setData] = useState<SnippetInterface>()

  const { setSnippet } = useStoreActions(actions => actions.state)
  const { loading, snippets } = useStoreState(state => state.snippets)

  useEffect(() => {
    const snippet = snippets.find(snippet => snippet.id === id)

    if (snippet) {
      setSnippet(id)
      setData(snippet)
    }

    return () => {
      setSnippet(undefined)
    }
  }, [id, snippets, setSnippet])

  if (loading) {
    return <Spinner />
  }

  return (
    <Main>
      <Form snippet={snippet} />
      {snippet && (
        <SideBar>
          <h3>Created</h3>
          <p>{moment(snippet.createdAt).fromNow()}</p>
          <h3>Updated</h3>
          <p>{moment(snippet.updatedAt).fromNow()}</p>
        </SideBar>
      )}
    </Main>
  )
}

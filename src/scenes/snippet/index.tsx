import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Form, Spinner } from '../../components'
import { useStoreActions, useStoreState } from '../../store'
import { Snippet as SnippetInterface } from '../../store/models/snippets'
import { Main } from './components'

interface Props {
  id: string
}

export const Snippet: FunctionComponent<RouteComponentProps<Props>> = ({
  history,
  match: {
    params: { id }
  }
}) => {
  const [snippet, setData] = useState<SnippetInterface>()

  const { setSnippetId } = useStoreActions(actions => actions.state)
  const { remove, update } = useStoreActions(actions => actions.snippets)
  const { loading, removing, saving, snippets } = useStoreState(
    state => state.snippets
  )

  useEffect(() => {
    const snippet = snippets.find(snippet => snippet.id === id)

    if (snippet) {
      setSnippetId(id)
      setData(snippet)
    } else if (!loading) {
      setSnippetId(null)

      history.replace('/snippets/new')
    }
  }, [id, loading, snippets, setSnippetId, history])

  if (loading) {
    return <Spinner small />
  }

  return (
    <Main>
      <Form
        snippet={snippet}
        saving={saving}
        removing={removing}
        onRemove={async id => {
          await remove(id)

          history.replace('/snippets/new')
        }}
        onUpdate={(title, content, tags) =>
          update({
            id,
            data: {
              content,
              tags,
              title
            }
          })
        }
      />
    </Main>
  )
}

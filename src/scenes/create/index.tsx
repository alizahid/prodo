import React, { FunctionComponent, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import { Form } from '../../components'
import { useStoreActions, useStoreState } from '../../store'
import { Main } from './components'

export const Create: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { create } = useStoreActions(actions => actions.snippets)
  const { setSnippetId } = useStoreActions(actions => actions.state)
  const { saving } = useStoreState(state => state.snippets)
  const { snippetId } = useStoreState(state => state.state)

  useEffect(() => {
    if (snippetId) {
      setSnippetId(null)
    }
  }, [snippetId, setSnippetId])

  return (
    <Main>
      <Form
        saving={saving}
        onCreate={async (title, content, tags) => {
          const id = await create({
            content,
            tags,
            title
          })

          history.push(`/snippets/${id}`)
        }}
      />
    </Main>
  )
}

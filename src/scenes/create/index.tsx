import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router'

import { Form } from '../../components'
import { useStoreActions, useStoreState } from '../../store'
import { Main } from './components'

export const Create: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { create } = useStoreActions(actions => actions.snippets)
  const { saving } = useStoreState(state => state.snippets)

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

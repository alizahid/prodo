import React, { FunctionComponent } from 'react'
import { useHistory, useLocation } from 'react-router'

import { img_settings } from '../../assets'
import { useStoreState } from '../../store'
import { Action, ActionBar, Header, Title } from './components'

export const TitleBar: FunctionComponent = () => {
  const { user } = useStoreState(state => state.state)

  const { push } = useHistory()
  const { pathname } = useLocation()

  const settings = pathname === '/settings'

  return (
    <Header>
      <Title>{settings ? 'Settings' : 'Prodo'}</Title>
      {user && (
        <ActionBar right>
          <Action
            icon={img_settings}
            onClick={() => push(settings ? '/snippets' : '/settings')}
          />
        </ActionBar>
      )}
    </Header>
  )
}

import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

import { img_settings } from '../../assets'
import { useStoreState } from '../../store'
import { Action, ActionBar, Header, Title } from './components'

export const TitleBar: FunctionComponent = () => {
  const { user } = useStoreState(state => state.state)

  const { pathname } = useLocation()

  const settings = pathname === '/settings'

  return (
    <Header>
      <Title>{settings ? 'Settings' : 'Prodo'}</Title>
      {user && (
        <ActionBar right>
          <Link to={settings ? '/snippets' : '/settings'}>
            <Action icon={img_settings} />
          </Link>
        </ActionBar>
      )}
    </Header>
  )
}

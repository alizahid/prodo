import React, { FunctionComponent } from 'react'

import { Loading, Main } from './components'

interface Props {
  dark?: boolean
  small?: boolean
  tiny?: boolean
}

export const Spinner: FunctionComponent<Props> = ({ dark, small, tiny }) => {
  return (
    <Main>
      <Loading dark={dark} small={small} tiny={tiny} />
    </Main>
  )
}

import React, { FunctionComponent } from 'react'

import { Loading, Main } from './components'

interface Props {
  light?: boolean
  small?: boolean
  tiny?: boolean
}

export const Spinner: FunctionComponent<Props> = ({ light, small, tiny }) => {
  return (
    <Main>
      <Loading light={light} small={small} tiny={tiny} />
    </Main>
  )
}

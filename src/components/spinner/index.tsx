import React, { FunctionComponent } from 'react'

import { Loading, Main } from './components'

interface Props {
  light?: boolean
  small?: boolean
}

export const Spinner: FunctionComponent<Props> = ({ light, small }) => {
  return (
    <Main>
      <Loading light={light} small={small} />
    </Main>
  )
}

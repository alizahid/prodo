import React, { FunctionComponent } from 'react'

import { Loading, Main } from './components'

export const Spinner: FunctionComponent = () => {
  return (
    <Main>
      <Loading />
    </Main>
  )
}

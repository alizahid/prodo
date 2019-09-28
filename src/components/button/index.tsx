import React, { FunctionComponent } from 'react'

import { Main } from './components'

interface Props {
  label: string
}

export const Button: FunctionComponent<Props> = ({ label }) => {
  return <Main>{label}</Main>
}

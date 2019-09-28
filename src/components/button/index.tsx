import React, { FunctionComponent } from 'react'

import { Main } from './components'

interface Props {
  label: string
  light?: boolean
}

export const Button: FunctionComponent<Props> = ({ label, light }) => {
  return <Main light={light}>{label}</Main>
}

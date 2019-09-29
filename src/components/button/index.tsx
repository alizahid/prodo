import React, { FunctionComponent } from 'react'

import { Spinner } from '../spinner'
import { Main } from './components'

interface Props {
  ghost?: boolean
  label: string
  light?: boolean
  loading?: boolean

  onClick: () => void
}

export const Button: FunctionComponent<Props> = ({
  ghost,
  label,
  light,
  loading,
  onClick
}) => {
  return (
    <Main ghost={ghost} light={light} onClick={onClick}>
      {!loading && label}
      {loading && <Spinner light={ghost ? !light : light} tiny />}
    </Main>
  )
}

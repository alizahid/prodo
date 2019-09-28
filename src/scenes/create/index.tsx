import React, { FunctionComponent } from 'react'

import { Form } from '../../components'
import { Main, SideBar } from './components'

export const Create: FunctionComponent = () => {
  return (
    <Main>
      <Form />
      <SideBar>foo</SideBar>
    </Main>
  )
}

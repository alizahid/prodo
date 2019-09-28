import React, { FunctionComponent } from 'react'

import { Form, Button } from '../../components'
import { Main, SideBar } from './components'

export const Create: FunctionComponent = () => {
  return (
    <Main>
      <Form />
      <SideBar>
        <p>
          <Button label="Save" light />
        </p>
      </SideBar>
    </Main>
  )
}

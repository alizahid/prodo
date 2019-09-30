import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.main`
  align-items: center;
  background: ${colors.background};
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`

export const Form = styled.form`
  p {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
`

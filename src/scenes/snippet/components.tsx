import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.section`
  display: flex;
  flex: 1;
`

export const SideBar = styled.aside`
  color: ${colors.background};
  min-width: 15em;
  padding: 1em 2em;

  h3 {
    font-size: 1em;

    &:not(:first-child) {
      margin-top: 2em;
    }
  }
`

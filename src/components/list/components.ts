import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.nav`
  display: flex;
  flex-direction: column;
  min-width: 15em;

  a {
    color: ${colors.background};
    padding: 1em;

    &.active {
      background: ${colors.background};
      color: ${colors.foreground};
    }
  }
`

export const Header = styled.header`
  align-items: center;
  display: flex;

  h2 {
    color: ${colors.background};
    flex: 1;
    font-size: 1em;
    margin: 0;
    padding: 1em;
  }

  img {
    height: 1em;
    width: 1em;
  }
`

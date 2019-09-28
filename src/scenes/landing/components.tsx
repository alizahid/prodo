import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.main`
  align-items: center;
  background: ${colors.background};
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;

  p {
    color: ${colors.foregroundLight};
  }
`

export const Header = styled.header`
  align-items: center;
  display: flex;
`

export const Logo = styled.img`
  height: 3em;
  margin-right: 1em;
  width: 3em;
`

export const Heading = styled.h1`
  color: ${colors.accent};
  font-size: 2em;
  font-weight: 500;
  margin: 0;
`

export const Content = styled.section`
  display: flex;
  margin-top: 2em;

  a {
    background: ${colors.accent};
    border-radius: 0.25em;
    color: ${colors.background};
    padding: 1em;
    margin-left: 2em;

    &:last-child {
      background: none;
      color: ${colors.accent};
    }
  }
`

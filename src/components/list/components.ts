import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.nav`
  display: flex;
  flex-direction: column;
  width: 15em;
  height: calc(100vh - 3em);
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
    margin: 1em;
    width: 1em;
  }
`

export const Search = styled.aside`
  align-items: center;
  background: ${colors.accentDark};
  display: flex;

  input {
    appearance: none;
    background: none;
    border: none;
    color: ${colors.background};
    font: inherit;
    padding: 1em;
    width: 12em;

    &::placeholder {
      color: ${colors.backgroundDarker};
    }
  }

  button {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;

    img {
      cursor: pointer;
      height: 1em;
      margin: 1em;
      width: 1em;
    }
  }
`

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  position: relative;

  a {
    color: ${colors.background};
    font-size: 0.875em;
    line-height: 1.4;
    padding: 0.875em 1em;

    &:not(:first-child) {
      border-top: 1px solid ${colors.accentDark};
    }

    &.active {
      background: ${colors.background};
      color: ${colors.foreground};
    }
  }
`

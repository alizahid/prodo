import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.main`
  display: flex;
  flex: 1;
`

export const Content = styled.section`
  background: ${colors.background};
  border-top-right-radius: 0.5em;
  flex: 1;
  height: calc(100vh - 3em);
  overflow: auto;
  padding: 1em 2em;

  h3 {
    margin: 2em 0 0;
  }
`

export const Form = styled.form`
  input {
    max-width: 15em;
  }

  &.key {
    input {
      max-width: 20em;
    }
  }
`

export const SideBar = styled.aside`
  color: ${colors.background};
  display: flex;
  flex-direction: column;
  padding: 1em 2em;
  width: 20em;

  h2 {
    font-size: 1em;
  }

  a {
    color: ${colors.backgroundDarkest};

    &:hover {
      color: ${colors.backgroundDark};
    }
  }
`

export const Footer = styled.footer`
  margin-top: auto;

  button {
    width: 100%;
  }
`

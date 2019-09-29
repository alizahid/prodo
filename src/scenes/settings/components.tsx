import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.main`
  display: flex;
  flex: 1;
`

export const Content = styled.section`
  background: ${colors.background};
  border-top-right-radius: 0.5em;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1em 2em;
`

export const Form = styled.form`
  max-width: 15em;
`

export const Footer = styled.footer`
  margin-top: auto;
`

export const SideBar = styled.aside`
  color: ${colors.background};
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

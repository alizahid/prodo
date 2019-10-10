import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.form`
  background: ${colors.background};
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  color: ${colors.foreground};
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1em 2em;
`

export const Content = styled.label`
  flex: 1;

  textarea {
    font: normal 1em/1.6 'IBM Plex Mono', source-code-pro, Menlo, Monaco,
      Consolas, 'Courier New', monospace;
    height: 100%;
    resize: none;
  }
`

export const SideBar = styled.aside`
  color: ${colors.background};
  display: flex;
  flex-direction: column;
  width: 3em;
`

export const SideBarActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  button {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    width: 3em;

    img {
      height: 1.5em;
      margin: 0.75em;
      width: 1.5em;
    }
  }
`

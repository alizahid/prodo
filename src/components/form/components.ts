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
    height: calc(100% - 2em);
    resize: none;
  }
`
import styled, { css } from 'styled-components'

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

interface SideBarProps {
  fixed?: boolean
  visible: boolean
}

export const SideBar = styled.aside<SideBarProps>`
  color: ${colors.background};
  display: flex;
  flex-direction: column;
  min-width: 15em;
  margin-right: ${props => (props.visible ? '-12em' : 0)};
  position: relative;
  transition: 0.2s;

  button {
    width: 100%;
  }

  h3 {
    font-size: 1em;
    margin-top: 2em;
  }

  p {
    color: ${colors.backgroundDarker};
  }
`

export const SideBarContent = styled.section<SideBarProps>`
  opacity: ${props => (props.visible ? 0 : 1)};
  padding: 1em 2em;
  transition: 0.2s;
`

export const SideBarActions = styled.div<SideBarProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: 0.2s;

  ${props =>
    props.fixed &&
    css`
      left: 0;
      position: absolute;
      top: 1em;
    `}

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
      transition: 0.2s;
      width: 1.5em;

      &.closed {
        transform: rotate(180deg);
      }
    }
  }
`

export const SideBarFooter = styled.section`
  margin-top: auto;
`

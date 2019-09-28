import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Header = styled.header`
  -webkit-app-region: drag;
  align-items: center;
  color: ${colors.background};
  display: flex;
  height: 3em;
  justify-content: center;
  margin: 0 -1em;
  position: relative;
`

interface ActionBarProps {
  left?: boolean
  right?: boolean
}

export const ActionBar = styled.section<ActionBarProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  left: ${props => (props.left ? '1em' : 'auto')};
  position: absolute;
  right: ${props => (props.right ? '1em' : 'auto')};
`

interface ActionProps {
  icon: string
}

export const Action = styled.button<ActionProps>`
  appearance: none;
  background: url(${props => props.icon}) center no-repeat;
  background-size: 1.5em;
  border: none;
  cursor: pointer;
  font: inherit;
  height: 3em;
  transition: 0.2s;
  width: 3em;

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    filter: brightness(0.8);
  }
`

export const Title = styled.h1`
  font-size: 1em;
  font-weight: 500;
`

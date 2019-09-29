import styled from 'styled-components'

import { colors } from '../../assets/styles'

interface Props {
  ghost?: boolean
  light?: boolean
}

export const Main = styled.button<Props>`
  appearance: none;
  background: ${props =>
    props.ghost
      ? 'transparent'
      : props.light
      ? colors.background
      : colors.accent};
  border-radius: 0.25em;
  border: ${props =>
    props.ghost
      ? `2px solid ${props.light ? colors.background : colors.accent}`
      : 'none'};
  color: ${props =>
    props.light
      ? props.ghost
        ? colors.background
        : colors.accent
      : props.ghost
      ? colors.accent
      : colors.background};
  cursor: pointer;
  font: inherit;
  line-height: normal;
  min-width: 10em;
  padding: 1em;
  transition: 0.2s;

  &:hover {
    font-weight: 600;
  }

  &:active {
    font-weight: bold;
  }
`

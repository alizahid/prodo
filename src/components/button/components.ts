import styled from 'styled-components'

import { colors } from '../../assets/styles'

interface Props {
  light?: boolean
}

export const Main = styled.button<Props>`
  appearance: none;
  background: ${props => (props.light ? colors.background : colors.accent)};
  border-radius: 0.25em;
  border: none;
  color: ${props => (props.light ? colors.accent : colors.background)};
  cursor: pointer;
  font: inherit;
  line-height: normal;
  padding: 1em;
  transition: 0.2s;

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    filter: brightness(0.8);
  }
`

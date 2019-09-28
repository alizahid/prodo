import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.button`
  appearance: none;
  background: ${colors.accent};
  color: ${colors.background};
  cursor: pointer;
  font: inherit;
  padding: 1em;
  transition: 0.2s;

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    filter: brightness(0.8);
  }
`

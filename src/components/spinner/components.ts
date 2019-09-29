import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

interface Props {
  light?: boolean
  small?: boolean
}

export const Loading = styled.div<Props>`
  animation: spinner 1s linear infinite;
  border-radius: 100%;
  border: 2px solid
    ${props => (props.light ? colors.accent : colors.background)};
  border-top-color: transparent;
  height: ${props => (props.small ? '1.25em' : '2em')};
  margin: ${props => (props.small ? 0 : '2em')};
  width: ${props => (props.small ? '1.25em' : '2em')};

  @keyframes spinner {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
`

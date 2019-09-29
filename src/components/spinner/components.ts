import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

interface Props {
  dark?: boolean
  small?: boolean
  tiny?: boolean
}

export const Loading = styled.div<Props>`
  animation: spinner 1s linear infinite;
  border-radius: 100%;
  border: 2px solid ${props => (props.dark ? colors.accent : colors.background)};
  border-top-color: transparent;
  height: ${props => (props.small || props.tiny ? '1.25em' : '2em')};
  margin: ${props => (props.tiny ? 0 : props.small ? '1em' : '2em')};
  width: ${props => (props.small || props.tiny ? '1.25em' : '2em')};

  @keyframes spinner {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
`

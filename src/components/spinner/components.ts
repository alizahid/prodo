import styled from 'styled-components'

import { colors } from '../../assets/styles'

export const Main = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

export const Loading = styled.div`
  animation: spinner 1s linear infinite;
  border-radius: 100%;
  border: 2px solid ${colors.background};
  border-top-color: transparent;
  height: 2em;
  margin: 2em;
  width: 2em;

  @keyframes spinner {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
`

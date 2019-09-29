import styled from 'styled-components'

import { img_remove } from '../../assets'
import { colors } from '../../assets/styles'

export const Main = styled.section`
  align-items: center;
  background: ${colors.backgroundDark};
  border-radius: 0.25em;
  display: flex;
  flex-wrap: wrap;

  input {
    background: none;
    flex: 1;
    margin: 0.5em;
    min-width: 10em;
    padding: 0.5em;
  }
`

export const Tag = styled.article`
  align-items: center;
  background: ${colors.background};
  display: flex;
  border-radius: 0.25em;
  padding: 0.5em;
  margin: 0.5em;

  &:after {
    background: url(${img_remove}) center no-repeat;
    content: '';
    cursor: pointer;
    height: 1em;
    margin-left: 0.5em;
    width: 1em;
  }
`

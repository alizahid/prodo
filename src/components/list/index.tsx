import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import { img_add } from '../../assets'
import { useStoreState } from '../../store'
import { Snippet } from '../../store/models/snippets'
import { Spinner } from '../spinner'
import { Header, Main } from './components'

interface Props {
  loading: boolean
  snippets: Snippet[]
}

export const List: FunctionComponent<Props> = ({ loading, snippets }) => {
  const { snippet } = useStoreState(state => state.state)

  return (
    <Main>
      <Header>
        <h2>Snippets</h2>
        <Link to="/snippets/new">
          <img src={img_add} alt="New" />
        </Link>
      </Header>
      {loading && <Spinner />}
      {snippets.map(({ id, title }) => (
        <Link key={id} className={snippet && 'active'} to={`/snippets/${id}`}>
          {title}
        </Link>
      ))}
    </Main>
  )
}
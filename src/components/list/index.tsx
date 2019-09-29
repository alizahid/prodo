import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { img_add, img_clear } from '../../assets'
import { findById, inView } from '../../lib/helpers'
import { useStoreState } from '../../store'
import { Snippet } from '../../store/models/snippets'
import { Spinner } from '../spinner'
import { Content, Header, Main, Search } from './components'

interface Props {
  loading: boolean
  snippets: Snippet[]
}

export const List: FunctionComponent<Props> = ({ loading, snippets }) => {
  const list = useRef<HTMLElement>(null)

  const [query, setQuery] = useState('')

  const { snippetId } = useStoreState(state => state.state)

  useEffect(() => {
    if (snippetId && list.current && !loading) {
      const element = findById(list.current, `snippet-${snippetId}`)

      if (element) {
        if (inView(element)) {
          return
        }

        const { offsetTop } = element

        list.current.scrollTo({
          top: offsetTop - 50
        })
      }
    }
  }, [snippetId, loading])

  const data = snippets.filter(({ content, tags, title }) => {
    if (!query) {
      return true
    }

    const regex = new RegExp(query, 'i')

    return (
      content.match(regex) || tags.join().match(regex) || title.match(regex)
    )
  })

  return (
    <Main>
      <Header>
        <h2>Snippets</h2>
        <Link to="/snippets/new">
          <img src={img_add} alt="New" />
        </Link>
      </Header>
      <Search>
        <input
          onChange={event => setQuery(event.target.value)}
          placeholder="Search"
          type="text"
          value={query}
        />
        {query.length > 0 && (
          <button onClick={() => setQuery('')}>
            <img src={img_clear} alt="Clear" />
          </button>
        )}
      </Search>
      {loading && <Spinner small />}
      {!loading && (
        <Content ref={list}>
          {data.map(({ id, title }) => (
            <Link
              key={id}
              id={`snippet-${id}`}
              className={snippetId === id ? 'active' : ''}
              to={`/snippets/${id}`}>
              {title}
            </Link>
          ))}
        </Content>
      )}
    </Main>
  )
}

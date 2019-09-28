import React, { FunctionComponent, useEffect, useState } from 'react'

import { Snippet } from '../../store/models/snippets'
import { TagsInput } from '../tags-input'
import { Content, Main } from './components'

interface Props {
  snippet?: Snippet
}

export const Form: FunctionComponent<Props> = ({ snippet }) => {
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (snippet) {
      const { content, tags, title } = snippet

      setContent(content)
      setTags(tags)
      setTitle(title)
    }
  }, [snippet])

  return (
    <Main>
      <label>
        <span>Title</span>
        <input
          onChange={event => setTitle(event.target.value)}
          placeholder="Copy excluding node_modules"
          type="text"
          value={title}
        />
      </label>
      <Content>
        <span>Content</span>
        <textarea
          autoCapitalize="never"
          autoCorrect="never"
          onChange={event => setContent(event.target.value)}
          placeholder="rsync -r --exclude 'node_modules' source target"
          value={content}
        />
      </Content>
      <TagsInput
        tags={tags}
        onAdd={tag => {
          setTags([...tags, tag])
        }}
        onRemove={index => {
          const copy = [...tags]

          copy.splice(index, 1)

          setTags(copy)
        }}
      />
    </Main>
  )
}

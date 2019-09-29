import React, { FunctionComponent, useState } from 'react'

import { Main, Tag } from './components'

interface Props {
  tags: string[]

  onAdd: (tag: string) => void
  onRemove: (index: number) => void
}

export const TagsInput: FunctionComponent<Props> = ({
  tags,
  onAdd,
  onRemove
}) => {
  const [tag, setTag] = useState('')

  return (
    <label>
      <span>Tags</span>
      <Main>
        {tags.map((tag, index) => (
          <Tag key={tag} onClick={() => onRemove(index)}>
            {tag}
          </Tag>
        ))}
        <input
          onChange={event =>
            setTag(event.target.value.replace(/([^\w\d-]+)/, '').toLowerCase())
          }
          onKeyDown={event => {
            if (event.keyCode === 13) {
              if (tag && !tags.includes(tag)) {
                onAdd(tag)
              }

              setTag('')
            } else if (
              event.keyCode === 8 &&
              tag.length === 0 &&
              tags.length > 0
            ) {
              onRemove(tags.length - 1)
            }
          }}
          placeholder="Label"
          type="text"
          value={tag}
        />
      </Main>
    </label>
  )
}

import React, { FunctionComponent, useEffect, useState } from 'react'

import { Snippet } from '../../store/models/snippets'
import { Button } from '../button'
import { TagsInput } from '../tags-input'
import { Content, Main, SideBar } from './components'

interface Props {
  removing?: boolean
  saving?: boolean
  snippet?: Snippet

  onCreate?: (title: string, content: string, tags: string[]) => void
  onRemove?: (id: string) => void
  onUpdate?: (title: string, content: string, tags: string[]) => void
}

export const Form: FunctionComponent<Props> = ({
  children,
  snippet,
  removing,
  saving,
  onCreate,
  onRemove,
  onUpdate
}) => {
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
    <>
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
      <SideBar>
        <p>
          <Button
            label="Save"
            light
            loading={saving}
            onClick={() => {
              if (title) {
                if (onCreate) {
                  onCreate(title, content, tags)
                } else if (onUpdate) {
                  onUpdate(title, content, tags)
                }
              }
            }}
          />
        </p>
        {snippet && (
          <p>
            <Button
              ghost
              light
              label="Delete"
              loading={removing}
              onClick={() => {
                const ask = window.confirm(
                  'Are you sure you want to delete this snippet?'
                )

                if (ask && onRemove) {
                  onRemove(snippet.id)
                }
              }}
            />
          </p>
        )}
        {children}
      </SideBar>
    </>
  )
}

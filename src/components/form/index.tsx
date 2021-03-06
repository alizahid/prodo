import React, { FunctionComponent, useEffect, useState } from 'react'

import { img_delete, img_save } from '../../assets'
import { confirmDialog } from '../../lib/electron'
import { Snippet } from '../../store/models/snippets'
import { TagsInput } from '../tags-input'
import { Content, Main, SideBar, SideBarActions } from './components'

interface Props {
  removing?: boolean
  saving?: boolean
  snippet?: Snippet

  onCreate?: (title: string, content: string, tags: string[]) => void
  onRemove?: (id: string) => void
  onUpdate?: (title: string, content: string, tags: string[]) => void
}

export const Form: FunctionComponent<Props> = ({
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

  const onSave = () => {
    if (title) {
      if (onCreate) {
        onCreate(title, content, tags)
      } else if (onUpdate) {
        onUpdate(title, content, tags)
      }
    }
  }

  const onDelete = async () => {
    if (snippet && onRemove) {
      const yes = await confirmDialog(
        'Are you sure you want to delete this snippet?'
      )

      if (yes) {
        onRemove(snippet.id)
      }
    }
  }

  return (
    <>
      <Main>
        <label>
          <input
            onChange={event => setTitle(event.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
        </label>
        <Content>
          <textarea
            autoCapitalize="never"
            autoCorrect="never"
            onChange={event => setContent(event.target.value)}
            placeholder="Content"
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
        <SideBarActions>
          <button onClick={onSave}>
            <img src={img_save} alt="Save" title="Save" />
          </button>
          {snippet && (
            <button onClick={onDelete}>
              <img src={img_delete} alt="Delete" title="Delete" />
            </button>
          )}
        </SideBarActions>
      </SideBar>
    </>
  )
}

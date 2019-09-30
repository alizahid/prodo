import { MouseEvent } from 'react'

const electron = window.require ? window.require('electron') : null

export const alertDialog = (message: string) => {
  if (electron) {
    electron.remote.dialog.showMessageBox({
      message,
      type: 'info'
    })
  } else {
    window.alert(message)
  }
}

export const confirmDialog = (message: string) => {
  return new Promise(async resolve => {
    if (electron) {
      const { response } = await electron.remote.dialog.showMessageBox({
        message,
        buttons: ['Yes', 'No'],
        type: 'question'
      })

      resolve(response === 0)
    } else {
      const ask = window.confirm(message)

      resolve(ask)
    }
  })
}

export const errorDialog = (message: string) => {
  if (electron) {
    electron.remote.dialog.showMessageBox({
      message,
      type: 'error'
    })
  } else {
    window.alert(message)
  }
}

export const openUrl = (url: string, event: MouseEvent) => {
  if (electron) {
    event.preventDefault()

    electron.shell.openExternal(url)
  }
}

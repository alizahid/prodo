const path = require('path')

const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const stateKeeper = require('electron-window-state')

let window

const createWindow = () => {
  const state = stateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  })

  const { height, width, x, y } = state

  window = new BrowserWindow({
    height,
    width,
    x,
    y,
    minHeight: 600,
    minWidth: 800,
    show: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true
    }
  })

  state.manage(window)

  window.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  window.on('ready-to-show', () => {
    window.show()
    window.focus()
  })

  window.on('closed', () => {
    window = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (window === null) {
    createWindow()
  }
})

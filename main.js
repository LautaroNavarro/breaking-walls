const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Breaking walls',
    titleBarStyle: 'hiddenInset',
    show: false,
    resizable: false,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: false
    }
  })

  win.loadFile('index.html')
  win.maximize();

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


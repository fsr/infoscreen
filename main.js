const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1200,
        fullscreen: true,
        autoHideMenuBar: true,
        darkTheme: true,
        frame: false,
        alwaysOnTop: true
    });

    mainWindow.loadURL("http://127.0.0.1:5000/")
    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})

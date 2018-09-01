const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
var mainWindow;

const { ipcMain } = require('electron');
const path = require('path')
const url = require('url')
let Tray = null;
const { webContents } = require('electron')
// console.log(webContents)
// ipcMain.on('city_name', (event, arg) => { console.log(arg); });


// ipcMain.on('set_city_name', (event, arg) => {
//   console.log("got somtehing from any renderer");
//   console.log(arg);
//   event.sender.send('reply', 'got it');
// });

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 360,
    height: 640,
    frame: false,
    resizable: false,
    icon: __dirname + '/app_icon.ico',
    title: "weather"
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'main-ui.html'),
    protocol: 'file:',
    slashes: true
  }));


  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    app.quit();
  });
}


app.on('ready', function () {
  createWindow();
});


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});


app.on('activate', function () {

  if (mainWindow === null) {
    createWindow();
  }

});
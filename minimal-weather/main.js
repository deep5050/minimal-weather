const electron = require('electron')
const fs = require('fs');
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
const ipc = require('electron').ipcMain

ipc.on('update_city', function (event, arg) {
  // update the settings.json file..
  let dataToWrite = {
    "api_key": '48ff1d472cdeee40ccb395bc03863b73',
    "city_name":arg
  };
  let dat = JSON.stringify(dataToWrite);
  console.log(dat);
  fs.writeFileSync('./settings.json', dat);
  mainWindow.webContents.send('update_city', {
  msg: arg
  });

})
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 360,
    height: 640,
    frame: false,
    resizable: false,
    fullscreen :false,
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
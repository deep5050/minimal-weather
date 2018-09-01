const { electron, app, BrowserWindow } = require('electron');
const { webContents } = require('electron');
const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');
const ipc = require('electron').ipcMain;
let mainWindow;
let Tray = null;



ipc.on('update_settings', function (event, settingsObj) {
  console.log(settingsObj);
  // update the settings.json file..
  // let dataToWrite = {
  //   "api_key": settingsObj.api_key,
  //   "city_name": settingsObj.city_name
  // };
  let dat = JSON.stringify(settingsObj);
  console.log(dat);
  fs.writeFileSync('./settings.json', dat);
  mainWindow.webContents.send('update_settings', settingsObj);

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
    app.quit();
    mainWindow = null;
  }
});


app.on('activate', function () {

  if (mainWindow === null) {
    createWindow();
  }

});
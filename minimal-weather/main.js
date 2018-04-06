const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let mainWindow, settingWindow;

const { ipcMain } = require('electron').ipcMain;
const path = require('path')
const url = require('url')
let Tray = null;


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




  // settingWindow = new BrowserWindow({
  //   width: 370,
  //   height: 600,
  //   frame: true,
  //   resizable: true,
  //   show: false,
  //   icon: __dirname + '/app_icon.ico'
  // });

  // settingWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));

  // settingWindow.webContents.openDevTools();



  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

function openSettings() {
  settingWindow.show();

}


app.on('ready', function () {
  createWindow();

});



app.on('window-all-closed', function () {

  // On OS X it is common for applications and their menu bar

  // to stay active until the user quits explicitly with Cmd + Q

  if (process.platform !== 'darwin') {

    app.quit()

  }

})



// document.onreadystatechange = function () {
//   if (document.readyState == "complete") {
//     init();
//   }
// };

app.on('activate', function () {

  if (mainWindow === null) {
    createWindow();
  }
});



// function closeButton(x) {
//   app.quit();
// }



// In this file you can include the rest of your app's specific main process

// code. You can also put them in separate files and require them here.
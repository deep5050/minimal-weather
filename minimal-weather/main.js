const electron = require('electron')
// const ipc = require('electron').ipc;

// Module to control application life.

const app = electron.app

// Module to create native browser window.

const BrowserWindow = electron.BrowserWindow



const path = require('path')

const url = require('url')



// Keep a global reference of the window object, if you don't, the window will

// be closed automatically when the JavaScript object is garbage collected.

var mainWindow;
let Tray = null;



function createWindow() {

  // Create the browser window.

  mainWindow = new BrowserWindow({
    width: 360,
    height: 640,
    frame: false,
    resizable: true,
    icon: __dirname + '/app_icon.ico'
  })
// uncomment this at the time of package building
  
  // mainWindow.setMenu(null);

  // and load the index.html of the app.

  mainWindow.loadURL(url.format({

    pathname: path.join(__dirname, 'main-ui.html'),

    protocol: 'file:',

    slashes: true

  }))

  // Emitted when the window is closed.

  mainWindow.on('closed', function () {

    // Dereference the window object, usually you would store windows

    // in an array if your app supports multi windows, this is the time

    // when you should delete the corresponding element.

    mainWindow = null

  })

}



// This method will be called when Electron has finished

// initialization and is ready to create browser windows.

// Some APIs can only be used after this event occurs.


function openSettings() {
  settingWindow.show()
  // console.log("open sttings");
  // var settingWindow = new BrowserWindow({
  //   width: 370,
  //   height: 600,
  //   frame: true,
  //   resizable: true,
  //   icon: __dirname + '/app_icon.ico'
  // });

  // settingWindow.loadURL(url.format({

  //   pathname: path.join(__dirname, 'index.html'),

  //   protocol: 'file:',

  //   slashes: true

  // }));
  // settingWindow.webContents.openDevTools();
}


app.on('ready', function () {
  createWindow();
  console.log("open sttings");
  var settingWindow = new BrowserWindow({
    width: 370,
    height: 600,
    frame: true,
    show: true,
    resizable: true,
    icon: __dirname + '/app_icon.ico'
  });

  settingWindow.loadURL(url.format({

    pathname: path.join(__dirname, 'index.html'),

    protocol: 'file:',

    slashes: true

  }));
  settingWindow.webContents.openDevTools();
  mainWindow.webContents.openDevTools();

})


// app.on('ready', () => {
//   tray = new Tray('./resources/app_icon.ico')
//   const contextMenu = Menu.buildFromTemplate([
//     { label: 'Item1', type: 'radio' },
//     { label: 'Item2', type: 'radio' },
//     { label: 'Item3', type: 'radio', checked: true },
//     { label: 'Item4', type: 'radio' }
//   ])
//   tray.setToolTip('This is my application.')
//   tray.setContextMenu(contextMenu)
// }

// )




// Quit when all windows are closed.

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

  // On OS X it's common to re-create a window in the app when the

  // dock icon is clicked and there are no other windows open.

  if (mainWindow === null) {

    createWindow()

  }

})



// function closeButton(x) {

//   // const window = remote.getCurrentWindow();
//   // window.close();
//   app.quit();
// }



// In this file you can include the rest of your app's specific main process

// code. You can also put them in separate files and require them here.

const { remote} = require('electron');
const shell = require('electron').shell;
const app = require('electron').remote.app;
const ipc = require('electron').ipcRenderer
const Menu = electron.Menu
// const ipcRenderer = require('electron').ipcRenderer;
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
var submit;
var city_name;


function runscript() {
  submit = document.getElementById("submit");
  var city_id = document.getElementById("city_code");
  city_name = document.getElementById("city_name");

  submit.addEventListener('click', () => {
  
    var city_val = city_name.value;
    ipc.send('update_city', city_val);
   
  }
  )

}
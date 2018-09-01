const electron = require('electron');
const {
  remote
} = require('electron');
const shell = require('electron').shell;
const app = require('electron').remote.app;
const ipc = require('electron').ipcRenderer
const Menu = electron.Menu
const BrowserWindow = require('electron').remote.BrowserWindow;
// const path = require('path');
// const url = require('url');
var submit;
var city_name;


function runscript() {

  submit = document.getElementById("submit");
  var city_id = document.getElementById("city_code");
  city_name = document.getElementById("city_name");
  var fork_me = document.getElementById('fork-me');
  var open_weather = document.getElementById('open-weather');


  open_weather.addEventListener('click', function (event) {
    event.preventDefault();
    shell.openExternal("https://openweathermap.org");
  });
  fork_me.addEventListener('click', function (event) {
    event.preventDefault();
    shell.openExternal("https://github.com/deep5050/minimal-weather");
  })

  submit.addEventListener('click', function (event) {
    event.preventDefault();
    var city_val = city_name.value;
    ipc.send('update_city', city_val);
  });


}
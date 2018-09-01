const electron = require('electron');
const {remote} = require('electron');
const shell = require('electron').shell;
const app = require('electron').remote.app;
const ipc = require('electron').ipcRenderer
const Menu = electron.Menu
const BrowserWindow = require('electron').remote.BrowserWindow;
const fs = require('fs');

var temp = fs.readFileSync('./settings.json');
var temp_dat = JSON.parse(temp);
var prev_city = temp_dat.city_name;
var submit;
var city_name;
var api_key_val = '48ff1d472cdeee40ccb395bc03863b73';

function runscript() {

  submit = document.getElementById("submit");
  var city_id = document.getElementById("city_code");
  var city_name = document.getElementById("city_name");
  var fork_me = document.getElementById('fork-me');
  var open_weather = document.getElementById('open-weather');
  var enter_api_key = document.getElementById('api_key');
  

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
    console.log(enter_api_key.value);
    console.log(city_name.value);
    var city_val = city_name.value;
    if (city_val == null || city_val == '')
    {
      city_val = prev_city;
    }
    if (enter_api_key.value == null || enter_api_key.value=='')
    {
      api_key_val = '48ff1d472cdeee40ccb395bc03863b73';
    } else
    {
      api_key_val = enter_api_key.value;
      }
    ipc.send('update_settings', {city_name:city_val,api_key: api_key_val});
  });


}
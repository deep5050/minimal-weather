const shell = require('electron').shell;
const remote = require('electron').remote;
const app = require('electron').remote.app;
const ipcRenderer = require('electron').ipcRenderer;


function runscript(x) {
  var open_weather = document.getElementById('open-weather');
  open_weather.addEventListener('click', () => {
    shell.openExternal('https://openweathermap.org/city');
  });
  var fork_me = document.getElementById('fork-me');
  fork_me.addEventListener('click', () => {
    shell.openExternal('http://github.com/deep5050/minimal-weather');
  });



}
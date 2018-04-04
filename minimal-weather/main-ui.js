// import { isDate } from "util";

var req = new XMLHttpRequest;

// dummy  open weather map api data object when no internet connection available
var got_data = 0;
// var fetched_data;
var fetched_data = {
  "coord": {
    "lon": 'N/A',
    "lat": 'N/A'
  },
  "sys": {
    "type": 'N/A',
    "id": 'N/A',
    "message": 'N/A',
    "country": 'N/A',
    "sunrise": 'N/A',
    "sunset": 'N/A'
  },
  "weather": [{
    "id": 'N/A',
    "main": 'N/A',
    "description": 'N/A',
    "icon": 'N/A'
  }],
  "base": 'N/A',
  "main": {
    "temp": 'N/A',
    "humidity": 'N/A',
    "pressure": 'N/A',
    "temp_min": 'N/A',
    "temp_max": 'N/A'
  },
  "wind": {
    "speed": 'N/A',
    "deg": 'N/A'
  },
  "clouds": {
    "all": 'N/A'
  },
  "dt": 'N/A',
  "id": 'N/A',
  "name": 'N/A',
  "cod": 'N/A'
}





// ///////////////////////////////////////////
var is_day;
function showTime() {
  var currdate = new Date();
  var MyFormat = currdate.getHours() + ':' + currdate.getMinutes();


  if (currdate.getHours() >= 12) {
    MyFormat = currdate.getHours() + ':' + currdate.getMinutes() + ' PM';
  } else {
    MyFormat = currdate.getHours() + ':' + currdate.getMinutes() + ' AM';
  }
  
  if (currdate.getHours() >= 18) {
    is_day = 0; // if it is greater than or equals to 6pm it is night (atleast to me) :)
  }
  document.getElementById("time").innerHTML = MyFormat;
}


function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  }; // add zero in front of numbers < 10
  return i;
}
setInterval(function () {

  var MyFormat;
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  // if (h >= 12 && h <= 23 && m <= 59) {
  //   MyFormat = (h - 12) + ':' + m + ':' + s + ' PM';
  // } else if (h >= 0 && h <= 11 && m <= 59) {
  //   if (h == 0) { h = h + 12 }
  //   MyFormat = h + ':' + m + ':' + s + ' AM';
  // }


    if (h >= 12 && h <= 23 && m <= 59) {
    MyFormat = (h - 12) + ':' + m + ' PM';
  } else if (h >= 0 && h <= 11 && m <= 59) {
    if (h == 0) { h = h + 12 }
    MyFormat = h + ':' + m + ' AM';
  }
  document.getElementById("time").innerHTML = MyFormat;
}, 1000);







function kelvin_cel(k) {
  var celsius = Math.round(k - 273.15);
  return celsius;
}
///////////////////////////////////////////////
function error_occured() {

  document.getElementById("main-icon").src = "./resources/extra/error.png";
  document.getElementById("temp-val").style.fontSize = "x-large";
  document.getElementById("temp-val").style.color = "white";
  document.getElementById("temp-val").innerHTML = "Something Went wrong";
}

function notfound()
{
  document.getElementById('main-icon').src = "./resources/extra/not_found.png";
  document.getElementById('temp-val').style.color = "white";
  document.getElementById('temp-val').innerHTML = " CITY NOT FOUND";
}

function updating() {
  document.getElementById("main-icon").src = "./resources/extra/91.png";
  document.getElementById("temp-val").style.fontSize = "30px";
  document.getElementById("temp-val").style.color = "white";
  document.getElementById("temp-val").innerHTML = "LOADING..";
  document.getElementById("city").innerHTML = "";

}

var logo_id;
function update_success_content() {
  console.log(fetched_data);
  // update all the things..
  var weather_id = fetched_data.weather[0].id;
  var weather_des = fetched_data.weather[0].main;
  console.log("id:" + weather_id);
  console.log("main:" + weather_des);

  if (weather_id >= 200 && weather_id < 300)
  {
    logo_id = 200;
  } else if (weather_id >= 500 && weather_id < 600) {
    logo_id = 500;  
  } else if (weather_id >= 600 && weather_id < 700) {
    logo_id = 600;  
  } else if (weather_id >= 700 && weather_id < 800) {
    logo_id = 700;  
  } else if (weather_id >= 800 && weather_id < 900) {
    logo_id = 800;  
  } else if (weather_id >= 900 && weather_id < 952) {
    logo_id = 900;  
  } else {
    logo_id = 0;  
}







  document.getElementById("main-icon").src = "./resources/conditions/"+logo_id+'.svg';
// 
  document.getElementById("temp-val").style.color = "white";
  document.getElementById("temp-val").style.fontSize = "55px";
  var celsius_temp = kelvin_cel(fetched_data.main.temp);
  document.getElementById("temp-val").innerHTML = celsius_temp + '&#8451;';
  console.log(celsius_temp);
  document.getElementById("city").innerHTML = fetched_data.name;
  console.log(fetched_data.name);
  var wind_data ='SPEED: '+ fetched_data.wind.speed + '</br>' +'DEG: ' +Math.round(fetched_data.wind.deg);
  document.getElementById("show-wind").innerHTML = wind_data;
  var max_temp_cel = Math.round();
  var max_min = 'MAX: ' + Math.round(kelvin_cel(fetched_data.main.temp_max)) + '</br>' + 'MIN: ' + Math.round( kelvin_cel( fetched_data.main.temp_min));
  document.getElementById("show-max-min").innerHTML = max_min;
  document.getElementById("show-humidity").innerHTML = 'HUM: '+fetched_data.main.humidity+'</br>'+'CLOUD: '+ fetched_data.clouds.all;
}



function test_connection() {
  console.log("test con invoked");
  console.log(req.status + ':' + req.readyState);
};


req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    fetched_data = JSON.parse(req.responseText);
    if (fetched_data.cod == 200) {
      update_success_content();
    } //
  }
  else if(req.status ==0 && req.readyState == 4){
    console.log("no internet! ");
    error_occured();
  }
  else if (req.status == 404 && req.readyState == 4) {
    console.log("city not found");
    notfound();

  }else {

    console.log(req.status + ':' + req.readyState);
  }


};


function get_data() {
  req.timeout = 5000;
  console.log("text con return");
  req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=48ff1d472cdeee40ccb395bc03863b73&type=like", true);
  console.log("open cmplt");
  req.send();
  req.addEventListener("timeout", function (e) {
    req.abort();
    console.log("timeout");
    error_occured();
    return;
  });
  console.log("send cmplt");

}


// update whole app interface
function updateApp() {
  updating();
  get_data();
}
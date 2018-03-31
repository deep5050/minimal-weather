var req = new XMLHttpRequest;
// req.timeout = 7000;
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
function showTime() {
  var currdate = new Date();
  var MyFormat = currdate.getHours() + ':' + currdate.getMinutes();


  if (currdate.getHours() >= 12) {
    MyFormat = currdate.getHours() + ':' + currdate.getMinutes() + ' PM';
  } else {
    MyFormat = currdate.getHours() + ':' + currdate.getMinutes() + ' AM';
  }
  document.getElementById("time").innerHTML = MyFormat;
}



// function startTime() {
//   var today = new Date();
//   var h = today.getHours();
//   var m = today.getMinutes();
//   var s = today.getSeconds();
//   m = checkTime(m);
//   s = checkTime(s);
//   document.getElementById('txt').innerHTML =
//     h + ":" + m + ":" + s;
//   var t = setTimeout(startTime, 500);
// }

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

  if (h >= 12 && h <= 23 && m <= 59) {
    MyFormat = (h - 12) + ':' + m + ':' + s + ' PM';
  } else if (h >= 0 && h <= 11 && m <= 59) {
    if (h == 0) { h = h + 12 }
    MyFormat = h + ':' + m + ':' + s + ' AM';
  }
  document.getElementById("time").innerHTML = MyFormat;



  // document.getElementById("time").innerHTML =
  //   h + ":" + m + ":" + s;
  // var t = setTimeout(startTime, 500);
}, 1000);







function kelvin_cel(k) {
  var celsius = Math.round(k - 273.15);
  return celsius;
}
///////////////////////////////////////////////
function error_occured() {
  // document.getElementById("myImg").src = "hackanm.gif";
  document.getElementById("main-icon").src = "./resources/extra/error.png";
  document.getElementById("temp-val").style.fontSize = "x-large";
  document.getElementById("temp-val").style.color = "#E82427";
  document.getElementById("temp-val").innerHTML = "Something Went wrong";
}

function updating() {

  document.getElementById("main-icon").src = "./resources/extra/91.gif";
  document.getElementById("temp-val").style.fontSize = "40px";
  document.getElementById("temp-val").style.color = "white";
  document.getElementById("temp-val").innerHTML = "Loading..";
  document.getElementById("city").innerHTML = "";

}


function update_success_content() {
  console.log(fetched_data);
  // update all the things..
  document.getElementById("main-icon").src = "./resources/contrast.png";

  document.getElementById("temp-val").style.color = "white";
  document.getElementById("temp-val").style.fontSize = "55px";
  var celsius_temp = kelvin_cel(fetched_data.main.temp);
  document.getElementById("temp-val").innerHTML = celsius_temp + '&#8451;';
  console.log(celsius_temp);
  document.getElementById("city").innerHTML = fetched_data.name;
  console.log(fetched_data.name);
  var wind_data ='SPEED: '+ fetched_data.wind.speed + '</br>' +'DEG: ' +fetched_data.wind.deg;
  document.getElementById("show-wind").innerHTML = wind_data;
  var max_temp_cel = Math.round();
  var max_min = 'MAX: ' + Math.round(kelvin_cel(fetched_data.main.temp_max)) + '</br>' + 'MIN: ' + Math.round( kelvin_cel( fetched_data.main.temp_min));
  document.getElementById("show-max-min").innerHTML = max_min;
  document.getElementById("show-humidity").innerHTML = 'HUM: '+fetched_data.main.humidity+'</br>'+'CLOUD: '+ fetched_data.clouds.all;
}

// global request variable



function test_connection() {
  console.log("test con invoked");
  console.log(req.status + ':' + req.readyState);
  // req.ontimeout = function () { alert("canot connect to the server") };









  // req.onprogress = function () {
  //   updating();
  // };

  // req.ontimeout = function () {
  //   alert("timeout");
  //   error_occured();
  // return;
};



if (req.status = 404) {
  // error_occured();
  // alert("oops !something went wrong !");
}

req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    fetched_data = JSON.parse(req.responseText);
    if (fetched_data.cod == 200) {
      update_success_content();
    } else if (fetched_data.cod == 404) {
      console.log("city not found");

    }
  } else {

    console.log(req.status + ':' + req.readyState);
  }


};






// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     document.getElementById("demo").innerHTML = this.responseText;
//   }
// };
// xhttp.open("GET", "ajax_info.txt", true);
// xhttp.send(); 
// }


function get_data() {


  req.timeout = 5000;
  console.log("text con return");
  req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=kolkata,in&appid=48ff1d472cdeee40ccb395bc03863b73", true);
  console.log("open cmplt");
  req.send();
  req.addEventListener("timeout", function (e) {
    req.abort();
    // alert("timeout");
    console.log("timeout");
    error_occured();
    return;
  });
  console.log("send cmplt");

}













// update whole app interface
function updateApp() {
  // showTime();
  updating();
  get_data();
}
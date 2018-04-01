01. Include Weather Icons in your app:
https://github.com/erikflowers/weather-icons

02. Include the below JSON in your application, for example purposes, lets assume it's a global named `weatherIcons`.

03. Make a request to OpenWeatherMap:

``` javascript
req = $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=?');
```

04. Inspect the code and pair with the data above.

*Note: 7xx and 9xx do not get prefixed w/ day/night*

``` javascript
req.then(function(resp) {
  var prefix = 'wi wi-';
  var code = resp.weather[0].id;
  var icon = weatherIcons[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

  // Finally tack on the prefix.
  icon = prefix + icon;
});
```
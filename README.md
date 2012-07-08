# jquery-geoloc

jQuery plugin for using HTML5 geolocation API.

See this:[Geolocation API Specification](http://dev.w3.org/geo/api/spec-source.html, "Geolocation API Specification")

##Download & Installation

1. Check out: `git clone git://github.com/roothybrid7/xhrdavclient.git`
2. Copy file to your application's directory: `cp dist/jquery-geoloc.min.js your-appdir/lib/`

### Script files.

Uncompressed: `dist/jquery-geoloc.js`

Minify: `dist/jquery-geoloc.min.js`


## Examples

### CurrentPosition

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<script src="lib/jquery.min.js"></script>
<script src="lib/jquery-geoloc.min.js"></script>
</head>
<body>
<div id="position">
Latitude: <span id="lat"></span>
Longitude: <span id="lon"></span>
</div>

<script type="text/javascript">
$(function() {
$.geoloc.getCurrentPositionDeferred()
  .done(function(pos) {
    var coords = pos.coords;
    $('#lat').text(coords.latitude);
    $('#lon').text(coords.longitude);
  }).fail(function(err) {
    // on error getCurrentPosition.
    alert('Failed to get position');
  });
});
</script>
</body>
</html>
```


### WatchPosition

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<script src="lib/jquery.min.js"></script>
<script src="lib/jquery-geoloc.min.js"></script>
</head>
<body>
<div id="map"></div>
<div id="position">
Latitude: <span id="lat"></span>
Longitude: <span id="lon"></span>
</div>

<script type="text/javascript">
$(function() {
var Map = new Map('#map'), geo = null, timeout = 6000;
$(navigator.geolocation).on('succss', function(ev, pos) {
  // on success watchPosition.
  var coords = pos.coords;
  $('#lat').text(coords.latitude);
  $('#lon').text(coords.longitude);
  Map.latitude = coords.latitude;
  Map.longitude = coords.longitude;
  Map.update();
}).on('denied', function(ev, err) {
  alert('To use this application, ' +
    'You need to enable location-based service.');
}).on('timeout', function(ev, err) {
  // Recovery watch.
  timeout += 2000;
  geo.watchPosition({timeout: timeout});
});
geo = $.geoloc.watchPositionWithNotifying({timeout: timeout);
});
</script>
</body>
</html>
```

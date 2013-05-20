(function() {
  var zios = {
    name: "Zio's",
    latitude: 41.255448,
    longitude: -95.931218
  };
  var peffers = {
    name: 'Sgt. Peffers',
    latitude: 41.27326,
    longitude: -95.989069
  };
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };
  Number.prototype.toDeg = function() {
    return this * 180 / Math.PI;
  };
  var distance = function(to, from) {
    var R = 6371; // km
    var dLat = (from.latitude-to.latitude).toRad();
    var dLon = (from.longitude-to.longitude).toRad();
    var lat1 = to.latitude.toRad();
    var lat2 = from.latitude.toRad();

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  };

  var bearing = function(to, from) {
    var dLon = (from.longitude-to.longitude).toRad();
    var lat1 = to.latitude.toRad();
    var lat2 = from.latitude.toRad();
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1)*Math.sin(lat2) -
      Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
    var brng = Math.atan2(y, x).toDeg();
    return brng;
  };

  var locale = zios;

  $(function() {
    if (Modernizr.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        var currentLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        $('.target').text('Distance to ' + locale.name);
        var totalDist = distance(currentLocation, locale);
        var degrees = bearing(currentLocation, locale);
        $('.distance').text('Distance: ' + totalDist + ' km');
        window.addEventListener('deviceorientation', function(event) {
          var compass = document.querySelector('.compass');
          compass.style[Modernizr.prefixed('transform')] = 'rotate(' + (degrees - event.alpha + 180) + 'deg)';
        });
      });
    }
  });
})();

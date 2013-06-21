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
    return R * c;
  };

  var bearing = function(to, from) {
    var dLon = (from.longitude-to.longitude).toRad();
    var lat1 = to.latitude.toRad();
    var lat2 = from.latitude.toRad();
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
    return Math.atan2(y, x).toDeg();
  };

  var locale = peffers;

  $(function() {

    if (!Modernizr.geolocation) {
      return;
    }

    $('.target').text('Distance to ' + locale.name);
    navigator.geolocation.watchPosition(function(position) {
      var currentLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      var totalDist = distance(currentLocation, locale),
      degrees = bearing(currentLocation, locale);

      if (totalDist < 0.05) {
        $('body').addClass('nearby');
      }

      $('.distance').text('Distance: ' + totalDist.toFixed(2) + ' km');

      window.addEventListener('deviceorientation', function(event) {
        var compass = document.querySelector('.compass');
        //This works with iOS devices but nothing else. See https://gist.github.com/mattdsteele/5615925
        var rotation = degrees - event.webkitCompassHeading + 180;

        compass.style[Modernizr.prefixed('transform')] = 'rotate(' + rotation + 'deg)';
      });
    });
  });
})();

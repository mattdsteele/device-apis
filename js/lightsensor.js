(function() {
  var lightSensorThreshold = 10;
  window.addEventListener('devicelight', function(event) {
    $('.lightlevel').text(event.value);
    if (event.value < lightSensorThreshold) {
      document.querySelector('audio').play();
      $('html').addClass('partytime');
      $('.party').addClass('schwing');
    } else {
      document.querySelector('audio').pause();
      $('.party').removeClass('schwing');
      $('html').removeClass('partytime');
    }
  });
})();

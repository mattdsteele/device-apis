(function() {
  $('.percent').text('Battery: ' + (navigator.battery.level * 100) + '%');

  var batteryFunction = function(event) {
    var battery = navigator.battery;
    $('.isCharging').text('The battery ' + (battery.charging ? 'is' : 'is not') + ' charging!');
    var $page = $('html');
    if (battery.charging) {
      $page.addClass('green');
      $page.removeClass('red');
    } else {
      $page.addClass('red');
      $page.removeClass('green');
    }
  };
  $(function() {
    batteryFunction();
  });
  navigator.battery.addEventListener('levelchange', batteryFunction);
  navigator.battery.addEventListener('chargingchange', batteryFunction);
})();

window.addEventListener('devicelight', function(event) {
  $('.lightlevel').text(event.value);
  if (event.value < 20) {
    document.querySelector('audio').play();
    $('html').addClass('partytime');
    $('.party').addClass('schwing');
  } else {
    document.querySelector('audio').pause();
    $('.party').removeClass('schwing');
    $('html').removeClass('partytime');
  }
});

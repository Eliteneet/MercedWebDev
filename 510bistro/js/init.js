var footerFadeInTime = 2000;
var mainFadeInTime = 1000;

// Navigation Event Listeners
$('#navHome').click(function() {
  if ($('#pageHome').length == 0) {
    changePage('home');
    changeActive('navHome', '');
  }
});
$('#navHomeM').click(function() {
  if ($('#pageHome').length == 0) {
    changePage('home');
    changeActive('navHome', 'M');
  }
});
$('#navAbout').click(function() {
  if ($('#pageAbout').length == 0) {
    changePage('about');
    changeActive('navAbout', '');
  }
});
$('#navAboutM').click(function() {
  if ($('#pageAbout').length == 0) {
    changePage('about');
    changeActive('navAbout', 'M');
  }
});
$('#navContact').click(function() {
  if ($('#pageContact').length == 0) {
    changePage('contact');
    changeActive('navContact', '');
  }
});
$('#navContactM').click(function() {
  if ($('#pageContact').length == 0) {
    changePage('contact');
    changeActive('navContact', 'M');
  }
});
// End of Navigation Event Listeners

// Menu Event Listeners
$('#menuAppetizers').click(function() {
  if ($('#menuPageAppetizers').length == 0) {
    changePage('menu/appetizers');
    changeActive('menuAppetizers', '');
  }
});
$('#menuAppetizersM').click(function() {
  if ($('#menuPageAppetizers').length == 0) {
    changePage('menu/appetizers');
    changeActive('menuAppetizers', 'M');
  }
});
// End of Menu Event Listeners

// Interactive Components
$('#mobile-button-collapse').sideNav({
  closeOnClick: true
});
$('.collapsible').collapsible({
  accordian: false
});
$('a.collapsible-item').click(function() {
  $('.collapsible-header').removeClass('active');
  $('.collapsible').collapsible();
});
$(".dropdown-button").dropdown({
  inDuration: 300,
  outDuration: 225,
  constrain_width: false, // Does not change width of dropdown to that of the activator
  hover: false, // Activate on hover
  gutter: 0, // Spacing from edge
  belowOrigin: false, // Displays dropdown below the button
  alignment: 'left' // Displays dropdown with edge aligned to the left of button
});
// End of Interactive Components

$(document).ready(function(){
  $('#navHome').click();
});

function homeSlider() {
  $('.slider').slider({
      full_width: false,
      indicators: false,
      height: 550
    });
}

function changeActive(link, mobile) {
  if (mobile == "M") {
    $('a').not('#'+link+'M').removeClass('active');
    $('#'+link).addClass('active');
    $('#'+link+'M').addClass('active');
  } else {
    $('a').not('#'+link).removeClass('active');
    $('#'+link).addClass('active');
    $('#'+link+'M').addClass('active');
  }
}

function changePage(target) {
  $('footer').hide();
  $('#main').empty();
  if (target == "home") {
    $('#main').hide().load('page/'+target+'.html', homeSlider).fadeIn(mainFadeInTime);
  } else {
    $('#main').hide().load('page/'+target+'.html').fadeIn(mainFadeInTime);
  }
  $('footer').fadeIn(footerFadeInTime);
}

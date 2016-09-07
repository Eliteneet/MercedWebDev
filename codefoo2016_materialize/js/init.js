(function($){
  $(function(){

    $('.button-collapse').sideNav(
    	{closeOnClick: true}
    );
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$('.navVideos').click(
  function(){
    $(window).scrollTo($('.videos'), {duration:'slow', offset: 0});
  }
);

$('.navContact').click(
  function(){
    $(window).scrollTo($('.contact'), {duration:'slow', offset: 0});
  }
);

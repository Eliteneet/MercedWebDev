var $key = "GW5I92I5NR";
var $searchBy = "latin";
var $searchFor = "diceros bicornis";
var $quantity = "10";

$(document).ready(function() {

  console.log('http://www.arkive.org/api/'+$key+'/portlet/'+$searchBy+'/'+$searchFor+'/'+$quantity);
  var $search = 'http://www.arkive.org/api/'+$key+'/portlet/'+$searchBy+'/'+$searchFor+'/'+$quantity;

  $.ajax({
      url: $search,
      data: {
        outputFormat: 'json'
      },
      dataType: 'jsonp',
      error: function (xhr,status,error) {
        console.log(status + ' ' + error);
      },
      success: function (animals) {
        var out = "";
        for(var i = 0; i < arr.length; i++) {
          out +=
          '<div class="col s12 m4 center-align float-none">'+

          '</div>';
        }
        document.getElementById("articles").innerHTML = out;
      },
      type: 'GET'
  });

  $('.modal-trigger').leanModal();

  $('.button-collapse').sideNav(
    {closeOnClick: true}
  );

});

$('.navAnimals').click(
  function(){
    $(window).scrollTo($('.animals'), {duration:'slow', offset: 0});
  }
);

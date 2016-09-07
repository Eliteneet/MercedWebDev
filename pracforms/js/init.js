$('.navForm').click(
  function(){
    $(window).scrollTo($('.pageForm'), {duration:'slow', offset: 0});
  }
);

$(document).ready(function() {
    $('select').material_select();

    updateList("json/names.json");

    $('#submitBtn').click(function(e) {
      var myForm = $('#ajaxform').serializeJSON();
      $.getJSON("json/names.json", function(result) {
        result.names.push(myForm);
        $.ajax({
          url: "php/submit.php",
          type: "POST",
          data: {valArray:result},
          success: function() {
            console.log(myForm);
            console.log(result.names.length);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });

        updateList("json/names.json");
      });

      e.preventDefault();
    });

});

function updateList(file) {

  $.getJSON(file, function(result) {
    $('.ulCollection').empty();
    $.each(result.names, function(i, name) {
      $('.ulCollection').prepend('<li class="collection-item tan">'
      +i+' '+name.firstName+' '+name.lastName+' - '+name.cars+
      '</li>');
    });
  });

}

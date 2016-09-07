$('.navForm').click(
  function(){
    $(window).scrollTo($('.pageForm'), {duration:'slow', offset: 0});
  }
);

$(document).ready(function() {

    updateList("json/menu.json");

    $('#submitBtn').click(function(e) {
      var myForm = $('#ajaxform').serializeJSON();
      $.getJSON("json/menu.json", function(result) {
        result.menu_items.push(myForm);
        var request = $.ajax({
          url: "php/submit.php",
          type: "POST",
          data: {valArray:result}
        }).done(function() {
          console.log(myForm);
          $('#itemList').prepend('<li class="collection-item avatar tan">'
          +'<span class="title truncate">' + ((myForm.itemName) ? myForm.itemName : 'No Name') + '</span>'
          +'<span class="secondary-content">' + ((myForm.calories) ? myForm.calories : '') + '</span>'
          +'<p class="truncate">'
            +((myForm.checkVegetarian) ? 'Vegetarian ' : '')
            +((myForm.checkSpicy) ? 'Spicy ' : '')
            +((myForm.checkMild) ? 'Mild ' : '')
            +((myForm.checkKids) ? 'Kids ' : '')
            +((myForm.checkSeniors) ? 'Seniors ' : '')
            +((myForm.checkLight) ? 'Light ' : '')
            +((myForm.checkHeavy) ? 'Heavy ' : '')
          +'</p>'+
          '</li>');
        }).fail(function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        });
      });

      e.preventDefault();
    });

});

function updateList(file) {

  console.log("Update Please.");

  $.getJSON(file, function(result) {
    $('#itemList').empty();
    console.log("result.menu_items.length = " + result.menu_items.length);
    $.each(result.menu_items, function(i, item) {
      $('#itemList').prepend('<li class="collection-item avatar tan">'
      +'<span class="title truncate">' + ((item.itemName) ? item.itemName : 'No Name') + '</span>'
      +'<span class="secondary-content">' + ((item.calories) ? item.calories : '') + '</span>'
      +'<p class="truncate">'
        +((item.checkVegetarian) ? 'Vegetarian ' : '')
        +((item.checkSpicy) ? 'Spicy ' : '')
        +((item.checkMild) ? 'Mild ' : '')
        +((item.checkKids) ? 'Kids ' : '')
        +((item.checkSeniors) ? 'Seniors ' : '')
        +((item.checkLight) ? 'Light ' : '')
        +((item.checkHeavy) ? 'Heavy ' : '')
      +'</p>'+
      '</li>');
    });
  });

}

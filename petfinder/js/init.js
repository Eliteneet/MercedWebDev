var $key = "e068f30aab6236eeba0f5f0683d17b19";
var $animalTypeCount = 0;
var $buttonTypeCount = 0;

$('.navPetFinder').click(
  function(){
    $(window).scrollTo($('.pagePetFinder'), {duration:'slow', offset: 0});
  }
);

$(document).ready(function() {

  $('#submitBtn').click(function(e) {

    var myForm = $('#animalTypeForm').serializeJSON();
    $('#animalType').val('');

    $.getJSON('http://api.petfinder.com/pet.getRandom?format=json&key='+$key+'&animal='+myForm.animalType+'&output=full&callback=?')
      .done(function(petApiData) {
        console.log(petApiData);
        var $pet = petApiData.petfinder.pet;

        updateAnimalTypeList($pet);

      })
      .error(function(err) {
        alert('Error retrieving data!');
      });

    e.preventDefault();
  });

  $('#submitBird').click(function(e) {
    $.getJSON('http://api.petfinder.com/pet.getRandom?format=json&key='+$key+'&animal=bird&count=3&output=full&callback=?')
      .done(function(birdApiData) {
        console.log(birdApiData);

        updateButtonSubmitList(birdApiData);
      })
      .error(function(err) {
        alert('Error retrieving data!');
      });

    e.preventDefault();
  });
  $('#submitCat').click(function(e) {
    $.getJSON('http://api.petfinder.com/pet.getRandom?format=json&key='+$key+'&animal=cat&count=3&output=full&callback=?')
      .done(function(catApiData) {
        console.log(catApiData);

        updateButtonSubmitList(catApiData);
      })
      .error(function(err) {
        alert('Error retrieving data!');
      });

    e.preventDefault();
  });
  $('#submitDog').click(function(e) {
    $.getJSON('http://api.petfinder.com/pet.getRandom?format=json&key='+$key+'&animal=dog&count=3&output=full&callback=?')
      .done(function(dogApiData) {
        console.log(dogApiData);

        updateButtonSubmitList(dogApiData);
      })
      .error(function(err) {
        alert('Error retrieving data!');
      });

    e.preventDefault();
  });

});

function updateAnimalTypeList($pet) {

  $('#animalTypeList').prepend(
  '<li class="collection-item avatar tan modal-trigger modal-close" href="#modal'+$animalTypeCount+'">'+
    '<span class="title truncate">' + $pet.name.$t + '</span>'+
    '<span class="secondary-content">' + $pet.contact.city.$t + ' ' + $pet.contact.state.$t + '</span>'+
    '<p class="truncate">'+
      $pet.animal.$t+'  '+
      $pet.sex.$t+'  '+
      $pet.breeds.breed.$t+' '+
    '</p>'+
    '<p class="truncate">'+
      $pet.description.$t+
    '</p>'+
  '</li>'+
  '<div id="modal'+$animalTypeCount+'" class="modal modal-fixed-footer light-teal">'+
    '<div class="modal-content icon-block">'+
      '<img src="'+$pet.media.photos.photo[3].$t+'" class="responsive-img">'+
      '<h5 class="center">'+$pet.name.$t+'</h5>'+
      '<p class="light beige-text">'+$pet.description.$t+
      '</p>'+
    '</div>'+
    '<div class="modal-footer light-teal">'+
      '<a href="#!" class="modal-action modal-close btn-flat beige-text">Close</a>'+
    '</div>'+
  '</div>');

  $('.modal-trigger').leanModal();

  $animalTypeCount++;

};

function updateButtonSubmitList($pet) {

  $('#animalTypeList').prepend(
  '<li class="collection-item avatar tan modal-trigger modal-close" href="#modal'+$buttonTypeCount+'">'+
    '<span class="title truncate">' + $pet.name.$t + '</span>'+
    '<span class="secondary-content">' + $pet.contact.city.$t + ' ' + $pet.contact.state.$t + '</span>'+
    '<p class="truncate">'+
      $pet.animal.$t+'  '+
      $pet.sex.$t+'  '+
      $pet.breeds.breed.$t+' '+
    '</p>'+
    '<p class="truncate">'+
      $pet.description.$t+
    '</p>'+
  '</li>'+
  '<div id="modal'+$buttonTypeCount+'" class="modal modal-fixed-footer light-teal">'+
    '<div class="modal-content icon-block">'+
      '<img src="'+$pet.media.photos.photo[3].$t+'" class="responsive-img">'+
      '<h5 class="center">'+$pet.name.$t+'</h5>'+
      '<p class="light beige-text">'+$pet.description.$t+
      '</p>'+
    '</div>'+
    '<div class="modal-footer light-teal">'+
      '<a href="#!" class="modal-action modal-close btn-flat beige-text">Close</a>'+
    '</div>'+
  '</div>');

  $('.modal-trigger').leanModal();

  $animalTypeCount++;

};

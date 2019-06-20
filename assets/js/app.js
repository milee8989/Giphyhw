$(document).ready(function () {

  var animals = ["siamese", "persian", "scottish fold", "maine coon", "russian blue", "Balinese"];

  /// function to make the buttons and add them to the page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {

      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-animal", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
  };


  // create a function that will populate the img from the giphy api

  $(document).on("click", ".animal-button", function () {

    $("#images").empty();

    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=7";

    //ajax call

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function (response) {
        console.log(queryURL);
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class=\"animal-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");

          animalDiv.append(p);
          animalDiv.append(animalImage);

          $("#images").append(animalDiv);
        }

      });
  });

  //set the state from still to animated when clicking individual images

  $(document).on("click", ".animal-image", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function (event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }

    populateButtons(animals, "animal-button", "#animal-buttons");
  });

  populateButtons(animals, "animal-button", "#animal-buttons");
});
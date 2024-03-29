var subject = ["Avengers", "Basketball"];

function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();
    console.log("rendered");
    // Looping through the array of subjects
    for (var i = 0; i < subject.length; i++) {

      // Then dynamicaly generating buttons for each subject in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("subject");
      // Adding a data-attribute with a value of the subject at index i
      a.attr("data-person", subject[i]);
      // Providing the button's text with a value of the subject at index i
      a.text(subject[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
      
    }
  }
 renderButtons();

 $("#select-subject").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
  
    var inputSubject = $("#subject-input").val().trim();


    subject.push(inputSubject);
    console.log(subject);
    
    renderButtons();
  });


$(document).on("click", "button", function() {
   //Stores the value of the attribute "data-person" for which ever "(this)" button was clicked
   console.log("test on button");
   $("#gif-display").empty();
   
   var userSubject = $(this).attr("data-person");
    console.log("test on button");

    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      userSubject + "&api_key=U6IHsXIrjGTOQZdrLLlO0ZP0XF7MQQCv&limit=10";//limit = 10 at the end only brings back 10 results for each click

    // AJAX method
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // Waits for response before doing function
      .then(function(response) {
        // Stores the whole array of data from each specific response
        var results = response.data;
        console.log(results);
        
        for (var i = 0; i < results.length; i++) {
         
          if (results[i].rating !== "r") {
            
            var gifDiv = $("<div>");
            var still = results[i].images.fixed_height_still.url;
            var animate = results[i].images.fixed_height.url;

            var rating = results[i].rating;

            // Creates tag and displays whatever the rating is
            var p = $("<p>").text("Rating: " + rating);

            var subjectImage = $("<img>");

            subjectImage.attr("src", still);
            // subjectImage.attr("data-still", still);
            // subjectImage.attr("data-animate", animate);
            subjectImage.attr("data-state", "still");
            subjectImage.attr("data-still", still);
            subjectImage.attr("data-animate", animate);
            subjectImage.addClass("subject-image");

            // Places p tag and actual image inside the gifDiv
            gifDiv.append(p);
            gifDiv.append(subjectImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gif-display").prepend(gifDiv);
          }
        }
      });
  });

  //creates an on click function for each of the gifs, uses the variables created to decide wether they are still or not, and then decides what to do.

  $(document).on("click", ".subject-image", function() {
    console.log("test");
    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });



 



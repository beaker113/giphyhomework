$(document).ready(function () {

    var topics = ["cats", "dogs", "birds", "bats", "bees", "kangaroos", "owls", "fish", 
"sharks", "bears", "rabbits", "girraffes"]


    var makeButtons = function() {
        for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        var btnDiv = $("#btnDiv")
        button.text(topics[i]);
        button.addClass("topicBtn")
        button.attr("data-item", topics[i]);
        btnDiv.append(button);
    }
}
makeButtons();
    
    $("#submit").click(function(){
        console.log("hello.");
        $("#btnDiv").empty()
        var value = $(".newTopic").val()

        topics.push(value)
        console.log(value)
        
        makeButtons();
        click();
    })


   var click = function(){ $(".topicBtn").on("click", function () {
        var topic = $(this).attr("data-item");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=PxCTcb3hDNXLc3pRwdfcBqTJndzRL3qf&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var topicImage = $("<img>");
                    topicImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(topicImage);

                    $("#gifs").prepend(gifDiv);
                }
            });
        })
    }
click();


});
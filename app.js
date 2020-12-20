var players = ["Ben Simmons", "Jimmy Butler", "Joel Embiid", "Paul George", "Devin Booker", "Kobe Bryant", "Lebron James", "Allen Iverson", "Trae Young", "Kemba Walker", "Blake Griffin",]

function createBtn() {
    $("#buttons").empty();
    for (i = 0; i < players.length; i++) {
        var playerBtn = $("<button>");
        playerBtn.addClass("player")
        playerBtn.attr("data-player", players[i])
        playerBtn.text(players[i])
        $("#buttons").append(playerBtn);
    }
};
createBtn();

$("#blueBtn").on("click", function(event){
    
    event.preventDefault();
    var newPlayer = $("#user-input").val().trim();
    console.log(newPlayer);
    if (players.includes(newPlayer)) {
        alert("That player already has a button!")
    }
    else {
        players.push(newPlayer);
        createBtn();
    }
});


$("#buttons").on("click", ".player", function () {
    var nba = $(this).attr("data-player");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        nba + "&api_key=qJqSyyJc7PfhxX1ZozYDBGQgAQ5QDlAr&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            $("#display").empty();
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div id = 'images'>")

                var playerImage = $("<img>");
                
                playerImage.attr("src", results[i].images.fixed_height_still.url);
                playerImage.attr("data-still", results[i].images.fixed_height_still.url);
                playerImage.attr("data-animate", results[i].images.fixed_height.url);
                playerImage.attr("data-state", "still");
                playerImage.addClass("gif");


                gifDiv.append(playerImage);
                $("#display").append(gifDiv);

            };
        });
    });
    $("#display").on("click", ".gif", function () {
        console.log("hello");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })

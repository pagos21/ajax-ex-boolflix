
function init(){
  $("#btn").click(function(){
    var userMovie = $("#inp").val();
    writeAPI(userMovie);
  })

}


// ##### functions Sec #####
function writeAPI(userMovie){
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $("#cont");
  target.html("");

  $.ajax({
    url : "https://api.themoviedb.org/3/search/movie?api_key=8b7e062b77e264c1bb194fda0388a653",
    method : "GET",
    data : {"query" : userMovie},

    success: function(data, state) {
      var moviesfromAPI = data["results"];
      for (var i = 0; i < moviesfromAPI.length; i++) {
        // var film = moviesfromAPI[i]
        var titlefromAPI = moviesfromAPI[i].title;
        var origTitlefromAPI = moviesfromAPI[i].original_title;
        var langfromAPI = moviesfromAPI[i].original_language;
        var votefromAPI = moviesfromAPI[i].vote_average;
        var voteFrom10to5 = Math.ceil(votefromAPI / 2);
        // voteConverter(votefromAPI);

        var movie2html = compiled({ title:titlefromAPI,
                                    origTitle:origTitlefromAPI,
                                    lang:langfromAPI,
                                    voteExtended: votefromAPI,
                                    stars: "<i id='littlestar' class='far fa-star'></i>"
                                    })

        // var test0 = starMultiplier(movie2html, voteFrom10to5);
        target.append(movie2html);

      }//for
    },
    error:function (error) {
      console.log('error');
    }
  }) // ajax

} // function

function starMultiplier(movie2html, voteFrom10to5){
  var test1 = "";

  for (var i = 0; i < voteFrom10to5; i++) {
    test1 = test1 + "<i id='littlestar' class='far fa-star'></i>";
  }
  var allStars = $(movie2html).find("#starElement");
  var allStars2 = allStars.append(test1);
  console.log(allStars);

  console.log(allStars2);
  var movietest = $(movie2html).find("#starElement").append(allStars2);
  return movietest;
}

$(document).ready(init);

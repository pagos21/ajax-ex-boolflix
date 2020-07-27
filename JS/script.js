
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
      console.log("yo ".repeat(3));
      for (var i = 0; i < moviesfromAPI.length; i++) {
        var titlefromAPI = moviesfromAPI[i].title;
        var origTitlefromAPI = moviesfromAPI[i].original_title;
        var langfromAPI = moviesfromAPI[i].original_language;
        var votefromAPI = moviesfromAPI[i].vote_average;
        var voteFrom10to5 = Math.ceil(votefromAPI / 2);
        starMultiplier(voteFrom10to5)
        // voteConverter(votefromAPI);

        var movie2html = compiled({ title:titlefromAPI,
                                    origTitle:origTitlefromAPI,
                                    lang:langfromAPI,
                                    voteExtended: votefromAPI,
                                    vote: voteFrom10to5 })

        target.append(movie2html);
      }//for
    },
    error:function (error) {
      console.log('error');
    }
  }) // ajax

} // function

function starMultiplier(voteFrom10to5){
  var test = $("#littlestar").clone();
  for (var i = 0; i < voteFrom10to5; i++) {
    console.log("N stelline");
  }
}

$(document).ready(init);

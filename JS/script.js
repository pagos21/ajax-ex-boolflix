
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
        var titlefromAPI = moviesfromAPI[i].title;
        var origTitlefromAPI = moviesfromAPI[i].original_title;
        var langfromAPI = moviesfromAPI[i].original_language;
        var votefromAPI = moviesfromAPI[i].vote_average;

        var movie2html = compiled({ title:titlefromAPI,
                                    origTitle:origTitlefromAPI,
                                    lang:langfromAPI,
                                    vote:votefromAPI})
        target.append(movie2html);
      }

    },

    error:function (error) {
      console.log('error');
    }
  })

}


$(document).ready(init);

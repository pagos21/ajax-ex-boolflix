
function init(){

  $("#btn").click(function(){
    var userMoviesOrTV = $("#inp").val();
    writeAPI(userMoviesOrTV);
  })

}

// ##### MAIN functions Sec #####
function writeAPI(userMoviesOrTV){
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $("#cont");
  target.html("");

  callFilms(userMoviesOrTV, compiled, target);
  callTVseries(userMoviesOrTV, compiled, target);

}


// ##### Secondary functions Sec #####
function callFilms(userMoviesOrTV, compiled, target){

  $.ajax({
    url : "https://api.themoviedb.org/3/search/movie?api_key=8b7e062b77e264c1bb194fda0388a653",
    method : "GET",
    data : {"query" : userMoviesOrTV},

    success: function(data, state) {
      var moviesfromAPI = data["results"];
      insideAPIMovie(moviesfromAPI, compiled, target);
    },
    error:function (error) {
      console.log('error from TV series API');
    }
  }) // ajax

}
function insideAPIMovie(moviesfromAPI, compiled, target){
  for (var i = 0; i < moviesfromAPI.length; i++) {
    // var film = moviesfromAPI[i]
    var titlefromAPI = moviesfromAPI[i].title;
    var origTitlefromAPI = moviesfromAPI[i].original_title;
    var langfromAPI = moviesfromAPI[i].original_language;
    var votefromAPI = moviesfromAPI[i].vote_average;
    var voteFrom10to5 = Math.ceil(votefromAPI / 2);
    var stars = starMultiplier2(voteFrom10to5); //Rendering possibile solo con escape HTML
    var flag = flagF(langfromAPI);

    var movie2html = compiled({ title:titlefromAPI,
                                origTitle:origTitlefromAPI,
                                flag: flag,
                                voteExtended: votefromAPI,
                                stars: stars
                                })


    target.append(movie2html);
  }//for
}

function callTVseries(userMoviesOrTV, compiled, target){

  $.ajax({
    url : "https://api.themoviedb.org/3/search/tv?api_key=8b7e062b77e264c1bb194fda0388a653",
    method : "GET",
    data : {"query" : userMoviesOrTV},

    success: function(data, state) {
      var tvfromAPI = data["results"];

      insideAPItv(tvfromAPI, compiled, target);

    },
    error:function (error) {
      console.log('error from Movies API');
    }
  }) // ajax
}
function insideAPItv(tvfromAPI, compiled, target){
  for (var i = 0; i <tvfromAPI.length; i++) {
    // var film = moviesfromAPI[i]
    var namefromAPI = tvfromAPI[i].name;
    var origNamefromAPI = tvfromAPI[i].original_name;
    var langfromAPI = tvfromAPI[i].original_language;
    var votefromAPI = tvfromAPI[i].vote_average;
    var voteFrom10to5 = Math.ceil(votefromAPI / 2);
    var stars = starMultiplier2(voteFrom10to5); //Rendering possibile solo con escape HTML
    var flag = flagF(langfromAPI);

    var movie2html = compiled({ title:namefromAPI,
                                origTitle:origNamefromAPI,
                                flag: flag,
                                voteExtended: votefromAPI,
                                stars: stars })

    target.append(movie2html);
  }//for
}

// Funzione per identificare la lingua e le bandiere
function flagF(langfromAPI){
  var flag = ""
  if (langfromAPI == "en") {
    flag = "img/USA.png"
    return flag;

  } else if (langfromAPI == "it") {
    flag = "img/it.png"
    return flag;

  } else {
    flag = langfromAPI;
    return flag;
  }
}


// Funzione stampare le stelline al posto del voto in int
function starMultiplier2(voteFrom10to5){
  var test1 = "";
  for (var i = 0; i < voteFrom10to5; i++) {
    test1 = test1 + "<i class='fas fa-star'></i>";
  }
  if (voteFrom10to5 == 0) {
    test1 = "Nessun voto";
  }
  return test1;

}

$(document).ready(init);

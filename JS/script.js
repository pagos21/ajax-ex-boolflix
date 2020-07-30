


function enterKey(event){
  if (event.keyCode === 13){
    var userMoviesOrTV = $("#inp").val();
    writeAPI(userMoviesOrTV);
  }
  $(document).on("click", ".btn", function(){
    var thisRev = $(this).find("li.btn");
    console.log(thisRev);
  })
  // $(document).on("click", ".btn", function(){
  //
  // })
}



// ##### MAIN functions Sec #####
function writeAPI(userMoviesOrTV){
  var template = $("#template").html();
  var template2 = $("#template2").html();

  var compiled = Handlebars.compile(template);
  var compiled2 = Handlebars.compile(template2);

  var target = $("#cont");
  target.html("");

  callFilms(userMoviesOrTV, compiled, target);
  callTVseries(userMoviesOrTV, compiled2, target);

}


// ##### Secondary functions Sec #####
function callFilms(userMoviesOrTV, compiled, target){

  $.ajax({
    url : "https://api.themoviedb.org/3/search/movie?api_key=8b7e062b77e264c1bb194fda0388a653",
    method : "GET",
    data : {"query" : userMoviesOrTV},

    success: function(data, state) {
      var moviesfromAPI = data["results"];
      insideAPI(moviesfromAPI, compiled, target);
    },
    error:function (error) {
      console.log('error from TV series API');
    }
  }) // ajax

}
function callTVseries(userMoviesOrTV, compiled2, target){

  $.ajax({
    url : "https://api.themoviedb.org/3/search/tv?api_key=8b7e062b77e264c1bb194fda0388a653",
    method : "GET",
    data : {"query" : userMoviesOrTV},

    success: function(data, state) {
      var tvfromAPI = data["results"];

      insideAPI(tvfromAPI, compiled2, target);

    },
    error:function (error) {
      console.log('error from Movies API');
    }
  }) // ajax
}
function insideAPI(fromAPI, compiled, target){
  for (var i = 0; i < fromAPI.length; i++) {
    // var film = moviesfromAPI[i]
    var titlefromAPI = fromAPI[i].title;
    var origTitlefromAPI = fromAPI[i].original_title;
    var langfromAPI = fromAPI[i].original_language;
    var votefromAPI = fromAPI[i].vote_average;
    var coverfromAPI = fromAPI[i].poster_path;
    var overviewfromAPI = fromAPI[i].overview;
    var namefromAPI = fromAPI[i].name;
    var origNamefromAPI = fromAPI[i].original_name;

    var voteFrom10to5 = Math.ceil(votefromAPI / 2);
    var stars = starMultiplier2(voteFrom10to5); //Rendering possibile solo con escape HTML
    var flag = flagF(langfromAPI);

    var movie2html = compiled({ cover:coverfromAPI,
                                title:titlefromAPI,
                                name:namefromAPI,
                                origTitle:origTitlefromAPI,
                                origName: origNamefromAPI,
                                flag: flag,
                                voteExtended: votefromAPI,
                                stars: stars,
                                overview:overviewfromAPI
    })


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


function semiModal(){
  var thisRev = $(this).find(".btn");
  console.log(thisRev);
}

$(document).ready(enterKey);

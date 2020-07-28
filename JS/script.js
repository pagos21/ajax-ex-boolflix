
function init(){
  $("#btn").click(function(){
    var userMoviesOrTV = $("#inp").val();
    writeAPI(userMoviesOrTV);
  })

}


// ##### functions Sec #####
function callFilms(userMoviesOrTV){
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $("#cont");
  target.html("");
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

    //
    var flag = ""
    if (langfromAPI == "en") {
      flag = "img/USA.png"
    } else if (langfromAPI == "it") {
      flag = "img/it.png"
    } else {
      flag = langfromAPI
    }


    // voteConverter(votefromAPI);

    var movie2html = compiled({ title:titlefromAPI,
                                origTitle:origTitlefromAPI,
                                flag: flag,
                                voteExtended: votefromAPI,
                                stars: stars
                                })


    target.append(movie2html);



  }//for
}

function callTVseries(userMoviesOrTV){
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $("#cont");
  target.html("");
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

    //
    var flag = ""
    if (langfromAPI == "en") {
      flag = "img/USA.png"
    } else if (langfromAPI == "it") {
      flag = "img/it.png"
    } else {
      flag = langfromAPI
    }


    // voteConverter(votefromAPI);

    var movie2html = compiled({ title:namefromAPI,
      origTitle:origNamefromAPI,
      flag: flag,
      voteExtended: votefromAPI,
      stars: stars
    })


    target.append(movie2html);
  }//for
}



function writeAPI(userMoviesOrTV){

  callFilms(userMoviesOrTV)
  callTVseries(userMoviesOrTV)


} // function


function flags(langfromAPI){

}

function starMultiplier2(voteFrom10to5){
  var test1 = "";
  for (var i = 0; i < voteFrom10to5; i++) {
    test1 = test1 + "<i class='far fa-star'></i>";
  }
  if (voteFrom10to5 == 0) {
    test1 = "Nessun voto";
  }
  return test1;

}


function starMultiplier(movie2html, voteFrom10to5){
  var test1 = "";

  for (var i = 0; i < voteFrom10to5; i++) {
    test1 = test1 + "<i id='littlestar' class='far fa-star'></i>";
  }
  var allStars = $(movie2html).find("#starElement");
  var allStars2 = allStars.append(test1);
  console.log(allStars);

  console.log(allStars2);
  var movietest = allStars.append(allStars2);
  return movietest;
}

$(document).ready(init);

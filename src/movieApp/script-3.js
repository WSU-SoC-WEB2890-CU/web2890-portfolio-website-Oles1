/* 
Souce API: https://developer.themoviedb.org/reference/discover-movie

https://www.themoviedb.org/settings/api

my API key:
 2c642a2e50ef6aaaddaf3e5add704b94 */
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2c642a2e50ef6aaaddaf3e5add704b94&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=2c642a2e50ef6aaaddaf3e5add704b94&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = ""; //We want to whatever movie is already displayed prior to the current search request. In other words, we clear the previous search result.
  movies.forEach((movie) => {
    //let use array destructuring here
    const { title, poster_path, release_date, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <div class="movie">
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <p>Release Date: ${release_date} </p>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      </div>
    `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); //so it doesn't submit the page

  const searchTerm = search.value;
  console.log(searchTerm);

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
    // } else {
    //   window.location.reload();
    noMovie();
  }
});

function noMovie() {
  const noMovie = document.createElement("div");
  // noMovie.innerHTML = `<h1>No Movie Found with title "${searchTerm}"</h1>`;
  noMovie.innerHTML = `<h1>No Movie Found with title</h1>`;
  main.appendChild(noMovie);
}

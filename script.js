const API_KEY = "add your API key here";
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="+API_KEY+"&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key="+API_KEY+"&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//initally get top trending movies
getMovies(API_URL);

async function getMovies(url){
   const resp = await fetch(url);
   const respData = await resp.json();

   console.log(respData);

   //calling showMovies function
   showMovies(respData.results);
}

function showMovies(movies){
    //clear main container
    main.innerHTML = '';

    movies.forEach(movie => {
        //create an object from the API data
        const { poster_path, title, vote_average, overview } = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = 
        `
            <img src="${IMG_PATH + poster_path}" 
            alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview:</h4>
                ${overview}
            </div>
        `

        main.appendChild(movieElement);
    });
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    }
});


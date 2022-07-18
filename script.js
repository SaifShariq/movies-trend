const API_KEY = "04c35731a5ee918f014970082a0088b1";
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="+ API_KEY + "&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const main = document.querySelector('main');

async function getMovies(){
   const resp = await fetch(API_URL);
   const respData = await resp.json();

   console.log(respData);

    // respData.results.forEach(movie => {
    //     const img = document.createElement("img");
    //     img.src = IMG_PATH + movie.poster_path;
    //     document.body.appendChild(img);
    // });

    respData.results.forEach(movie => {
        //create an object from the API data
        const { poster_path, title, vote_average} = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = 
        `
            <img src="${IMG_PATH + poster_path}" 
            alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>
        `

        main.appendChild(movieElement);
    })

   return respData;
}

getMovies();
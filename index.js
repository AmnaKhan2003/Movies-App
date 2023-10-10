const APIURL="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH="https://image.tmdb.org/t/p/w1280/";
const SEARCHURL="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
const main=document.getElementById("main");
const form=document.getElementById("form");
const input=document.getElementById("search");
getFavMovies(APIURL);
async function getFavMovies(url){
    const response = await fetch(url);
    var data = await response.json();
        getImages(data.results);
    }

    function getImages(results){
        main.innerText="";
        results.forEach(element => {
            const movieEl=document.createElement("div");
            movieEl.classList.add("movie");
            movieEl.innerHTML=`
            <img
              src="${IMGPATH+element.poster_path}"
              alt="${element.title}"
            />
            <div class="movie-info">
              <h3>${element.title}</h3>
              <div class=${getClassByRate(element.vote_average)}>${element.vote_average}</div>
            </div>

            <div class="overview">
                <h4>Overview:</h4>
                ${element.overview}
            </div>
            
            `;
            main.appendChild(movieEl);
    
            
        });
    }
    function getClassByRate(element){
        if(element>=8){
            return 'green';
        }
        else if(element>=5){
            return 'orange';
        }
        else{
            return 'red';
        }
    }
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const searchValue=input.value;
        input.value="";
        if(searchValue){
            
            getFavMovies(SEARCHURL+searchValue);

        }

    })

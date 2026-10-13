

const API="https://www.omdbapi.com/?i=tt3896198&apikey=defa6f67";

const movieform=document.getElementById("movieForm");
const movieInput=document.getElementById("movieInput");
const moviesHub=document.getElementById("movieHub");

window.addEventListener("DOMContentLoaded", () => {
    const savedSearch = sessionStorage.getItem("lastSearch");
    if (savedSearch) {
        movieInput.value = savedSearch; 
        searchMovie(savedSearch);       
    }
});

movieform.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim();
    if (!query) {
        return;
    }

    sessionStorage.setItem("lastSearch", query); // <-- ADD THIS LINE
    searchMovie(query);
});

moviesHub.addEventListener("click", (e) => {
    const movieCard = e.target.closest(".movie-card");
    if (!movieCard) return;
    
    e.preventDefault();
    const imdbID = movieCard.dataset.imdbID;
    console.log(imdbID);
    location.href = `movie-details.html?id=${imdbID}`;
});


movieform.addEventListener("submit" ,(e)=>{
    e.preventDefault();
    let query=movieInput.value.trim();
    if(!query){
        return;
    }

    
    searchMovie(query);
})

async function searchMovie(movieName){
    moviesHub.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-16 gap-3">
            <div class="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <p class="text-slate-400 font-medium">Searching movies...</p>
        </div>
    `;  

    let response= await fetch(`https://www.omdbapi.com/?&apikey=defa6f67&s=${movieName}`);

    let data= await response.json();
    console.log(data);
    if(data.Response=== "True"){
 
    displayMovies(data.Search);
    }
    else{
        moviesHub.innerHTML=`<p>${data.Error}</p>`;
    }
}

function displayMovies(movies){

   
    moviesHub.innerHTML = "";

    movies.forEach((movie)=>{

        const div=document.createElement("div");
        div.className = "movie-card bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col";
        div.dataset.imdbID=movie.imdbID;

        const posterSrc = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";
        
       
        div.innerHTML=`
    
      
            <div class="aspect-[2/3] w-full overflow-hidden bg-slate-950"" >
                <img src="${movie.Poster}"  id="moviePoster">
            </div>
            <div>
                <h2 id="movieTitle" class="text-lg font-bold text-slate-100 line-clamp-1">${movie.Title}</h2>
                <p id="movieYear" class="text-sm font-medium text-indigo-400 mt-1">${movie.Year}</p>
            </div>

    `

    moviesHub.appendChild(div);
    })

    moviesHub.addEventListener("click", (e) => {
        e.preventDefault();
        const movieCard = e.target.closest(".movie-card");
        if (!movieCard) return;
        const imdbID=movieCard.dataset.imdbID;
        console.log(imdbID);
        location.href=`movie-details.html?id=${imdbID}`;
    })



}

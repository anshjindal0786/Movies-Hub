const params=new URLSearchParams(location.search);
const imdbId=params.get("id");
console.log(params);
if(imdbId){
    searchMovie(imdbId.trim());
}




async function searchMovie(imdbId){
    const response = await fetch(`https://www.omdbapi.com/?apikey=defa6f67&i=${imdbId}&plot=full`);
    const data = await response.json();
    console.log(data);

    if(data.Response === "True"){
        displayMovieDetails(data);
    }
    else{
        console.log(data.Error);
    }
}


function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById("movieDetails");

    // Handle missing posters safely
    const posterSrc = movie.Poster !== "N/A" 
        ? movie.Poster 
        : "https://via.placeholder.com/400x600/1e293b/94a3b8?text=No+Poster";
    
    // Split the comma-separated genres into red pill badges
    const genreTags = movie.Genre !== "N/A" 
        ? movie.Genre.split(',').map(genre => `<span class="px-3 py-1 bg-red-500/10 text-red-400 text-sm font-medium rounded-full border border-red-500/20">${genre.trim()}</span>`).join('')
        : '';

    // Generate the official IMDb URL
    const imdbUrl = `https://www.imdb.com/title/${movie.imdbID}/`;

    movieDetailsContainer.innerHTML = `
        <div class="flex flex-col md:flex-row gap-10 bg-slate-800/80 p-6 md:p-10 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-sm max-w-5xl mx-auto">
            
            <!-- Left Side: Poster -->
            <div class="w-full md:w-1/3 lg:w-1/4 shrink-0 mx-auto">
                <img src="${posterSrc}" alt="${movie.Title}" class="w-full max-w-[300px] md:max-w-none mx-auto h-auto rounded-2xl shadow-xl shadow-black/50 border border-slate-700/50 object-cover">
            </div>
            
            <!-- Right Side: Movie Details -->
            <div class="flex-1 flex flex-col justify-start">
                
                <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                    ${movie.Title}
                </h1>
                
                <!-- Meta Info (Rating, Year, Runtime, Rated) -->
                <div class="flex flex-wrap items-center gap-3 text-slate-400 text-sm md:text-base font-medium mb-6">
                    <span class="flex items-center gap-1.5 text-red-400 bg-red-400/10 px-2.5 py-1 rounded-md border border-red-400/20 font-bold">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        ${movie.imdbRating}
                    </span>
                    <span class="text-slate-600">•</span>
                    <span>${movie.Year}</span>
                    <span class="text-slate-600">•</span>
                    <span>${movie.Runtime}</span>
                    <span class="text-slate-600">•</span>
                    <span class="border border-slate-600 px-2 py-0.5 rounded text-xs uppercase tracking-wider">${movie.Rated}</span>
                </div>

                <!-- Genre Tags -->
                <div class="flex flex-wrap gap-2 mb-8">
                    ${genreTags}
                </div>

                <!-- Plot Summary -->
                <div class="mb-8">
                    <h3 class="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span class="text-red-500">🔥</span> Plot Summary
                    </h3>
                    <p class="text-slate-300 leading-relaxed text-base/7">${movie.Plot}</p>
                </div>

                <!-- Cast & Crew Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-[#0f172a]/80 rounded-2xl border border-slate-700/50 shadow-inner mb-8">
                    <div>
                        <span class="block text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Director</span>
                        <span class="text-slate-200 font-medium">${movie.Director}</span>
                    </div>
                    <div>
                        <span class="block text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Released</span>
                        <span class="text-slate-200 font-medium">${movie.Released}</span>
                    </div>
                    <div class="sm:col-span-2">
                        <span class="block text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Cast</span>
                        <span class="text-slate-200 font-medium">${movie.Actors}</span>
                    </div>
                </div>

                <!-- IMDb Link Button -->
                <div>
                    <a href="${imdbUrl}" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center gap-2 bg-[#f5c518] hover:bg-[#e2b616] text-black font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#f5c518]/20 hover:-translate-y-1 w-max">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zm5 16H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/>
                        </svg>
                        View on IMDb
                    </a>
                </div>

            </div>
        </div>
    `;
}

// function displayMovieDetails(movie) {
//     const movieDetailsContainer = document.getElementById("movieDetails");

//     // Handle missing posters safely
//     const posterSrc = movie.Poster !== "N/A" 
//         ? movie.Poster 
//         : "https://via.placeholder.com/400x600/1e293b/94a3b8?text=No+Poster";
    
//     // Split the comma-separated genres into red pill badges
//     const genreTags = movie.Genre !== "N/A" 
//         ? movie.Genre.split(',').map(genre => `<span class="px-3 py-1 bg-red-500/10 text-red-400 text-sm font-medium rounded-full border border-red-500/20">${genre.trim()}</span>`).join('')
//         : '';

//     movieDetailsContainer.innerHTML = `
//         <div class="flex flex-col md:flex-row gap-10 bg-slate-800/80 p-6 md:p-10 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-sm max-w-5xl mx-auto">
            
//             <!-- Left Side: Poster -->
//             <div class="w-full md:w-1/3 lg:w-1/4 shrink-0 mx-auto">
//                 <img src="${posterSrc}" alt="${movie.Title}" class="w-full max-w-[300px] md:max-w-none mx-auto h-auto rounded-2xl shadow-xl shadow-black/50 border border-slate-700/50 object-cover">
//             </div>
            
//             <!-- Right Side: Movie Details -->
//             <div class="flex-1 flex flex-col justify-start">
                
//                 <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
//                     ${movie.Title}
//                 </h1>
                
//                 <!-- Meta Info (Rating, Year, Runtime, Rated) -->
//                 <div class="flex flex-wrap items-center gap-3 text-slate-400 text-sm md:text-base font-medium mb-6">
//                     <span class="flex items-center gap-1.5 text-red-400 bg-red-400/10 px-2.5 py-1 rounded-md border border-red-400/20 font-bold">
//                         <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
//                         ${movie.imdbRating}
//                     </span>
//                     <span class="text-slate-600">•</span>
//                     <span>${movie.Year}</span>
//                     <span class="text-slate-600">•</span>
//                     <span>${movie.Runtime}</span>
//                     <span class="text-slate-600">•</span>
//                     <span class="border border-slate-600 px-2 py-0.5 rounded text-xs uppercase tracking-wider">${movie.Rated}</span>
//                 </div>

//                 <!-- Genre Tags -->
//                 <div class="flex flex-wrap gap-2 mb-8">
//                     ${genreTags}
//                 </div>

//                 <!-- Plot Summary -->
//                 <div class="mb-8">
//                     <h3 class="text-xl font-bold text-white mb-3 flex items-center gap-2">
//                         <span class="text-red-500">🔥</span> Plot Summary
//                     </h3>
//                     <p class="text-slate-300 leading-relaxed text-base/7">${movie.Plot}</p>
//                 </div>

//                 <!-- Cast & Crew Grid -->
//                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-[#0f172a]/80 rounded-2xl border border-slate-700/50 shadow-inner">
//                     <div>
//                         <span class="block text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Director</span>
//                         <span class="text-slate-200 font-medium">${movie.Director}</span>
//                     </div>
//                     <div>
//                         <span class="block text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Released</span>
//                         <span class="text-slate-200 font-medium">${movie.Released}</span>
//                     </div>
//                     <div class="sm:col-span-2">
//                         <span class="block text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Cast</span>
//                         <span class="text-slate-200 font-medium">${movie.Actors}</span>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;
// }


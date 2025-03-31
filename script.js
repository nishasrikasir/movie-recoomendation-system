const TMDB_API_KEY = "1a00025439048e5097457d7f22f70568"; // Replace with your TMDB API Key

async function getRecommendations() {
    let movieName = document.getElementById("movieInput").value;
    if (!movieName) {
        alert("Please enter a movie name!");
        return;
    }

    let searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieName)}`;

    try {
        let response = await fetch(searchURL);
        let data = await response.json();
        if (data.results.length === 0) {
            alert("Movie not found! Try another.");
            return;
        }

        let movieId = data.results[0].id;
        let recommendationsURL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`;
        let recResponse = await fetch(recommendationsURL);
        let recData = await recResponse.json();
        
        displayMovies(recData.results);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayMovies(movies) {
    let movieResults = document.getElementById("movieResults");
    movieResults.innerHTML = "";

    movies.forEach(movie => {
        let movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
            <p>${movie.release_date}</p>
        `;

        movieResults.appendChild(movieElement);
    });
}

// Scroll Functions
function scrollLeft() {
    document.getElementById("movieResults").scrollBy({ left: -300, behavior: "smooth" });
}

function scrollRight() {
    document.getElementById("movieResults").scrollBy({ left: 300, behavior: "smooth" });
}

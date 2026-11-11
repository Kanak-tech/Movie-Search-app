const API_KEY = 'YOUR_API_KEY_HERE'; 

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search1");
const message = document.getElementById("msg");
const results = document.getElementById("result");

async function getMovies(query) {
    message.textContent = "Loading....";
    results.innerHTML = "";

    
    const url = "https://www.omdbapi.com/?apikey=" + API_KEY + "&s=" + encodeURIComponent(query);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "False") {
            message.textContent = data.Error;
            return;
        }

        message.textContent = "Showing results";
        showMovies(data.Search);
    } catch (error) {
        message.textContent = "Some error occurred";
    }
}

function showMovies(movies) {
    for (const mov of movies) {
        
        const poster = mov.Poster !== "N/A"
            ? mov.Poster
            : "https://via.placeholder.com/180x260?text=No+Poster";

        results.innerHTML += `
            <div class="movie">
                <img src="${poster}" alt="${mov.Title}">
                <h1>${mov.Title}</h1>
                <h2>${mov.Year}</h2>
            </div>`;
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        getMovies(query);
    }
});

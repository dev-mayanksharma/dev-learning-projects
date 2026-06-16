const result = document.getElementById("result");
const loader = document.getElementById("loader");

async function moviefinder(url) {
    try {
        loader.classList.remove("hidden");
        result.innerHTML = "";

        const res = await fetch(url);

        if (!res.ok) {
            let errorMessage = res.statusText;
            try {
                
                const errorData = await res.json();
                if (errorData.Error) errorMessage = errorData.Error;
            } catch (e) {
                
            }
            throw new Error(`HTTP ${res.status}: ${errorMessage}`);
        }

        const data = await res.json();
        console.log(data);

        loader.classList.add("hidden");

        
        if (data.Response === "False") {
            result.innerHTML =
            `
                <div class="error">
                    <strong>OMDb API Error:</strong> <br> ${data.Error} ❌
                </div>
            `;
            return;
        }

        result.innerHTML =
        `
        <div class="movie-card">
            <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" alt="${data.Title}">
            <div class="movie-info">
                <h2>${data.Title}</h2>
                <div class="details">
                    <div class="detail-box"><strong>Year</strong><br>${data.Year}</div>
                    <div class="detail-box"><strong>IMDb</strong><br>⭐ ${data.imdbRating}</div>
                    <div class="detail-box"><strong>Genre</strong><br>${data.Genre}</div>
                    <div class="detail-box"><strong>Runtime</strong><br>${data.Runtime}</div>
                    <div class="detail-box"><strong>Language</strong><br>${data.Language}</div>
                    <div class="detail-box"><strong>Released</strong><br>${data.Released}</div>
                </div>
                <p><strong>Director:</strong> ${data.Director}</p><br>
                <p><strong>Actors:</strong> ${data.Actors}</p><br>
                <p class="plot"><strong>Plot:</strong> ${data.Plot}</p>
            </div>
        </div>
        `;

    } catch (error) {
        loader.classList.add("hidden");
        console.error("there is an error:", error);

        
        result.innerHTML =
        `
        <div class="error">
            <strong>Debug Error:</strong> <br> ${error.message} ⚠️
        </div>
        `;
    }
}

const btn = document.getElementById('search');

btn.addEventListener("click", () => {
    const movieName = document.getElementById("movie").value.trim();
    const API_KEY = document.getElementById("apikey").value.trim();

    if (!movieName || !API_KEY) {
        result.innerHTML =
        `
        <div class="error">
            Make sure you have entered API key and movie name.
        </div>
        `;
        return;
    }

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`;

    moviefinder(url);
});
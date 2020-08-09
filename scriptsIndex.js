

var writeMovie = document.getElementById('writeMovie');
var getMovieButton = document.getElementById('getMovieButton');


var moviesContainer = document.getElementById('moviesContainer');

getMovieButton.addEventListener('click', () => {
    var lettersWrote = writeMovie.value;

    fetch(`https://www.omdbapi.com/?apikey=fe7364b5&r=json&plot=full&s=${lettersWrote}`).then(Response => {
        return Response.json()
    }).then(data => {
        var arrayOfMovieInfo = extractMoviesInfo(data)
        var arrayOfFiltererdInfo = checkType(arrayOfMovieInfo)
        renderMoviesInfo(arrayOfFiltererdInfo)
    }).catch((error) => {
        console.error('Error:', error);
    });
})

var input = document.getElementById("myInput");

writeMovie.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        getMovieButton.click()
    }
})


function extractMoviesInfo(receivedData) {
    var movieList = []
    var movieInfo = []
    movieList.push(Object.entries(receivedData["Search"]))

    movieList.forEach((array) => {
        var currentArray = array
        currentArray.forEach((innerArray) => {
            var innerArr1 = innerArray
            innerArr1.forEach((innerArray) => {
                var innerArr2 = innerArray
                if (typeof innerArr2 === "object") {
                    movieInfo.push(innerArr2)
                }
            })
        })
    })
    return movieInfo
}

function checkType(moviesInfo) {
    var onlyMoviesSeries = []

    moviesInfo.forEach((movieInfo) => {
        if (movieInfo.Type === 'movie') {
            onlyMoviesSeries.push(movieInfo)
        }
    })

    return onlyMoviesSeries
}

function renderMoviesInfo(moviesInfo) {

    moviesContainer.innerHTML = '';

    moviesInfo.forEach((movie) => {


        var domContainer = document.createElement('div')
        domContainer.setAttribute('class', 'movies__container_block')
        var domContainerText = document.createElement('div')
        domContainerText.setAttribute('class', 'movies__container_block_text')

        domContainer.appendChild(domContainerText)

        var movieTitle = movie.Title;
        var movieYear = movie.Year;
        var movieType = movie.Type;
        var moviePosterUrl;
        movie.Poster === 'N/A' ? moviePosterUrl = `https://lh3.googleusercontent.com/8Wo6Eg3iUaLAz_tFaxGxW9QP3crthfIxXMILX84FMbQHgXHY2ewxf_lzYhpveG0iJQ` : moviePosterUrl = movie.Poster;
        var movieImdbID = movie.imdbID;


        var titleDom = document.createElement('h1');
        var yearDom = document.createElement('p');
        var typeDom = document.createElement('p');
        var posterDom = document.createElement('img');
        var buttonDom = document.createElement('input')

        titleDom.textContent = movieTitle;
        titleDom.setAttribute('class', 'container__block_title')
        yearDom.textContent = movieYear;
        yearDom.setAttribute('class', 'container__block_year')
        typeDom.textContent = movieType;
        typeDom.setAttribute('class', 'container__block_type')
        posterDom.setAttribute('src', moviePosterUrl);
        posterDom.setAttribute('class', 'container__block_image');

        Object.assign(buttonDom, {
            type: 'button',
            value: 'See details',
            name: titleDom.textContent,
            // name: imdbID,

        })
        buttonDom.setAttribute('class', 'container__block_button')

        buttonDom.addEventListener('click', (e) => {
            // idToBeSent.value = imdbID;
            location.href = `details.html?imdbid=${movieImdbID}`;


        })


        domContainerText.appendChild(titleDom)
        domContainerText.appendChild(yearDom)
        domContainerText.appendChild(typeDom)
        domContainer.appendChild(posterDom)
        domContainer.appendChild(buttonDom)

        moviesContainer.appendChild(domContainer)
    })

}
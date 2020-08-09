
var linkUrl = window.location.href
var storedId = linkUrl.split('=')[1]
// var storedId = splitter[1]
console.log(storedId)


var detailsContainer = document.getElementById('detailsContainer')





fetch(`https://www.omdbapi.com/?apikey=fe7364b5&r=json&plot=full&i=${storedId}`).then(result => {
    return result.json()
}).then(details => {
    console.log(details)
    renderDetails(details)
})

function renderDetails(details) {

    var title = details.Title;
    var year = details.Year;
    var rated = details.Rated;
    var released = details.Released;
    var runtime = details.Runtime;
    var country = details.Country;
    var dvd = details.DVD;
    var genere = details.Genre;
    var language = details.Language;
    var poster = details.Poster;
    var type = details.Type;

    var writers = details.Writer;
    var actors = details.Actors;
    var awards = details.Awards;
    var boxOffice = details.BoxOffice;
    var director = details.Director;

    var ratingsArray = []
    details.Ratings.forEach((source) => { ratingsArray.push(source.Source + " has given this film a score of " + source.Value) })
    var imdbRating = details.imdbRating;
    var imdbVotes = details.imdbVotes;


    //ALL CONTAINERS BY INFO CATEGORY

    var generalDetailsContainer = document.createElement('div')
    generalDetailsContainer.setAttribute('class' , 'details__container_general')

    var peopleAndAwardsContainer = document.createElement('div')
    peopleAndAwardsContainer.setAttribute('class' , 'details__container_people' , 'containers')

    var ratingsContainer = document.createElement('div')
    ratingsContainer.setAttribute('class' , 'details__container_ratings')



    //WILL GO IN "generalDetailsContainer"
    var containerGeneralTitleDom = document.createElement('h1')
    containerGeneralTitleDom.textContent = "General details about the movie"
    var titleDOM = document.createElement('p')
    titleDOM.innerText = "Movie's title : "  + title;
    var yearDOM = document.createElement('p')
    yearDOM.innerText = "Starting year : " + year;
    var ratedDOM = document.createElement('p')
    ratedDOM.innerText = "Rated : " + rated;
    var releasedDOM = document.createElement('p')
    releasedDOM.innerText = "Release date : " + released;
    var runtimeDOM = document.createElement('p')
    runtimeDOM.innerText = "Duration : " + runtime;
    var countryDOM = document.createElement('p');
    countryDOM.innerText = "Was filmed in : "  + country;
    var dvdDOM = document.createElement('p');
    dvdDOM.innerText = "DVD : " + dvd;
    var genereDOM = document.createElement('p');
    genereDOM.innerText = "Movie's genere : " + genere;
    var languageDOM = document.createElement('p');
    languageDOM.innerText = "Language spoken : " + language;
    var typeDOM = document.createElement('p');
    typeDOM.innerText = "Type : " + type;
    var posterDOM = document.createElement('img');
    poster === 'N/A' ?  posterDOM.setAttribute('src' , 'https://lh3.googleusercontent.com/8Wo6Eg3iUaLAz_tFaxGxW9QP3crthfIxXMILX84FMbQHgXHY2ewxf_lzYhpveG0iJQ')  : posterDOM.setAttribute('src', poster)
 


     //WILL GO IN "peopleAndAwardsContainer"
     var containerPeopleTitleDom = document.createElement('h1')
     containerPeopleTitleDom.textContent = "People involved and awards"
    var actorsDOM = document.createElement('p')
    actorsDOM.innerText = "Actors : " + actors;
    var awardsDOM = document.createElement('p')
    awardsDOM.innerText = "Awards : " + awards;
    var boxOfficeDOM = document.createElement('p')
    boxOfficeDOM.innerText = "Box Office : " + boxOffice;
    var directorDOM = document.createElement('p');
    directorDOM.innerText = "Director : " + director;
    var writersDOM = document.createElement('p');
    writersDOM.innerText = "Writer/Writers : " + writers;

   //WILL GO IN "ratingsContainer"
    var containerRatingsTitleDom = document.createElement('h1')
    containerRatingsTitleDom.textContent = "Offered ratings and scores"
    var imdbRatingDOM = document.createElement('p');
    imdbRatingDOM.innerText = "IMDB rating : " + imdbRating;
    var imdbVotesDOM = document.createElement('p');
    imdbVotesDOM.innerText = 'IMDB votes : ' + imdbVotes;




    //APPEND ALL INFORMATION TO CORESPONDING SMALLER CONTAINER
    
     //WILL GO IN "generalDetailsContainer"
    childAppend(containerGeneralTitleDom, generalDetailsContainer);
    childAppend(titleDOM, generalDetailsContainer);
    childAppend(yearDOM, generalDetailsContainer);
    childAppend(ratedDOM, generalDetailsContainer);
    childAppend(releasedDOM, generalDetailsContainer);
    childAppend(runtimeDOM, generalDetailsContainer);
    childAppend(countryDOM, generalDetailsContainer);
    childAppend(dvdDOM, generalDetailsContainer);
    childAppend(genereDOM, generalDetailsContainer);
    childAppend(languageDOM, generalDetailsContainer);
    childAppend(typeDOM, generalDetailsContainer);
    childAppend(posterDOM, generalDetailsContainer);
   
     //WILL GO IN "peopleAndAwardsContainer"

    childAppend(containerPeopleTitleDom, peopleAndAwardsContainer);
    childAppend(directorDOM, peopleAndAwardsContainer);
    childAppend(boxOfficeDOM, peopleAndAwardsContainer);
    childAppend(writersDOM, peopleAndAwardsContainer);
    childAppend(actorsDOM, peopleAndAwardsContainer);
    childAppend(awardsDOM, peopleAndAwardsContainer);


   //WILL GO IN "ratingsContainer"
    
    childAppend(containerRatingsTitleDom, ratingsContainer)
    ratingsArray.forEach((element) => {
        var rating = document.createElement('p')
        rating.innerText = element
        ratingsContainer.appendChild(rating)
    })

    childAppend(imdbRatingDOM, ratingsContainer)
    childAppend(imdbVotesDOM , ratingsContainer)


    //APPEND ALL SMALLER CONTAINERS TO HTML ELEMENT DETAILSCONTAINER
    
    childAppend(generalDetailsContainer, detailsContainer)
    childAppend(peopleAndAwardsContainer, detailsContainer)
    childAppend(ratingsContainer, detailsContainer)

}

function childAppend(whatToAppend, whereToAppend) {
    whereToAppend.appendChild(whatToAppend)
}
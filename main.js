let showSearchBox=document.getElementById('searchBoxMovie');
let searchList=document.getElementById('list');
let resultGrid=document.getElementById('result-grid');

async function loadShows(searchShow){
    // let URL= `https://api.tvmaze.com/search/shows?q=${searchTerm}`
    let URL=`https://api.tvmaze.com/search/shows?q=${searchShow}`
    let response=await fetch(`${URL}`);
    let data=await response.json();
    // console.log(data.search);
    if(data.response=='true') displayShowList(data.search);
}

function findShows(){
    let searchShow=(showSearchBox.value).trim();

    if(searchShow.length>0){
        searchList.classList.remove('hide-search-list');
        loadShows(searchShow);
    }else{
        searchList.classList.add('hide-search-list')
    }
}

function displayShowList(shows){
    searchList.innerHTML="";
    for(let index=0;index<shows.length;index++){
        let showListItem=document.createElement('div');
showListItem.dataset.id=shows[index].id;
showListItem.classList.add('showListItem');
if(shows[index].poster!='N/A')
showPoster=shows[index].poster;
else
showPoster='image_not_found.png'

showListItem.innerHTML=`<div class = "search-item-thumbnail">
<img src = "${showPoster}">
</div>
<div class = "search-item-info">
<h3>${shows[index].name}</h3>
<p>${shows[index].premiered}</p>
</div>`;
searchList.appendChild(showListItem)
    }
    loadShowDetails();
}

function loadShowDetails(){
    let  searchListShows=searchList.querySelectorAll('.search-list-item')
    searchListShows.forEach(show=>{
        show.addEventListener('click', async()=>{
            searchList.classList.add('hide-search-list');
            showSearchBox.value="";
            let result=await fetch(`https://api.tvmaze.com/search/shows?q=${show.dataset.id}`)
            // let result=await fetch(`https://api.tvmaze.com/?q=${show.dataset.id}&page=1&apikey=fc1fef96`)
            let showDetails=await result.json();

            displayShowDetails(showDetails)

        });
    });
}
function displayShowDetails(details){
    resultGrid.innerHTML=`
    <div class = "show-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "show poster">
    </div>
    <div class = "show-info">
        <h3 class = "show-title">${details.name}</h3>
        <ul class = "show-misc-info">
            <li class = "year">Year: ${details.premiered}</li>
            <li class = "rated">Ratings: ${details.rating}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genres}</p>
        // <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        // <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        // <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.language}</p>
        // <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}

window.addEventListener('click',(event)=>{
    if(event.target.className!='form'){
        searchList.classList.add('hide-search-list')
    }
});
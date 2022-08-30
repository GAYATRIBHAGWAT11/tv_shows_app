

let showSearchBox=document.getElementById('searchBoxMovie');
let searchList=document.getElementById('list');
let resultGrid=document.getElementById('result-grid');

let showPoster;

async function loadShows(searchShow){

    let URL=`https://api.tvmaze.com/search/shows?q=${searchShow}`
    let response=await fetch(`${URL}`);
    let data=await response.json();
    console.log(data);
    displayShowList(data);
}

function findShows(){
    let searchShow=showSearchBox.value

    if(searchShow.length>0){
        searchList.classList.remove('hide-search-list');
        loadShows(searchShow);
    }else{
        searchList.classList.add('hide-search-list')
    }
}

function displayShowList(shows){
    searchList.innerHTML=`<div></div>`;
    for(let index=0;index<shows.length;index++){
        console.log(shows[index])
        let showListItem=document.createElement('div');
        showListItem.dataset.id=shows[index].id;
        showListItem.classList.add('search-list-item');
        if(shows[index].show.image.medium!='N/A')
         showPoster=shows[index].show.image.medium;
        else
        showPoster='image_not_found.png'

        showListItem.innerHTML=`<div class = "search-item-thumbnail">
<img src = "${showPoster}">
</div>
<div class = "search-item-info">
<h3>${shows[index].show.name}</h3>
<p>${shows[index].show.premiered}</p>
</div>`;
searchList.append(showListItem)
    }
    // loadShowDetails()
}

// function loadShowDetails(){
//     let  searchListShows=searchList.querySelectorAll('.search-list-item')
//     searchListShows.forEach(show=>{
//         show.addEventListener('click', async()=>{
//             searchList.classList.add('hide-search-list');
//             showSearchBox.value="";
//             let result=await fetch(`https://api.tvmaze.com/search/shows?q=${show.dataset.id}`)
//             // let result=await fetch(`https://api.tvmaze.com/?q=${show.dataset.id}&page=1&apikey=fc1fef96`)
//             let showDetails=await result.json();

//             displayShowDetails(showDetails)

//         });
//     });
// }
function displayShowDetails(details){
    resultGrid.innerHTML=`
    <div class = "show-poster">
        <img src = "${(details.show.image.medium != "N/A") ? details.show.image.medium : "image_not_found.png"}" alt = "show poster">
    </div>
    <div class = "show-info">
        <h3 class = "show-title">${details.show.name}</h3>
        <ul class = "show-misc-info">
            <li class = "year">Year: ${details.show.premiered}</li>
            <li class = "rated">Ratings: ${details.show.rating}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.show.Genres}</p>
        <p class = "language"><b>Language:</b> ${details.show.language}</p>

    </div>
    `;
}

window.addEventListener('click',(event)=>{
    if(event.target.className!='form'){
        searchList.classList.add('hide-search-list')
    }
});
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films'
const API_SEARCH_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films', {
    method: 'GET', 
    headers: { 
        'X-API-KEY': '0da124d8-8343-4211-b3fe-4cb56d369d0c', 
        'Content-Type': 'application/json', 
    }, 
}) 
    .then(res => res.json()) 
    .then(json => gettingElementsFromApi(json)) 
    .catch(err => console.log(err))


function gettingElementsFromApi(json){
    const catalog = json.items //Array
    document.querySelector('.catalog').innerHTML = ''
    catalog.map(el => {
        const card = markup(el)
        document.querySelector('.catalog').insertAdjacentHTML('beforeend', card)
    }) 
}

const markup = (info) => {
    //Destructuring
    const {
        kinopoiskId: id,
        nameRu: name,
        posterUrlPreview: image,
        ratingKinopoisk: rating,
        genres
    } = info

    return html = `
        <div class="catalog-card">
            <div class="card-image" style="background-image: url('${image}');">
                <div class="review">${rating}</div>
            </div>
            <div class="card-text">
                <h3>${name}</h3>
                <span>${genres.map(el => ` ${el.genre}`)}</span>
            </div>
        </div>
    `
}
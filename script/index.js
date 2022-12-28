const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films'
const API_SEARCH_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='


const fetching = async (url) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': '0da124d8-8343-4211-b3fe-4cb56d369d0c',
            'Content-Type': 'application/json'
        }
    })
    const json = await res.json()
    gettingElementsFromApi(json)
}
fetching(API_URL)


//Функция получения элементов из апи
function gettingElementsFromApi(json){
    let catalog = json.items //Array
        catalog ? catalog : catalog = json.films //Проверка полученного JSON

    //Очищаем каталог
    document.querySelector('.catalog').innerHTML = ''

    catalog.map(el => {
        const card = markup(el)
        document.querySelector('.catalog').insertAdjacentHTML('beforeend', card)
    }) 
}


//Функция на получение цвета, исходя из значения рейтинга
const getColorRating = (val) => {
    return val > 9 ? val = 'review-green' : val > 6 && val < 9 ? 'review-orange' : 'review-red'
}

//Вырисовка разметки
const markup = (info) => {
    //Destructuring
    const {
        kinopoiskId: id,
        nameRu: name,
        posterUrlPreview: image,
        ratingKinopoisk: rate,
        rating,
        genres
    } = info

    //Проверка рейтинга в полученном JSON
    let ratingFilm = rate === undefined ? rating : rate
        ratingFilm == 'null' ? ratingFilm = '' : ratingFilm //Проверка на null

    return html = `
        <div class="film-card">
            <img src="${image}" alt="" class="card-image">
            ${ratingFilm && (`
                    <div class="review ${getColorRating(ratingFilm)}">
                        <h2>${ratingFilm}</h2>
                    </div>
            `)}
            <div class="card-text">
                <h2>${name}</h2>
                <span>${genres.map(el => ` ${el.genre}`)}</span>
            </div>
        </div>
    `
}


//Отправка формы/генерация нового объекта с данными, исходя из запроса
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const inputResp = document.querySelector('.header-search')
    fetching(`${API_SEARCH_URL}${inputResp.value}`)
    inputResp.value = ''
})
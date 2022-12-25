const link = 'http://api.weatherapi.com/v1/current.json?key=317c880b2a60423790b93440222112&'
//Находим элементы страницы
let city = document.querySelector('#cityName')
const btn = document.getElementById('weatherGenerate')
let cardColor = ''

//Создаем коллекцию элементов
let collection = {
    city: city.value,
    country: 'Country',
    tempC: 0,
    condition: {
        icon: 'link',
        conditionTitle: 'Title'
    },
    lastUpdated: '00:00 AM'
}
// export { collection }

const getApiWeather = async(city2) => {
    //Получаем отклик
    try{
        const res = await fetch(`${link}&q=${city2 === '' ? city2 = 'Москва' : city2}`)
        //Получаем объект json формата
        const weatherObject = await res.json()
    
        //Деструктурируем полученный объект с нужными параметрами
        const {
            location: {
                country,
                name: city
            },
            current: {
                temp_c: tempC,
                condition: {
                    icon,
                    text: conditionTitle
                },
                last_updated: lastUpdated
            }
        } = weatherObject
    
        //Получаем новую коллекцию из обновленных элементов
        collection = {
            city,
            country,
            tempC,
            icon,
            conditionTitle,
            lastUpdated
        }
        
        //Рендерим на страницу
        renderPage()
    }
    catch(e){
        console.error((`Error: ${e}`))
    }
    
}
getApiWeather(city.value)

const appWeather = () => {
    const {city, country, tempC, icon, conditionTitle, lastUpdated} = collection
    //Задаем цвет в зависимости от температуры
    cardColor = Math.floor(tempC) > 0 ? cardColor = 'linear-gradient(322.09deg, rgba(249, 57, 57, 0.2) 13.99%, rgba(255, 98, 98, 0.2) 104.25%), linear-gradient(273.21deg, #F94545 -7%, rgba(255, 80, 80, 0.65) 102.49%)'
                : cardColor = 'linear-gradient(322.09deg, rgba(57, 88, 249, 0.2) 13.99%, rgba(101, 98, 255, 0.2) 104.25%), linear-gradient(273.21deg, #4557F9 -7%, rgba(83, 80, 255, 0.65) 102.49%)'
    let html = `
        <div class="weather-prevyu__wrap">
            <h1>${Math.floor(tempC)}°</h1>
            <h2>${city}</h2>
        </div>
        <div class="weather-info__wrap">
            <div class="weather-info_text">
                <h2>${lastUpdated}</h2>
                <h3>${country}</h3>
                <h3>${conditionTitle}</h3>
            </div>
            <div class="weather-info_icon">
                <img src="http:${icon}" alt="">
            </div>
        </div>
    `
    return html
}

const renderPage = () => {
    const weatherCard =  document.querySelector('.weather-card')
    weatherCard.innerHTML = appWeather()
    weatherCard.style.background = cardColor
}

btn.addEventListener('click', () => {
    getApiWeather(city.value)
})



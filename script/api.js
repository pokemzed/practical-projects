const link = 'http://api.weatherapi.com/v1/current.json?key=317c880b2a60423790b93440222112&'
//Находим элементы страницы
let city = document.querySelector('#cityName')
const btn = document.getElementById('weatherGenerate')

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
    let html = `
        <h1>${country}</h1>
        <h2>${city}</h2>
        <span>${Math.floor(tempC)}</span>
        <br>
        <img src="http:${icon}"/>
    `
    return html
}

const renderPage = () => {
    document.querySelector('.weather').innerHTML = appWeather()
}

btn.addEventListener('click', () => {
    getApiWeather(city.value)
})
// const generatePageOfInputValue = () => {}






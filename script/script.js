const currentDate = document.querySelector('.current-date'),
    daysTag = document.querySelector('.days'),
    prevNext = document.querySelectorAll('.icons img')

let date = new Date()
let currYear = date.getFullYear(),
    currMonth = date.getMonth()

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]


const renderCurrentDate = () => {
    let firstDayfMonth = new Date(currYear, currMonth, 1).getDay(), // get first day of prev month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // get last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // get last day of next month
        lastDetofLastMonth = new Date(currYear, currMonth, 0).getDate() // get last date of prev month


    let liTag = ''


    //adding liTag tags with days
    for(let i = firstDayfMonth; i > 0; i--){
        liTag += `<li class='no-active'>${lastDetofLastMonth - i + 1}</li>`
    }
    for(let i = 1; i <= lastDateofMonth; i++){
        liTag += `<li>${i}</li>`
    }
    for(let i = lastDayofMonth; i < 6; i++){
        liTag += `<li class='no-active'>${i - lastDayofMonth + 1}</li>`
    }

    //render date
    currentDate.innerHTML = `${months[currMonth]} ${currYear}`
    daysTag.innerHTML = liTag
}
renderCurrentDate()

//checking months
const checkCurrentMonthPrev = (month) => {
    return month < 0 ? 0 : month
}
const checkCurrentMonthNext = (month) => {
    return month > 11 ? 11 : month
}

//event for arrow-button
prevNext.forEach(icon => {
    icon.addEventListener('click', () => {
        currMonth = icon.id === 'prev' ? checkCurrentMonthPrev(currMonth-1) : checkCurrentMonthNext(currMonth + 1)
        console.log(currMonth)
        renderCurrentDate()
    })
})
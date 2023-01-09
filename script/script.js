const input = document.getElementById('inputText'),
    button = document.getElementById('result'),
    mathElements = [...document.querySelectorAll('td')]

let firstValue = undefined
let secondValue = undefined
let symbol = undefined

mathElements.map(el => {
    el.addEventListener('click', () => {
        firstValue = Number(input.value)
        input.value = ''
        symbol = el.textContent

        if(secondValue){
            return
        }
        input.setAttribute('placeholder', 'Введите второе значение')
    })
})


button.addEventListener('click', () => {
    secondValue = Number(input.value)
    input.value = calculate(symbol, firstValue, secondValue)

    // firstValue, secondValue, symbol = undefined
    // input.setAttribute('placeholder', 'Введите первое значение')
})


function calculate(sym, fV, sV){
    if(sym == '*'){
        return fV * sV
    } else if(sym == '+'){
        return fV + sV
    } else if(sym == '-'){
        return fV - sV
    } else if(sym == '/'){
        return sV !== 0 ? fV / sV : 'На ноль делить нельзя'
    }
}
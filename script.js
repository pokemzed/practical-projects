//Определение элементов страницы
const inputRange = document.querySelector('#inputRange')
const inputCount = document.querySelector('#inputValueCount')
const btnGenerate = document.querySelector('#buttonGenerate')
const btnCopy = document.querySelector('#buttonCopy')
const result = document.querySelector('.send_result')


//Функция на связь с input 'text'
function valueRangeInput(){
    let valueRange = inputRange.value
    inputCount.value = valueRange

    return generatePassword(Number(valueRange))
}

//Функция на связь с input 'range'
function valueTextInput(){
    let valueText = inputCount.value
    inputRange.value = valueText


    return generatePassword(Number(valueText))
}


//Функция рандомного набора символов
const randomStroke = (...el) =>{
    let str = [...el].join('')
    return str[Math.floor(Math.random() * str.length)]
}


//Функция генерации пароля
const generatePassword = (val) => {
    //Делаем проверку и изменяем, если val > 50
    val = val > 25 ? val = 25 : val

    //Создаем символы
    let numbers = '1234567890'
    let symbols = '!@#$%^&*()_+|?{}[]~`\/|'
    let lettersUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let lettersDown = lettersUp.toLowerCase()
    let password = ''

    //Генерация пароля
    for(let i = 0; i <= val; i++){
        password += randomStroke(numbers,symbols,lettersUp,lettersDown)
    }

    //Вывод пароля и присваивание его в переменную result
    result.innerHTML = password
    return password
}


//Функция копирования текста
const copyText = () => navigator.clipboard.writeText(result.textContent)
btnCopy.onclick = copyText

//Функция генерации пароля по кнопке
btnGenerate.onclick = valueTextInput
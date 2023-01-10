const dino = document.getElementById('dino'),
    cactus = document.getElementById('cactus'),
    myCount = document.getElementById('count')

let count = 0

document.addEventListener('keydown', (e) => {
    if(e.code.toLowerCase() === 'space'){
        jumpDino()
        count += 100
    }
    jumpDinoRemove()
})

const jumpDino = () => dino.classList.add('jump')
const jumpDinoRemove = () => dino.classList.value === '' ? true 
                    : setTimeout(() => { dino.classList.remove('jump') }, 400)

const isAlive = setInterval( () => {
    myCount.textContent = count++
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'))
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'))
    if(cactusLeft < 80 && cactusLeft > 0 && dinoTop >= 125){
        alert('GAME OVER')

        //Возвращаем в исходное значение
        count = 0
        cactus.style.left = '580px'
    }

}, 10)
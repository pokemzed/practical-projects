const generateColor = () => {
    let libary = '0123456789ABCDEF'
    let color = ''
    for(let i = 0; i < 6; i++){
        color += libary[Math.floor(Math.random() * libary.length)]
    }
    return '#' + color
}

//Дрилл ебашит как надо
// setInterval(()=>{document.querySelector('body').style.background = generateColor()},10)


//На спейс тыкай, да
document.addEventListener('keydown', (e) => {
    if(e.code.toUpperCase() === 'SPACE'){
        document.querySelector('body').style.background = generateColor()
    }
})


const el = document.querySelector('.el')
const elEnd = document.querySelector('.el-endGame')
const cursorHover = () => {
    let elEndX = Math.floor(Math.random() * 1200)
    let elEndY = Math.floor(Math.random() * 600)
    elEnd.style.cssText = `
        top: ${elEndY}px;
        left: ${elEndX}px;
    `

    document.addEventListener('mousemove', (e) => {
        document.querySelector('body').style.cursor = 'none'
        el.style.left = `${e.clientX}px`
        el.style.top = `${e.clientY}px`
        if(e.clientY === elEndY && e.clientX === elEndX){
            alert('YOU WIN!')
            location.reload()
        }
    })
}
cursorHover()
setInterval(() => {
    document.querySelector('body').style.background = generateColor()
}, 10)
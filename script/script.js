const API = async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await resp.json()

    return data
}

const main = async () => {
    const postsData = await API()
    let currentPage = 1
    let rows = 10
    
    const displayList = (arrApi, rowPerPage, page) => {
        //Находим элемент
        const postsEl = document.querySelector('.posts')
        
        //Обозначаем элементы старта и конца, обрезаем массив
        page--
        const start = rowPerPage * page
        const end = start + rowPerPage
        const paganetedApi = arrApi.slice(start, end)

        //Проходим циклом по обрезанному массиву и выводим элементы на страницу
        paganetedApi.map(el => {
            const postEl = document.createElement('div')
            postEl.classList.add('post')
            postEl.innerText = `${el.title}`
            postsEl.appendChild(postEl)
        })
    }
    const displayPagination = (arrApi, rowPerPage) => {
        //Находим элемент на странице
        const paginationEL = document.querySelector('.pagination')

        //Определяем итоговое число, являющееся счетчиком
        const pagesCount = Math.ceil(arrApi.length / rowPerPage)

        //Создаем элементы списка
        const ulEl = document.createElement('ul')
        ulEl.classList.add('pagination__list')

        //Проходим циклом
        for(let i = 0; i < pagesCount; i++){
            const liEl = displayPaginationBtn(i + 1)
            ulEl.appendChild(liEl)
        }
        //Добавляем в дерево переменную
        paginationEL.appendChild(ulEl)
    }
    const displayPaginationBtn = (page) => {
        const liEl = document.createElement('li')
        liEl.classList.add('pagination__item')
        liEl.innerText = page

        liEl.addEventListener('click', () => {
            currentPage = page
            displayList(postsData, rows, currentPage)
        })
        return liEl
    }
    displayList(postsData, rows, currentPage)
    displayPagination(postsData, rows)
}
main()
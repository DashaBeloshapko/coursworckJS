'use strict'

const root = document.getElementById('root')

const wrapperMain = document.createElement('div')
const header = document.createElement('header')
const headerTitle = document.createElement('h3')
const headerTime = document.createElement('div')
const main = document.createElement('main')
const cardWrapTodo = document.createElement('div')
const cardWrapTodoShadow = document.createElement('div')
const cardWrapProg = document.createElement('div')
const cardWrapProgShadow = document.createElement('div')
const cardWrapDone = document.createElement('div')
const cardWrapDoneShadow = document.createElement('div')
const cardTodoDesk = document.createElement('div')
const cardProgDesk = document.createElement('div')
const cardDoneDesk = document.createElement('div')
const wrapTodoTitle = document.createElement('div')
const wrapTodoTitleShadow = document.createElement('div')
const wrapProgTitle = document.createElement('div')
const wrapProgTitleShadow = document.createElement('div')
const wrapDoneTitle = document.createElement('div')
const wrapDoneTitleShadow = document.createElement('div')
const wrapTodoBut = document.createElement('div')
const wrapTodoButShadow = document.createElement('div')
const TodoBut = document.createElement('button')
const wrapProgBut = document.createElement('div')
const wrapProgButShadow = document.createElement('div')
const ProgBut = document.createElement('button')
const wrapDoneButShadow = document.createElement('div')
const wrapDoneBut = document.createElement('div')
const DoneBut = document.createElement('button')
const cardTitleTodo = document.createElement('h5')
const cardTitleProg = document.createElement('h5')
const cardTitleDone = document.createElement('h5')
const cardTitleTodoKol = document.createElement('div')
const cardTitleProgKol = document.createElement('div')
const cardTitleDoneKol = document.createElement('div')

wrapperMain.classList = ['wrapperMain']
header.classList = ['header']
main.classList = ['main']
cardWrapTodo.classList = ['cardWrap todocolor']
cardWrapProg.classList = ['cardWrap progcolor']
cardWrapDone.classList = ['cardWrap donecolor']
cardTodoDesk.classList = ['cardDesk']
cardProgDesk.classList = ['cardDesk']
cardDoneDesk.classList = ['cardDesk']
headerTitle.classList = ['headerTitle']
headerTime.classList = ['headerTime']
wrapTodoTitle.classList = ['wrapCardTitle wrapCardTitle-todo']
wrapProgTitle.classList = ['wrapCardTitle wrapCardTitle-prog']
wrapDoneTitle.classList = ['wrapCardTitle wrapCardTitle-done']
TodoBut.classList = ['wrapBut wrapBut-Todo']
ProgBut.classList = ['wrapBut wrapBut-Prog']
DoneBut.classList = ['wrapBut wrapBut-Done']
cardTitleTodo.classList = ['cardTitle']
cardTitleProg.classList = ['cardTitle']
cardTitleDone.classList = ['cardTitle']
cardTitleTodoKol.classList = ['cardTitleKol']
cardTitleProgKol.classList = ['cardTitleKol']
cardTitleDoneKol.classList = ['cardTitleKol']
wrapTodoTitleShadow.classList = ['wrapTodoTitleShadow']
wrapProgTitleShadow.classList = ['wrapProgTitleShadow']
wrapDoneTitleShadow.classList = ['wrapDoneTitleShadow']
wrapTodoButShadow.classList = ['wrapTodoButShadow']
wrapProgButShadow.classList = ['wrapProgButShadow']
wrapDoneButShadow.classList = ['wrapDoneButShadow']
wrapTodoBut.classList = ['wrapButton']
wrapProgBut.classList = ['wrapButton wrapButtonProg']
wrapDoneBut.classList = ['wrapButton']
cardWrapTodoShadow.classList = ['cardWrapTodoShadow']
cardWrapProgShadow.classList = ['cardWrapProgShadow']
cardWrapDoneShadow.classList = ['cardWrapDoneShadow']

// создание даты в header
const getDate = () => {
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    return (hours > 9 ? hours : '0' + hours) + ' : ' + (minutes > 9 ? minutes : '0' + minutes)
}

headerTitle.innerText = 'Trello'
setInterval(() => { headerTime.innerText = getDate() }, 1000)
TodoBut.innerText = 'Add todo'
DoneBut.innerText = 'Delete All'
cardTitleTodo.innerText = 'TODO:'
cardTitleProg.innerText = 'IN PROGRESS:'
cardTitleDone.innerText = 'DONE:'

root.append(wrapperMain)
wrapperMain.append(header, main)
header.append(headerTitle, headerTime)
main.append(cardWrapTodo, cardWrapProg, cardWrapDone)
cardWrapTodo.append(cardWrapTodoShadow, wrapTodoTitle, cardTodoDesk, wrapTodoBut)
cardWrapProg.append(cardWrapProgShadow, wrapProgTitle, cardProgDesk, wrapProgBut)
cardWrapDone.append(cardWrapDoneShadow, wrapDoneTitle, cardDoneDesk, wrapDoneBut)
wrapTodoTitle.append(wrapTodoTitleShadow, cardTitleTodo, cardTitleTodoKol)
wrapProgTitle.append(wrapProgTitleShadow, cardTitleProg, cardTitleProgKol)
wrapDoneTitle.append(wrapDoneTitleShadow, cardTitleDone, cardTitleDoneKol)
wrapTodoBut.append(wrapTodoButShadow, TodoBut)
wrapProgBut.append(wrapProgButShadow, ProgBut)
wrapDoneBut.append(wrapDoneButShadow, DoneBut)

const todos = []
const KEY_TODO = 'keyTodo'

const inProcess = []
const KEY_INPROC = 'keyInProcess'

const done = []
const KEY_DONE = 'keyDone'

cardTitleTodoKol.innerText = todos.length
cardTitleProgKol.innerText = inProcess.length
cardTitleDoneKol.innerText = done.length

// вызов окна для создания задания
wrapTodoBut.addEventListener('click', () => {
    header.classList.add('transparency')
    main.classList.add('transparency')
    const getWin = generateWishCard()
    getWin.classList.add('openCardWish')

    // закрыть окно без изменений
    getWin.addEventListener('click', (event) => {
        const clickCancel = event.target
        if (clickCancel.innerText === 'Cancel') {
            header.classList.remove('transparency')
            main.classList.remove('transparency')
            getWin.remove()
        }
    })

    //создать карточку на доске todo
    getWin.addEventListener('click', (event) => {
        const clickConfirm = event.target
        if (clickConfirm.innerText === 'Confirm') {

            const todoDiscription = getWin.getElementsByClassName('cardWishDescript')[0]
            const todoTitle = getWin.getElementsByClassName('cardWishTitle')[0]
            const select = getWin.querySelector('#select')

            const cardTodo = ganerateCard()
            cardTodo.id = Date.now().toString()
            const lastNumId = Number(cardTodo.id.slice(-1))
            if (lastNumId % 3 === 0) {
                cardTodo.classList.add('cardWrapTodo-1')
            } else if (lastNumId % 2 === 0) {
                cardTodo.classList.add('cardWrapTodo-2')
            } else {
                cardTodo.classList.add('cardWrapTodo-3')
            }

            const title = cardTodo.getElementsByClassName('cardOnDeskHeaderTitle')[0]
            title.innerText = todoTitle.value

            const headerButEdit = cardTodo.getElementsByClassName('cardOnDeskHeaderBut-1')[0]
            headerButEdit.innerText = 'EDIT'

            const headerButDelete = cardTodo.getElementsByClassName('cardOnDeskHeaderBut-2')[0]
            headerButDelete.innerText = 'DELETE'

            const description = cardTodo.getElementsByClassName('cardOnDeskMainDescr')[0]
            description.innerText = todoDiscription.value

            const user = cardTodo.getElementsByClassName('cardOnDeskFooterUser')[0]
            user.innerText = select.value

            const time = cardTodo.getElementsByClassName('cardOnDeskFooterTime')[0]
            time.innerText = headerTime.innerText

            const data = {
                id: cardTodo.id,
                title: title.innerText,
                description: description.innerText,
                time: time.innerText,
                user: user.innerText,
            }

            todos.push(data)

            header.classList.remove('transparency')
            main.classList.remove('transparency')
            getWin.remove()

            cardTodoDesk.append(cardTodo)
        }
        localStorage.setItem(
            KEY_TODO,
            JSON.stringify(todos)
        )

        cardTitleTodoKol.innerText = todos.length
    })
})

// карточка для создания задания
const generateWishCard = () => {
    const cardWish = document.createElement('div')
    cardWish.classList = ['cardWish']

    const cardWishWrap = document.createElement('div')
    cardWishWrap.classList = ['cardWishWrap']

    const cardWishTitle = document.createElement('input')
    cardWishTitle.classList = ['cardWishTitle']
    cardWishTitle.type = 'text'
    cardWishTitle.placeholder = 'Title'

    const cardWishDescript = document.createElement('textarea')
    cardWishDescript.classList = ['cardWishDescript']
    // cardWishDescript.type = 'text'
    cardWishDescript.placeholder = 'Description'

    const cardWishFooter = document.createElement('div')
    cardWishFooter.classList = ['cardWishFooter']

    const wishFooterSelect = document.createElement('select')
    const optionSelectFirst = document.createElement('option')

    wishFooterSelect.classList = ['wishFooterSelect']
    wishFooterSelect.id = 'select'
    optionSelectFirst.classList = ['option option-first']

    const wishFooterButCancel = document.createElement('button')
    const wishFooterButConfirm = document.createElement('button')

    wishFooterButCancel.classList = ['wishFooterBut cancel']
    wishFooterButConfirm.classList = ['wishFooterBut confirm']

    optionSelectFirst.innerText = 'Select user'
    wishFooterButCancel.innerText = 'Cancel'
    wishFooterButConfirm.innerText = 'Confirm'

    // вызов раскрывающегося списка с работниками    
    wishFooterSelect.addEventListener('click', getFetch())
    function getFetch() {
        fetch('https://65d3a395522627d5010950a6.mockapi.io/Users')
            .then(res => res.json())
            .then(data => {
                data.forEach(element => {
                    const option = document.createElement('option')
                    option.classList = ['option']
                    option.innerText = element.name
                    option.value = element.name
                    wishFooterSelect.append(option)
                })
            })
    }

    cardWish.append(cardWishWrap)
    cardWishWrap.append(cardWishTitle, cardWishDescript, cardWishFooter)
    cardWishFooter.append(wishFooterSelect, wishFooterButCancel, wishFooterButConfirm)
    wishFooterSelect.append(optionSelectFirst)
    wrapperMain.append(cardWish)

    return cardWish
}

// удаление одной карточки с доски
wrapperMain.addEventListener('click', (event) => {
    const clickDelete = event.target

    if (clickDelete.innerText === 'DELETE') {
        const deleteCard = clickDelete.closest('.cardWrapOnDesk')
        deleteCard.remove()
        const index = todos.findIndex(item => {
            return item.id === deleteCard.id
        })

        todos.splice(index, 1)
        localStorage.setItem(
            KEY_TODO,
            JSON.stringify(todos)
        )
        cardTitleTodoKol.innerText = todos.length
    }
})

// изменение карточки на доске todo
wrapperMain.addEventListener('click', (event) => {
    const clickEdit = event.target

    if (clickEdit.innerText === 'EDIT') {
        header.classList.add('transparency')
        main.classList.add('transparency')
        const getEdit = generateWishCard()
        getEdit.classList.add('openCardWish')

        const todoTitle = getEdit.getElementsByClassName('cardWishTitle')[0]
        const titleHeader = clickEdit.closest('.cardOnDeskHeader')
        const todoTitleOnDesk = titleHeader.getElementsByClassName('cardOnDeskHeaderTitle')[0]
        todoTitle.value = todoTitleOnDesk.innerText

        const todoDiscription = getEdit.getElementsByClassName('cardWishDescript')[0]
        const descrMain = clickEdit.closest('.cardWrapOnDesk')
        const todoDiscrOnDesk = descrMain.getElementsByClassName('cardOnDeskMainDescr')[0]
        todoDiscription.value = todoDiscrOnDesk.innerText

        const select = getEdit.querySelector('.option-first') //лист задание
        const selectMain = clickEdit.closest('.cardWrapOnDesk')
        const selectVal = selectMain.getElementsByClassName('cardOnDeskFooterUser')[0] //карточка на доске
        select.innerText = selectVal.innerText
        select.value = selectVal.innerText

        // отмена изменений
        getEdit.addEventListener('click', (event) => {
            const clickCancel = event.target
            if (clickCancel.innerText === 'Cancel') {
                header.classList.remove('transparency')
                main.classList.remove('transparency')
                getEdit.remove()
            }
        })

        // подтверждение изменений
        getEdit.addEventListener('click', (event) => {
            const clickConfirm = event.target
            if (clickConfirm.innerText === 'Confirm') {
                todoTitleOnDesk.innerText = todoTitle.value
                todoDiscrOnDesk.innerText = todoDiscription.value
                const select = getEdit.querySelector('#select')
                selectVal.innerText = select.value
                header.classList.remove('transparency')
                main.classList.remove('transparency')
                getEdit.remove()

                const data = {
                    id: selectMain.id,
                    title: todoTitleOnDesk.innerText,
                    description: todoDiscrOnDesk.innerText,
                    time: headerTime.innerText,
                    user: select.value
                }

                const wrapForId = clickEdit.closest('.cardWrapOnDesk')
                const index = todos.findIndex(item => {
                    return item.id === wrapForId.id
                })
                todos.splice(index, 1, data)

                localStorage.setItem(
                    KEY_TODO,
                    JSON.stringify(todos)
                )
            }
        })
    }
})

// перенос карточки на доску in progress
wrapperMain.addEventListener('click', (event) => {
    const clickArrow = event.target
    if (clickArrow.innerText === '>') {

        // создание карточки на доске in progress
        const generateCardInProgress = () => {

            const wrapForTitle = clickArrow.closest('.cardWrapOnDesk')

            const cardInProgress = ganerateCard()
            cardInProgress.classList.add('cardWrapProg')
            cardInProgress.id = wrapForTitle.id

            const titleCard = wrapForTitle.getElementsByClassName('cardOnDeskHeaderTitle')[0]
            const title = cardInProgress.getElementsByClassName('cardOnDeskHeaderTitle')[0]
            title.innerText = titleCard.innerText

            const headerButBack = cardInProgress.getElementsByClassName('cardOnDeskHeaderBut-1')[0]
            headerButBack.innerText = 'BACK'

            const headerButComplete = cardInProgress.getElementsByClassName('cardOnDeskHeaderBut-2')[0]
            headerButComplete.innerText = 'COMPLETE'

            const descrCard = wrapForTitle.getElementsByClassName('cardOnDeskMainDescr')[0]
            const description = cardInProgress.getElementsByClassName('cardOnDeskMainDescr')[0]
            description.innerText = descrCard.innerText

            const butArray = cardInProgress.getElementsByClassName('cardOnDeskMainBut')[0]
            butArray.classList.add('close')

            const userCard = wrapForTitle.getElementsByClassName('cardOnDeskFooterUser')[0]
            const user = cardInProgress.getElementsByClassName('cardOnDeskFooterUser')[0]
            user.innerText = userCard.innerText

            const time = cardInProgress.getElementsByClassName('cardOnDeskFooterTime')[0]
            time.innerText = headerTime.innerText

            cardProgDesk.append(cardInProgress)

            wrapForTitle.remove()
            const index = todos.findIndex(item => {
                return item.id === wrapForTitle.id
            })

            todos.splice(index, 1)
            localStorage.setItem(
                KEY_TODO,
                JSON.stringify(todos)
            )
            cardTitleTodoKol.innerText = todos.length

            const data = {
                id: cardInProgress.id,
                title: title.innerText,
                description: description.innerText,
                time: time.innerText,
                user: user.innerText
            }

            inProcess.push(data)
            localStorage.setItem(
                KEY_INPROC,
                JSON.stringify(inProcess)
            )
            cardTitleProgKol.innerText = inProcess.length
        }

        if (Number(cardTitleProgKol.innerText) < 2) {
            generateCardInProgress()
        } else {
            header.classList.add('transparency')
            main.classList.add('transparency')
            const getWarn = getWinWarning()
            getWarn.classList.add('winWarningTodoOpen')

            // закрытие карточки с предупреждением о загруженности доски in process
            getWarn.addEventListener('click', (event) => {
                const clickCancelWarn = event.target
                if (clickCancelWarn.innerText === 'Cancel') {
                    header.classList.remove('transparency')
                    main.classList.remove('transparency')
                    getWarn.remove()
                }
            })

            // подтверждение перевода карточки на доску in process
            getWarn.addEventListener('click', (event) => {
                const clickConfirmWarn = event.target
                if (clickConfirmWarn.innerText === 'Confirm') {
                    generateCardInProgress()
                    header.classList.remove('transparency')
                    main.classList.remove('transparency')
                    getWarn.remove()
                }
            })
        }
    }
})

// предупреждающее окно о перемещении карточки на in process
const getWinWarning = () => {
    const winWarningTodo = document.createElement('div')
    winWarningTodo.classList = ['winWarningTodo']

    const winWarningTodoWord = document.createElement('h1')
    winWarningTodoWord.classList = ['winWarningTodoWord']
    winWarningTodoWord.innerText = "Warning!"

    const winWarningTodoText = document.createElement('h4')
    winWarningTodoText.classList = ['winWarningTodoText']
    winWarningTodoText.innerText = 'A lot of tasks have accumulated. Are you sure you want to add more?'

    const winWarningTodoButWrap = document.createElement('div')
    winWarningTodoButWrap.classList = ['winWarningTodoButWrap']

    const winWarningTodoButCancel = document.createElement('button')
    const winWarningTodoButConfrm = document.createElement('button')
    winWarningTodoButCancel.classList = ['winWarningTodoBut']
    winWarningTodoButConfrm.classList = ['winWarningTodoBut']
    winWarningTodoButCancel.innerText = 'Cancel'
    winWarningTodoButConfrm.innerText = 'Confirm'

    winWarningTodo.append(winWarningTodoWord, winWarningTodoText, winWarningTodoButWrap)
    winWarningTodoButWrap.append(winWarningTodoButCancel, winWarningTodoButConfrm)
    wrapperMain.append(winWarningTodo)

    return winWarningTodo
}

// возвращение карточки из in process в todo
wrapperMain.addEventListener('click', (event) => {
    const clickBack = event.target
    if (clickBack.innerText === 'BACK') {

        const cardInProgress = clickBack.closest('.cardWrapProg')

        const cardTodoBack = ganerateCard()
        cardTodoBack.id = cardInProgress.id
        const lastNumId = Number(cardTodoBack.id.slice(-1))
        if (lastNumId % 3 === 0) {
            cardTodoBack.classList.add('cardWrapTodo-1')
        } else if (lastNumId % 2 === 0) {
            cardTodoBack.classList.add('cardWrapTodo-2')
        } else {
            cardTodoBack.classList.add('cardWrapTodo-3')
        }

        const title = cardTodoBack.getElementsByClassName('cardOnDeskHeaderTitle')[0]
        const titleInProg = cardInProgress.getElementsByClassName('cardOnDeskHeaderTitle')[0]
        title.innerText = titleInProg.innerText

        const headerButEdit = cardTodoBack.getElementsByClassName('cardOnDeskHeaderBut-1')[0]
        headerButEdit.innerText = 'EDIT'

        const headerButDelete = cardTodoBack.getElementsByClassName('cardOnDeskHeaderBut-2')[0]
        headerButDelete.innerText = 'DELETE'

        const descrInProg = cardInProgress.getElementsByClassName('cardOnDeskMainDescr')[0]
        const description = cardTodoBack.getElementsByClassName('cardOnDeskMainDescr')[0]
        description.innerText = descrInProg.innerText

        const userInProg = cardInProgress.getElementsByClassName('cardOnDeskFooterUser')[0]
        const user = cardTodoBack.getElementsByClassName('cardOnDeskFooterUser')[0]
        user.innerText = userInProg.innerText

        const time = cardTodoBack.getElementsByClassName('cardOnDeskFooterTime')[0]
        time.innerText = headerTime.innerText

        cardInProgress.remove()
        const index = todos.findIndex(item => {
            return item.id === cardInProgress.id
        })

        inProcess.splice(index, 1)
        localStorage.setItem(
            KEY_INPROC,
            JSON.stringify(inProcess)
        )
        cardTitleProgKol.innerText = inProcess.length

        const data = {
            id: cardTodoBack.id,
            title: title.innerText,
            description: description.innerText,
            time: time.innerText,
            user: user.innerText,
        }

        todos.push(data)

        localStorage.setItem(
            KEY_TODO,
            JSON.stringify(todos)
        )

        cardTitleTodoKol.innerText = todos.length

        cardTodoDesk.append(cardTodoBack)
    }
})

// перенос карточки на доску done
wrapperMain.addEventListener('click', (event) => {
    const clickComplete = event.target
    if (clickComplete.innerText === 'COMPLETE') {

        const cardInProc = clickComplete.closest('.cardWrapOnDesk')

        const cardDone = ganerateCard()
        cardDone.classList.add('cardWrapDone')
        cardDone.id = cardInProc.id

        const titleCard = cardInProc.getElementsByClassName('cardOnDeskHeaderTitle')[0]
        const title = cardDone.getElementsByClassName('cardOnDeskHeaderTitle')[0]
        title.innerText = titleCard.innerText

        const headerButNone = cardDone.getElementsByClassName('cardOnDeskHeaderBut-1')[0]
        headerButNone.classList.add('close')

        const headerButDelete = cardDone.getElementsByClassName('cardOnDeskHeaderBut-2')[0]
        headerButDelete.innerText = 'DELETE'

        const descrCard = cardInProc.getElementsByClassName('cardOnDeskMainDescr')[0]
        const description = cardDone.getElementsByClassName('cardOnDeskMainDescr')[0]
        description.innerText = descrCard.innerText

        const butArray = cardDone.getElementsByClassName('cardOnDeskMainBut')[0]
        butArray.classList.add('close')

        const userCard = cardInProc.getElementsByClassName('cardOnDeskFooterUser')[0]
        const user = cardDone.getElementsByClassName('cardOnDeskFooterUser')[0]
        user.innerText = userCard.innerText

        const time = cardDone.getElementsByClassName('cardOnDeskFooterTime')[0]
        time.innerText = headerTime.innerText

        cardDoneDesk.append(cardDone)

        cardInProc.remove()
        const index = inProcess.findIndex(item => {
            return item.id === cardInProc.id
        })

        inProcess.splice(index, 1)
        localStorage.setItem(
            KEY_INPROC,
            JSON.stringify(inProcess)
        )
        cardTitleProgKol.innerText = inProcess.length

        const data = {
            id: cardDone.id,
            title: title.innerText,
            description: description.innerText,
            time: time.innerText,
            user: user.innerText
        }
        done.push(data)
        localStorage.setItem(
            KEY_DONE,
            JSON.stringify(done)
        )
        cardTitleDoneKol.innerText = done.length
    }
})

// удаление одной карточки с доски done
wrapperMain.addEventListener('click', (event) => {
    const clickDelete = event.target

    if (clickDelete.innerText === 'DELETE') {
        const deleteCard = clickDelete.closest('.cardWrapOnDesk')
        deleteCard.remove()
        const index = done.findIndex(item => {
            return item.id === deleteCard.id
        })

        done.splice(index, 1)
        localStorage.setItem(
            KEY_DONE,
            JSON.stringify(done)
        )
        cardTitleDoneKol.innerText = done.length
    }
})

// удаление всех карточек с доски Done
wrapDoneBut.addEventListener('click', () => {
    header.classList.add('transparency')
    main.classList.add('transparency')
    const cardWarning = getWinWarning()
    cardWarning.classList.add('winWarningTodoOpen')
    const warnText = cardWarning.getElementsByClassName('winWarningTodoText')[0]
    warnText.innerText = 'Are you sure you want to delete all?'

    cardWarning.addEventListener('click', (event) => {
        const clickCancelWarn = event.target
        if (clickCancelWarn.innerText === 'Cancel') {
            header.classList.remove('transparency')
            main.classList.remove('transparency')
            cardWarning.remove()
        }
    })

    cardWarning.addEventListener('click', (event) => {
        const clickConfirmWarn = event.target
        if (clickConfirmWarn.innerText === 'Confirm') {
            const cardDeskWrap = wrapDoneBut.closest('.donecolor')
            const cardDesk = cardDeskWrap.getElementsByClassName('cardDesk')[0]
            cardDesk.innerHTML = ''
            done.splice(0, done.length)
            localStorage.setItem(
                KEY_DONE,
                JSON.stringify(done)
            )
            cardTitleDoneKol.innerText = done.length

            header.classList.remove('transparency')
            main.classList.remove('transparency')
            cardWarning.remove()
        }
    })
})

// разворот карточки для просмотра информации
wrapperMain.addEventListener('click', (event) => {
    const clickDescription = event.target

    if (clickDescription.id === 'cardOnDeskMainDescr') {

        header.classList.add('transparency')
        main.classList.add('transparency')

        const cardWrap = clickDescription.closest('.cardWrapOnDesk')
        const cardTitle = cardWrap.getElementsByClassName('cardOnDeskHeaderTitle')[0]
        const title = cardTitle.innerText

        const cardDescription = cardWrap.getElementsByClassName('cardOnDeskMainDescr')[0]
        const descr = cardDescription.innerText

        const cardUser = cardWrap.getElementsByClassName('cardOnDeskFooterUser')[0]
        const user = cardUser.innerText

        const cardTime = cardWrap.getElementsByClassName('cardOnDeskFooterTime')[0]
        const time = cardTime.innerText

        const cardInfo = getCardFromDesk(title, descr, user, time)
        cardInfo.classList.add('cardInfoOpen')

        cardInfo.addEventListener('click', (event) => {
            const clickX = event.target
            if (clickX.innerText === 'X') {
                header.classList.remove('transparency')
                main.classList.remove('transparency')
                cardInfo.remove()
            }
        })

        wrapperMain.append(cardInfo)
    }
})

// карточка для просмотра информации
function getCardFromDesk(title, descr, user, time) {

    const cardInfo = document.createElement('div')
    cardInfo.classList = ['cardInfo']

    const cardInfoButWrap = document.createElement('div')
    cardInfoButWrap.classList = ['cardInfoButWrap']

    const cardInfoBut = document.createElement('button')
    cardInfoBut.classList = ['cardInfoBut']
    cardInfoBut.innerText = 'X'

    const cardInfoTitle = document.createElement('h1')
    cardInfoTitle.classList = ['cardInfoTitle']
    cardInfoTitle.innerText = title

    const cardInfoDescr = document.createElement('h4')
    cardInfoDescr.classList = ['cardInfoDescr']
    cardInfoDescr.innerText = descr

    const cardInfoFooter = document.createElement('div')
    cardInfoFooter.classList = ['cardInfoFooter']

    const cardInfoFooterUser = document.createElement('h3')
    cardInfoFooterUser.classList = ['cardInfoFooterUser']
    cardInfoFooterUser.innerText = user

    const cardInfoFooterTime = document.createElement('h3')
    cardInfoFooterTime.classList = ['cardInfoFooterTime']
    cardInfoFooterTime.innerText = time

    cardInfo.append(cardInfoButWrap, cardInfoTitle, cardInfoDescr, cardInfoFooter)
    cardInfoButWrap.append(cardInfoBut)
    cardInfoFooter.append(cardInfoFooterUser, cardInfoFooterTime)

    return cardInfo
}

// генерация карточки на доске 
function ganerateCard() {
    const cardWrapOnDesk = document.createElement('div')
    cardWrapOnDesk.classList = ['cardWrapOnDesk']

    const cardOnDeskHeader = document.createElement('div')
    cardOnDeskHeader.classList = ['cardOnDeskHeader']

    const cardOnDeskHeaderButWrap = document.createElement('div')
    cardOnDeskHeaderButWrap.classList = ['cardOnDeskHeaderButWrap']

    const cardOnDeskHeaderBut1 = document.createElement('button')
    const cardOnDeskHeaderBut2 = document.createElement('button')
    cardOnDeskHeaderBut1.classList = ['cardOnDeskHeaderBut cardOnDeskHeaderBut-1']
    cardOnDeskHeaderBut2.classList = ['cardOnDeskHeaderBut cardOnDeskHeaderBut-2']

    const cardOnDeskHeaderTitle = document.createElement('div')
    cardOnDeskHeaderTitle.classList = ['cardOnDeskHeaderTitle']

    const cardOnDeskMain = document.createElement('div')
    cardOnDeskMain.classList = ['cardOnDeskMain']

    const cardOnDeskMainDescr = document.createElement('div')
    cardOnDeskMainDescr.classList = ['cardOnDeskMainDescr']
    cardOnDeskMainDescr.id = 'cardOnDeskMainDescr'

    const cardOnDeskMainBut = document.createElement('button')
    cardOnDeskMainBut.classList = ['cardOnDeskMainBut']
    cardOnDeskMainBut.innerText = '>'

    const cardOnDeskFooter = document.createElement('div')
    cardOnDeskFooter.classList = ['cardOnDeskFooter']

    const cardOnDeskFooterUser = document.createElement('div')
    cardOnDeskFooterUser.classList = ['cardOnDeskFooterUser']

    const cardOnDeskFooterTime = document.createElement('div')
    cardOnDeskFooterTime.classList = ['cardOnDeskFooterTime']

    cardWrapOnDesk.append(cardOnDeskHeader, cardOnDeskMain, cardOnDeskFooter)
    cardOnDeskHeader.append(cardOnDeskHeaderButWrap, cardOnDeskHeaderTitle)
    cardOnDeskHeaderButWrap.append(cardOnDeskHeaderBut1, cardOnDeskHeaderBut2)
    cardOnDeskFooter.append(cardOnDeskFooterUser, cardOnDeskFooterTime)
    cardOnDeskMain.append(cardOnDeskMainDescr, cardOnDeskMainBut)

    return cardWrapOnDesk
}

// восстановление после обновления сервера
window.addEventListener('DOMContentLoaded', () => {
    const stringTodo = localStorage.getItem(KEY_TODO)
    const cardsTodo = JSON.parse(stringTodo) || []
    todos.push(...cardsTodo)

    todos.forEach(data => {
        const cardTodo = ganerateCard()
        cardTodoDesk.append(cardTodo)

        const { id, title, description, time, user } = data

        const wrap = cardTodo.closest('.cardWrapOnDesk')
        wrap.id = id
        const lastNumId = Number(wrap.id.slice(-1))
        if (lastNumId % 3 === 0) {
            wrap.classList.add('cardWrapTodo-1')
        } else if (lastNumId % 2 === 0) {
            wrap.classList.add('cardWrapTodo-2')
        } else {
            wrap.classList.add('cardWrapTodo-3')
        }

        const cardTitle = wrap.getElementsByClassName('cardOnDeskHeaderTitle')[0]
        cardTitle.innerText = title

        const headerButEdit = wrap.getElementsByClassName('cardOnDeskHeaderBut-1')[0]
        headerButEdit.innerText = 'EDIT'

        const headerButDelete = wrap.getElementsByClassName('cardOnDeskHeaderBut-2')[0]
        headerButDelete.innerText = 'DELETE'

        const cardDescription = wrap.getElementsByClassName('cardOnDeskMainDescr')[0]
        cardDescription.innerText = description

        const cardUser = wrap.getElementsByClassName('cardOnDeskFooterUser')[0]
        cardUser.innerText = user

        const cardTime = wrap.getElementsByClassName('cardOnDeskFooterTime')[0]
        cardTime.innerText = time

        cardTitleTodoKol.innerText = todos.length
    })

    const stringInProc = localStorage.getItem(KEY_INPROC)
    const cardsInProc = JSON.parse(stringInProc) || []
    inProcess.push(...cardsInProc)

    inProcess.forEach(data => {
        const cardInProc = ganerateCard()
        cardProgDesk.append(cardInProc)

        const { id, title, description, time, user } = data

        const wrap = cardInProc.closest('.cardWrapOnDesk')
        wrap.classList.add('cardWrapProg')
        wrap.id = id

        const cardTitle = wrap.getElementsByClassName('cardOnDeskHeaderTitle')[0]
        cardTitle.innerText = title

        const headerButBack = cardInProc.getElementsByClassName('cardOnDeskHeaderBut-1')[0]
        headerButBack.innerText = 'BACK'

        const headerButComplete = cardInProc.getElementsByClassName('cardOnDeskHeaderBut-2')[0]
        headerButComplete.innerText = 'COMPLETE'

        const cardDescription = wrap.getElementsByClassName('cardOnDeskMainDescr')[0]
        cardDescription.innerText = description

        const cardUser = wrap.getElementsByClassName('cardOnDeskFooterUser')[0]
        cardUser.innerText = user

        const cardTime = wrap.getElementsByClassName('cardOnDeskFooterTime')[0]
        cardTime.innerText = time

        const butArray = wrap.getElementsByClassName('cardOnDeskMainBut')[0]
        butArray.classList.add('close')

        cardTitleProgKol.innerText = inProcess.length
    })

    const stringDone = localStorage.getItem(KEY_DONE)
    const cardsDone = JSON.parse(stringDone) || []
    done.push(...cardsDone)

    done.forEach(data => {
        const cardDone = ganerateCard()
        cardDoneDesk.append(cardDone)

        const { id, title, description, time, user } = data

        const wrap = cardDone.closest('.cardWrapOnDesk')
        wrap.classList.add('cardWrapDone')
        wrap.id = id

        const cardTitle = wrap.getElementsByClassName('cardOnDeskHeaderTitle')[0]
        cardTitle.innerText = title

        const headerButNone = wrap.getElementsByClassName('cardOnDeskHeaderBut-1')[0]
        headerButNone.classList.add('close')

        const headerButDelete = wrap.getElementsByClassName('cardOnDeskHeaderBut-2')[0]
        headerButDelete.innerText = 'DELETE'

        const cardDescription = wrap.getElementsByClassName('cardOnDeskMainDescr')[0]
        cardDescription.innerText = description

        const cardUser = wrap.getElementsByClassName('cardOnDeskFooterUser')[0]
        cardUser.innerText = user

        const cardTime = wrap.getElementsByClassName('cardOnDeskFooterTime')[0]
        cardTime.innerText = time

        const butArray = wrap.getElementsByClassName('cardOnDeskMainBut')[0]
        butArray.classList.add('close')

        cardTitleDoneKol.innerText = done.length
    })
})
const toDoForm = document.getElementById('toDoForm');
const toDoActivity = document.getElementById('toDoActivity');
const toDoTime =  document.getElementById('toDoTime');
const toDoList = document.getElementById('toDoList');

function displayList() {
    const toDoListDisplay  = getToDoFromStorage();
    toDoListDisplay.forEach(toDo => {
        createNewToDo(toDo.toDo1, toDo.time);        
    });
}

function addToDo(e){
    e.preventDefault();
    const newToDo = toDoActivity.value[0].toUpperCase() + toDoActivity.value.slice(1);
    const newToDoTime = getTime(toDoTime.value);


    if (newToDo === '') {
        alert('Please add an item');
        return;
    } else if (newToDoTime === '') {
        alert('Please add a time');
        return;
    }

    createNewToDo(newToDo, newToDoTime);
    addToDoToStorage(newToDo, newToDoTime);

    toDoActivity.value = '';
    toDoTime.value = '';
}

function createNewToDo(toDo, toDoTime) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const btn = createBtn('remove-item btnLink textRed');

    p.appendChild(document.createTextNode(toDo + ' |'));
    span.appendChild(document.createTextNode(' ' + toDoTime))
    p.appendChild(span)
    li.appendChild(p);
    li.appendChild(btn);

    toDoList.appendChild(li);

}

function createBtn(classes){
    const btn = document.createElement('button');
    btn.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    btn.appendChild(icon);
    return btn
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon
}

function addToDoToStorage(toDo, toDoTime) {
    const completeToDoList = getToDoFromStorage();
    const objToDo = {
        toDo1 : toDo,
        time :toDoTime
    }

    completeToDoList.push(objToDo);
    localStorage.setItem('toDoList', JSON.stringify(completeToDoList))
}

function getToDoTimeFromStorage() {
    
}

function getToDoFromStorage(){
    let toDoListFromStorage;

    if (localStorage.getItem('toDoList') === null) {
        toDoListFromStorage = [];
    } else {
        toDoListFromStorage = JSON.parse(localStorage.getItem('toDoList'))
    }

    return toDoListFromStorage;
}

function getTime(inputTime){
    const time = inputTime
    const timeHr = Number(time.split('').slice(0,2).join(''))
    const timeMin = Number(time.split('').slice(3).join(''))

    if (timeHr > 12) {
        const newTimeHr = timeHr - 12;
        if (timeMin.toString().length == 1) {
            const timeStr = newTimeHr.toString() + ':0' + timeMin.toString() + ' pm';
            return timeStr
        } else {
            const timeStr = newTimeHr.toString() + ':' + timeMin.toString() + ' pm';
            return timeStr
        }
        
    }   else if (timeHr == 12) {
        if (timeMin.toString().length == 1) {
            const timeStr = timeHr.toString() + ':0' + timeMin.toString() + ' pm';
            return timeStr
        } else {
            const timeStr = timeHr.toString() + ':' + timeMin.toString() + ' pm';
            return timeStr
        }
    }  else {
        if (timeMin.toString().length == 1) {
            const timeStr = timeHr.toString() + ':0' + timeMin.toString() + ' am';
            return timeStr
        } else {
            const timeStr = timeHr.toString() + ':' + timeMin.toString() + ' am';
            return timeStr
        }
    }
}

function init() {
    document.addEventListener('submit', addToDo)
    document.addEventListener('DOMContentLoaded', displayList)
}

init()
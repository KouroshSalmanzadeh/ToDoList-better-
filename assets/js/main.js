/////// modal box \\\\\\\
const mainModal = document.querySelector('.main-box-modal');
const modal = document.querySelector('.modal');
const inputModal = document.querySelector('.modal input');
const buttonModal = document.querySelector('.modal button');
const username = document.querySelector('.title .username');
const titleModal = document.querySelector('.modal span.header');
const closeIcon = document.querySelector('.modal svg');

/////// To do list \\\\\\\
const toDoDiv = document.querySelector('.to-do');
const tarshBin = `<lord-icon
class="trach-bin"
src="https://cdn.lordicon.com/drxwpfop.json"
trigger="hover"
colors="primary:#fff,secondary:#22faa2"
style="width:30px;height:30px">
</lord-icon>`;
const tickIcon = `<lord-icon
class="tick"
src="https://cdn.lordicon.com/cgzlioyf.json"
trigger="hover"
state="hover-loading"
colors="primary:#22faa2"
style="width:30px;height:30px">
</lord-icon>`;
const editIcon = `<lord-icon
class="edit"
src = "https://cdn.lordicon.com/wuvorxbv.json"
trigger = "hover"
title="Edit"
state="hover-line"
colors="primary:#fff,secondary:#22faa2"
style = "width:30px;height:30px;" >
</lord-icon>`
let toDo = [];

/////// To do done list \\\\\\\
const doneDiv = document.querySelector('.done');
let done = [];

document.addEventListener('DOMContentLoaded', function () {
    function randomBackground() {
        return Math.floor(Math.random() * 15);
    }

    /////// Add random Background image \\\\\\\
    const randomImage = randomBackground();
    document.body.style.backgroundImage = `url(assets/img/${randomImage}.jpg)`;

    /////// Active modal for welcome \\\\\\\


    let timeoutModal = setTimeout(() => {
        mainModal.classList.add('overlay');
        modal.classList.add('welcome');
    }, 700);

    function getUsername(event) {
        if (modal.classList == 'modal welcome') {
            if (event.key === 'Enter' || event.type == 'click') {
                if (inputModal.value != '' && /^[a-zA-Z]+$/.test(inputModal.value)) {
                    username.innerHTML = `<span>Hello </span>` + `<span class="name">${inputModal.value}${editIcon}</span>`;
                    modal.classList.remove('welcome');
                    setTimeout(() => {
                        mainModal.classList.remove('overlay');
                    }, 500);
                } else if (!/^[a-zA-Z]+$/.test(inputModal.value) && inputModal.value != '') {
                    modal.classList.add('error-number');
                    inputModal.value = 'Enter name without number';
                } else {
                    modal.classList.add('error-empty');
                }
            } else {
                modal.classList = 'modal welcome';
            }
        } else {

            modal.classList = 'modal welcome';
            if (event.keycode == 0) {
                inputModal.value = event.key;
            } else {
                inputModal.value = '';
            }

        }
    };

    inputModal.addEventListener('keydown', (event) => {
        if (modal.className == 'modal welcome' || modal.className == 'modal welcome error-number' || modal.className == 'modal welcome error-empty') {
            getUsername(event);
        } else if (modal.className == 'modal active') {
            if (event.key == 'Enter') {
                confirmButtonClickHandler();
            }
        }
    });
    buttonModal.addEventListener('click', () => {
        if (modal.className == 'modal welcome') {
            getUsername(event);
        } else if (modal.className == 'modal add-goal') {
            addToDo();
        }
    });
});

/////// Add clock time to html \\\\\\\
const clock = document.querySelector('.clock');
setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;

    clock.innerText = `${h}:${m}:${s}`;

}, 1000);


/////// Add goal to list \\\\\\\
function addToDo() {
    const secondInput = document.querySelector('.modal .second-input');
    if (inputModal.value !== '' && secondInput.value !== '') {
        modal.classList.remove('add-goal');
        setTimeout(() => {
            mainModal.classList.remove('overlay');
        }, 300);
        let titleTodo = inputModal.value;
        let newTodo = {
            id: toDo.length + 1,
            title: titleTodo,
            description: secondInput.value
        }
        toDo.push(newTodo);
        inputModal.value = '';
        secondInput.value = '';
        const titleToDoDiv = `<span class="title-to-do">To Do List</span>`;
        const lastToDo = `<li class="to-do-item">
        <div class="id-title"><span class="id">${newTodo.id}</span>- <span>${newTodo.title}</span></div>
        <div class="description">${newTodo.description}</div>
        <div class="manage-item">${tickIcon}${editIcon}${tarshBin}</div></li>`;

        setTimeout(() => {
            if (toDoDiv.innerHTML == '') {
                toDoDiv.insertAdjacentHTML('afterbegin', titleToDoDiv);
                toDoDiv.lastElementChild.insertAdjacentHTML('afterend', lastToDo);
                toDoDiv.classList.add('active');
            } else {
                toDoDiv.lastElementChild.insertAdjacentHTML('afterend', lastToDo);
            }
        }, 500);
        setTimeout(() => {
            toDoDiv.lastElementChild.classList.add('active');
            tickToDo();
        }, 700);
    }
}
const btnAddGoal = document.querySelector('.clock-title .btn-add-goal');
btnAddGoal.addEventListener('click', () => {
    const new_title = `<span class="title-input first-span">Title:</span>`
    const new_title_input = `<span class="title-input second-span">Description:</span>
    <input class="second-input" type="text" placeholder="Learn one chapter of JS">`;

    if (username.innerText != '') {

        mainModal.classList.add('overlay');
        modal.classList.add('add-goal');

        if (!document.querySelector('.title-input')) {
            titleModal.innerText = 'Add your goal:';
            modal.children[2].insertAdjacentHTML('beforebegin', new_title);
            inputModal.setAttribute('placeholder', 'Learn JS');
            inputModal.value = '';

            modal.children[4].insertAdjacentHTML('beforebegin', new_title_input);
            buttonModal.innerText = 'Add';
        }
    }
    const secondInput = document.querySelector('.modal .second-input');
    secondInput.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            if (modal.className == 'modal add-goal') {
                addToDo();
            }
        }
    });
});
mainModal.addEventListener('click', (event) => {
    // debugger
    if (modal.className !== 'modal welcome') {
        if (event.target == mainModal) {
            mainModal.classList.remove('overlay');
            modal.className = 'modal';
        }
    }
});
closeIcon.addEventListener('click', () => {
    mainModal.classList.remove('overlay');
    modal.className = 'modal';
});


/////// Edit Name \\\\\\\
function editName() {
    // debugger
    const titleInputs = document.querySelectorAll('.modal .title-input');
    titleModal.innerText = 'Edit your name';
    titleInputs.forEach(titleInput => {
        titleInput.remove();
    });
    if (document.querySelector('.modal .second-input')) {
        const secondInput = document.querySelector('.modal .second-input');
        secondInput.remove();

    };
    inputModal.value = '';
    inputModal.setAttribute('placeholder', 'Enter your new name');
    buttonModal.innerText = 'Confirm';
    mainModal.classList.add('overlay');
    modal.classList.add('active');


    // اضافه کردن event listener جدید
    buttonModal.addEventListener('click', confirmButtonClickHandler);


};

function confirmButtonClickHandler() {
    const nameSpan = document.querySelector('.username .name');
    debugger
    modal.classList.remove('active');
    nameSpan.innerHTML = inputModal.value + editIcon;
    mainModal.classList.remove('overlay');
    inputModal.value = '';

    // حذف event listener های قبلی
    buttonModal.removeEventListener('click', confirmButtonClickHandler);

};
username.addEventListener('click', () => {
    editName();
});

/////// Manage to do item \\\\\\\
function tickToDo() {
    function tickToDoItemHandler(event) {
        const idGet = parseInt(event.target.parentElement.previousElementSibling.previousElementSibling.firstChild.innerText);
        const ToDoTicked = toDo.find(obj => obj.id == idGet);


        // toDoDoneعدد گذاری مجدد آیدی های آرایه
        toDo.filter(item => item !== ToDoTicked);
        for (let i = 0; i < toDo.length; i++) {
            toDo[i].id = i + 1;
        }

        // doneعدد گذاری مجدد آیدی های آرایه
        let newTodo = {
            id: done.length + 1,
            title: ToDoTicked.title,
            description: ToDoTicked.description
        }
        done.push(newTodo);

        const titleDoneDiv = `<span class="title-done">Done List</span>`;
        const lastToDo = `<li class="to-do-item">
            <div class="id-title"><span class="id">${newTodo.id}</span>- <span>${newTodo.title}</span></div>
            <div class="description">${newTodo.description}</div>
            <div class="manage-item">${tarshBin}</div></li>`;

        if (doneDiv.innerHTML == '') {
            doneDiv.insertAdjacentHTML('afterbegin', titleDoneDiv);
            doneDiv.lastElementChild.insertAdjacentHTML('afterend', lastToDo);
            doneDiv.classList.add('active');
        } else {
            doneDiv.lastElementChild.insertAdjacentHTML('afterend', lastToDo);
        }
        setTimeout(() => {
            const parentElement = event.target.parentElement.parentElement;
            parentElement.classList.remove('active');
            parentElement.remove();
            setTimeout(() => {
                doneDiv.classList.add('active');
                doneDiv.lastElementChild.classList.add('tick');
            }, 200);
        }, 400);
    };

    const tickIcons = document.querySelectorAll('.manage-item .tick');

    tickIcons.forEach(tickIcon => {
        debugger
        tickIcons.forEach(tickIcon => {
            tickIcon.removeEventListener('click', tickToDoItemHandler);
        });

        tickIcon.addEventListener('click', tickToDoItemHandler);
    });
}
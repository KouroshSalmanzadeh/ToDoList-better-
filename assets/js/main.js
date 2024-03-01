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
src="https://cdn.lordicon.com/drxwpfop.json"
trigger="hover"
colors="primary:#fff,secondary:#22faa2"
style="width:30px;height:30px">
</lord-icon>`;
const tickIcon = `<lord-icon
src="https://cdn.lordicon.com/cgzlioyf.json"
trigger="hover"
state="hover-loading"
colors="primary:#22faa2"
style="width:30px;height:30px">
</lord-icon>`;
const editIcon = `<lord-icon
src = "https://cdn.lordicon.com/wuvorxbv.json"
trigger = "hover"
title="Edit"
state="hover-line"
colors="primary:#fff,secondary:#22faa2"
style = "width:30px;height:30px;" >
</lord-icon>`
let toDo = [];

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
                    username.innerHTML = `<span>Hello </span>` + `<span>${inputModal.value}${editIcon}</span>`;
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

    inputModal.addEventListener('keydown', () => {
        if (modal.className == 'modal welcome' || modal.className == 'modal welcome error-number' || modal.className == 'modal welcome error-empty') {
            getUsername(event);
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
        const lastToDo = `<li class="to-do-item">
        <div class="id-title">${newTodo.id}- ${newTodo.title}</div>
        <div class="description">${newTodo.description}</div>
        <div class="delete-edit">${tickIcon}${editIcon}${tarshBin}</div></li>`;

        setTimeout(() => {
            debugger
            if (toDoDiv.innerHTML == '') {
                toDoDiv.insertAdjacentHTML('afterbegin', lastToDo);
                toDoDiv.classList.add('active');
            } else {
                toDoDiv.lastElementChild.insertAdjacentHTML('afterend', lastToDo);
            }
        }, 500);
        setTimeout(() => {
            toDoDiv.lastElementChild.classList.add('active');
        }, 700);
    }
}
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
})

mainModal.addEventListener('click', (event) => {
    // debugger
    if (modal.className == 'modal add-goal') {
        if (event.target == mainModal) {
            mainModal.classList.remove('overlay');
            modal.classList.remove('add-goal');
        }
    }
});
closeIcon.addEventListener('click', () => {
    mainModal.classList.remove('overlay');
    modal.classList.remove('add-goal');
});
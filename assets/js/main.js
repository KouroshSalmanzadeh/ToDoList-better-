const mainModal = document.querySelector('.main-box-modal');
const modal = document.querySelector('.modal');
const inputModal = document.querySelector('.modal input');
const buttonModal = document.querySelector('.modal button');
const username = document.querySelector('.title .username');
const titleModal = document.querySelector('.modal span');

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

        clearTimeout(timeoutModal);
    }, 1500);

    function getUsername(event) {
        if (modal.classList == 'modal welcome') {
            if (event.key === 'Enter' || event.type == 'click') {
                if (inputModal.value != '' && /^[a-zA-Z]+$/.test(inputModal.value)) {
                    username.innerText = 'Hello ' + inputModal.value;
                    modal.classList.remove('welcome');
                    setTimeout(() => {
                        mainModal.classList.remove('overlay');
                    }, 500);
                } else if (!/^[a-zA-Z]+$/.test(inputModal.value)) {
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
        if (modal.className == 'modal welcome') {
            getUsername(event);
        }
    });
    buttonModal.addEventListener('click', () => {
        debugger
        if (modal.className == 'modal welcome') {
            getUsername(event);
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
const btnAddGoal = document.querySelector('.clock-title .btn-add-goal');
btnAddGoal.addEventListener('click', () => {
    mainModal.classList.add('overlay');
    modal.classList.add('add-goal');
    inputModal.value = '';
    titleModal.innerText = 'Add your goal:';
    inputModal.setAttribute('placeholder', 'ex: Learn one chapter of JS');
    buttonModal.innerText = 'Add';

})
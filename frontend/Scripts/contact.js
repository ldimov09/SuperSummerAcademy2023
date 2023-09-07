const dateInput = document.getElementById('date-input');
const optionsHolder = document.getElementById('options-holder');
const submitBtn = document.getElementById('submit-button');
const countInp = document.getElementById('countInp');
const emailInp = document.getElementById('emailInp');
const nameInp = document.getElementById('nameInp');
const myAlert = document.getElementById('alert');
dateInput.addEventListener('change', fetchAllFreeHours);
submitBtn.addEventListener('click', createAppointement);
let selectedOption = null;
let response = null;

myAlert.style.display = 'none';

function loadAvailableHours(r) {
    response = r;
    optionsHolder.innerHTML = '';
    let i = 0;
    for (let key in r) {
        const span = document.createElement('span');
        span.classList.add('time-tag');
        span.id = 'timeChoice' + i;
        let f = i;
        span.addEventListener('click', () => selectOption('timeChoice' + f));
        span.textContent = r[key];
        optionsHolder.appendChild(span)
        i++;
    }
}

function selectOption(id) {
    document.getElementById(id).classList.add('selected');
    if (selectedOption) {
        document.getElementById(selectedOption).classList.remove('selected');
    }
    selectedOption = id;
}

function fetchAllFreeHours(event) {
    if (!dateInput.value) {
        return;
    }
    fetch("https://saturday.skostadinov.com/schedule?date=" + dateInput.value)
        .then(r => r.json())
        .then(r => loadAvailableHours(r));
}

async function createAppointement() {

    let data;
    
    if (!(emailInp.value && nameInp.value && countInp.value)) {
        showError('Всички полета са задължителни.');
        return;
    }
    if (Number(countInp.value.trim()) >= 9 || Number(countInp.value.trim()) <= 0 || Number(countInp.value.trim()) % 1 != 0) {
        showError('Максималният брой посетители е 8. Моля въведете валиден брой посетители.');
        return;
    }

    if (nameInp.value.length > 50){
        showError('Максималната дължна на Име и Фалимия е 50 символа. Ако не са достатъчни запишете само Име или Фамилия.');
        return;
    }

    if(!/^[\w\.]+@([\w-]+\.)+[A-Za-z]{2,4}$/gm.test(emailInp.value)){
        showError('Моля въведете валиден имейл.');
        return;
    }

    if (!(selectedOption && dateInput.value)) {
        showError('Моля изберете дата и час.');
        return;
    }

    const date = dateInput.value;
    const varDate = new Date(date); 
    const today = new Date();

    today.setHours(23,59,59,99);
    
    if (varDate <= today) {
        showError('Моля изберете валидна дата.');
        return;
    }

    myAlert.style.display = 'none';
    data = {
        email: emailInp.value.trim(),
        name: nameInp.value.trim(),
        guest_count: Number(countInp.value.trim()),
        date_time: `${dateInput.value.trim()} ${document.getElementById(selectedOption).textContent.trim()}:00`
    }


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://saturday.skostadinov.com/schedule", requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).message) {
                alertUser();
            }
        })
        .catch(error => {
            showError(error);
        });

}

function showError(err) {
    myAlert.style.display = 'block';
    console.log(err);
    myAlert.textContent = err;
}

function alertUser() {
    alert('Успешно записан час!');
    window.location = 'index.shtml';
}

fetchAllFreeHours();
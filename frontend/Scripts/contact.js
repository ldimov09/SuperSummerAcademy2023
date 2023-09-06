const dateInput = document.getElementById('date-input');
const optionsHolder = document.getElementById('options-holder');
const submitBtn = document.getElementById('submit-button');
const countInp = document.getElementById('countInp');
const emailInp = document.getElementById('emailInp');
const nameInp = document.getElementById('nameInp');
dateInput.addEventListener('change', fetchAllFreeHours);
submitBtn.addEventListener('click', createAppointement);
let selectedOption = null;
let response = null;

function loadAvailableHours(r) {
    response = r;
    optionsHolder.innerHTML = '';
    let i = 0;
    for (let key in r) {
        console.log(i);
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
    console.log(id);
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
    fetch("http://127.0.0.1:8000/schedule?date=" + dateInput.value)
        .then(r => r.json())
        .then(r => loadAvailableHours(r));
}

async function createAppointement() {

    let data;
    if (selectedOption, emailInp.value, nameInp.value, countInp.value) {
        console.log("Creating Appointement");
        data = {
            email: emailInp.value,
            name: nameInp.value,
            guest_count: Number(countInp.value),
            date_time: `${dateInput.value} ${document.getElementById(selectedOption).textContent}:00`
        }
        console.log(data);
    }


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/schedule", requestOptions)
        .then(response => response.text())
        .then(result => {
            alertUser();
        })
        .catch(error => console.log('error', error));
}

function alertUser() {
    alert('Успешно записан час!');
    window.location = 'index.shtml';
}

fetchAllFreeHours();
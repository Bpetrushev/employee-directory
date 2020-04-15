let employeeList = [];
const container = document.querySelector('.container');
const search = document.getElementById('search');
const fetchEmployee = fetch('https://randomuser.me/api/?results=12')
.then((response) => {
    return response.json();
})
.then((data) => {
    generateEmployeeHtml(data.results);
});

function generateEmployeeHtml(arr){
    let htmlForContainer = '';
    arr.forEach( a => {
        const picture = a.picture.large;
        const name = `${a.name.first} ${a.name.last}`;
        const username = a.login.username;
        const email = a.email;
        const city = a.location.city
        const phone = a.phone;
        const adress = `${a.location.street.name} ${a.location.street.number}, ${a.location.state} ${a.location.postcode}`;
        employeeList.push({picture, name, username, email, city, phone, adress});
        htmlForContainer += `<div class="employee">
            <img src='${picture}' alt='Picture of ${name}'>
            <div>
                <p>${name}</p>
                <span>${email}</span>
                <span>${city}</span>
            </div>
        </div>`;
    });
    container.innerHTML = htmlForContainer;
}

container.addEventListener('click', (e) => {
    const employee = document.querySelectorAll('.employee');
    employee.forEach( (em, i) => {
        if(em.contains(e.target)){
            generateLightBox(i, employee.length-1);
        }
    });
});

search.addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    const employee = document.querySelectorAll('.employee');
    if(text === ''){
        employee.forEach( em => {
            em.style.display = 'grid';
        });
    } else {
        for(let i=0; i<employee.length; i++){
            if(employeeList[i].name.toLowerCase().includes(text) || employeeList[i].username.toLowerCase().includes(text)){
                employee[i].style.display = 'grid'; 
            }else{
                employee[i].style.display = 'none'; 
            }
        }

    }
});

function generateLightBox(i, lengthEmployee){
    const div = document.createElement('div');
    div.className = 'lightbox';
    let htmlForLightBox = `
        <div class='lightbox-inside'>
            <img src='${employeeList[i].picture}' alt='${employeeList[i].name} profile picture'>
            <div>
                <img src='svg/x-mark.svg' alt='x-mark' class="xMark">
                <img src='svg/next.svg' alt='next' class="nextArrow">
                <img src='svg/back.svg' alt='back' class="backArrow">
                <p><strong>${employeeList[i].name}</strong></p>
                <p>${employeeList[i].username}</p>
                <p>${employeeList[i].email}</p>
                <p>${employeeList[i].city}</p>
                <hr>
                <p>${employeeList[i].phone}</p>
                <p>${employeeList[i].adress}</p>
            </div>
        </div>
    `;
    document.body.appendChild(div);
    const lightbox = document.querySelector('.lightbox');
    lightbox.innerHTML = htmlForLightBox;
    
    lightbox.addEventListener('click', (event) => {
        if(event.target.className === 'xMark'){
            lightbox.remove();
        } 
        if(event.target.className === 'nextArrow' && lengthEmployee>i){
            lightbox.remove();
            generateLightBox(i+1, lengthEmployee);
        } else if(event.target.className === 'backArrow' && i>0){
            lightbox.remove();
            generateLightBox(i-1, lengthEmployee);
        }
    });
}



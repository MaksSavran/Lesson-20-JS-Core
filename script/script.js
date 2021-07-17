const getID = id => document.getElementById(id);
const getTableBody = document.getElementById('tableBody');
const getAddButton = document.getElementById('addButton');
const getSaveButton = document.getElementById('saveButton');
const getForm = document.getElementById('form');
const editButoon = `<button type="button" class="btn btn-warning" id="editButton">Edit</button>`;
const deleteButton = `<button type="button" class="btn btn-danger" id="deleteButton">Delete</button>`;

let usersList = [];
let inputArray = [
    {
        inputId: 'login',
        regExp: /^[a-zA-Z]{4,16}$/,
        isValid: false
    },
    {
        inputId: 'password',
        regExp: /^[\w\-\.]{4,16}$/,
        isValid: false
    },
    {
        inputId: 'email',
        regExp: /^[\w\.\-]+@[\w]+\.[\w\.]+$/,
        isValid: false
    }
];
let userIndex;

getAddButton.addEventListener('click', addUser);
setValidation(inputArray);

function addUser() {
    let userObj = {
        login: getID('login').value,
        password: getID('password').value,
        email: getID('email').value,
    };
    if (checkValidation(inputArray)) {
        usersList.push(userObj);
        clearForm();
        render(usersList);
    }
}
function setValidation(inputArray) {
    inputArray.forEach(elem => {
        getID(elem.inputId).addEventListener('focusout', () => {

            if (elem.regExp.test(getID(elem.inputId).value)) {
                getID(elem.inputId).classList.add('is-valid');
                getID(elem.inputId).classList.remove('is-invalid');
                elem.isValid = true;
            } else {
                getID(elem.inputId).classList.add('is-invalid');
                getID(elem.inputId).classList.remove('is-valid');
                elem.isValid = false;
            }
        });
    });
     console.log(inputArray);
     console.log(inputArray.every(({ isValid }) => isValid));
    // return inputArray.every(({ isValid }) => isValid);
}
function checkValidation(inputArray) {
    return inputArray.every(({ isValid }) => isValid);
};
function render(usersList) {
    tableBody.innerHTML = '';
    usersList.forEach((elem, id) => {
        let tr = document.createElement('tr');
        tr.setAttribute('data-id', `${id}`);
        tableBody.appendChild(tr);
        tr.innerHTML =
            `<th>${id + 1}</th>
        <td>${elem.login}</td>
        <td>${elem.password}</td>
        <td>${elem.email}</td>
        <td>${editButoon}</td>
        <td>${deleteButton}</td>`;
        tr.querySelector('#deleteButton').addEventListener('click', deleteUser);
        tr.querySelector('#editButton').addEventListener('click', editUser);
    });

}
function deleteUser(event) {
    let targetRow = event.target.closest('tr');
    userIndex = targetRow.getAttribute('data-id');
    usersList.splice(userIndex, 1);
    render(usersList);
}
function editUser(event) {
    let targetRow = event.target.closest('tr');
    userIndex = targetRow.getAttribute('data-id');
    getID('login').value = usersList[userIndex].login;
    getID('password').value = usersList[userIndex].password;
    getID('email').value = usersList[userIndex].email;
    getAddButton.classList.add('hidden');
    getSaveButton.classList.remove('hidden');
    getSaveButton.addEventListener('click', saveEditUser);
}
function saveEditUser() {
    if (checkValidation(inputArray)) {
    let editData = {
        login: getID('login').value,
        password: getID('password').value,
        email: getID('email').value,
    };
    usersList.splice(userIndex, 1, editData);
    getAddButton.classList.remove('hidden');
    getSaveButton.classList.add('hidden');
    clearForm();
    render(usersList);
}
}
function clearForm() {
    getForm.reset();
    inputArray.forEach(elem => {
        elem.isValid = false;
        getID(elem.inputId).classList.remove('is-valid');
    });
}
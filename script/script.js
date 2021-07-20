const getTableBody = document.getElementById('tableBody');
const getAddButton = document.getElementById('addButton');
const getSaveButton = document.getElementById('saveButton');
const getForm = document.getElementById('form');
const getLoginInput = document.getElementById('login');
const getPasswordInput = document.getElementById('password');
const getEmailInput = document.getElementById('email');
const editButoon = `<button type="button" class="btn btn-warning" id="editButton">Edit</button>`;
const deleteButton = `<button type="button" class="btn btn-danger" id="deleteButton">Delete</button>`;

let usersList = [];
let userIndex;

getAddButton.addEventListener('click', addUser);
getLoginInput.addEventListener('blur', () => inputValidation(getLoginInput));
getPasswordInput.addEventListener('blur', () => inputValidation(getPasswordInput));
getEmailInput.addEventListener('blur', () => inputValidation(getEmailInput));

function inputValidation(selector) {
    let regExp = new RegExp(selector.pattern);
    if (regExp.test(selector.value)) {
        selector.classList.add('is-valid');
        selector.classList.remove('is-invalid');
        return true;
    } else {
        selector.classList.add('is-invalid');
        selector.classList.remove('is-valid');
        return false;
    }
}
function checkValidation() {
    return inputValidation(getLoginInput) && inputValidation(getPasswordInput) && inputValidation(getEmailInput);
}

function getFormData() {
    return {
        login: getLoginInput.value,
        password: getPasswordInput.value,
        email: getEmailInput.value,
    };
}
function addUser() {
    if (checkValidation()) {
        let userObj = getFormData();
        usersList.push(userObj);
        clearForm();
        render(usersList);
    }
}

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
    getLoginInput.value = usersList[userIndex].login;
    getPasswordInput.value = usersList[userIndex].password;
    getEmailInput.value = usersList[userIndex].email;
    getAddButton.classList.add('hidden');
    getSaveButton.classList.remove('hidden');
    getSaveButton.addEventListener('click', saveEditUser);
}
function saveEditUser() {
    if (checkValidation()) {
        let editData = getFormData();
        usersList.splice(userIndex, 1, editData);
        getAddButton.classList.remove('hidden');
        getSaveButton.classList.add('hidden');
        clearForm();
        render(usersList);
    }
}
function clearForm() {
    getForm.reset();
    getLoginInput.classList.remove('is-valid');
    getPasswordInput.classList.remove('is-valid');
    getEmailInput.classList.remove('is-valid');
}
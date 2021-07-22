const tableBody = document.getElementById('tableBody');
const addButton = document.getElementById('addButton');
const saveButton = document.getElementById('saveButton');
const form = document.getElementById('form');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const editButoon = `<button type="button" class="btn btn-warning" id="editButton">Edit</button>`;
const deleteButton = `<button type="button" class="btn btn-danger" id="deleteButton">Delete</button>`;

let usersList = [];
let currentUserIndex;

addButton.addEventListener('click', addUser);
saveButton.addEventListener('click', saveEditUser);
loginInput.addEventListener('keyup', () => validateInput(loginInput));
//loginInput.addEventListener('change', () => validateInput(loginInput));
passwordInput.addEventListener('keyup', () => validateInput(passwordInput));
//passwordInput.addEventListener('change', () => validateInput(passwordInput));
emailInput.addEventListener('keyup', () => validateInput(emailInput));
//emailInput.addEventListener('change', () => validateInput(emailInput));

function validateInput(element) {
    let regExp = new RegExp(element.pattern);
    showValidationTooltip(element, regExp.test(element.value));
    return regExp.test(element.value) ? true : false;
}
function showValidationTooltip(element, isValid) {
    if (isValid) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
}
function checkValidation() {
    return validateInput(loginInput) && validateInput(passwordInput) && validateInput(emailInput);
}
function getFormData() {
    return {
        login: loginInput.value,
        password: passwordInput.value,
        email: emailInput.value,
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
    usersList.forEach((user, id) => {
        let tr = document.createElement('tr');
        tr.setAttribute('data-id', `${id}`);
        tableBody.appendChild(tr);
        tr.innerHTML =
            `<th>${id + 1}</th>
        <td>${user.login}</td>
        <td>${user.password}</td>
        <td>${user.email}</td>
        <td>${editButoon}</td>
        <td>${deleteButton}</td>`;
        tr.querySelector('#deleteButton').addEventListener('click', deleteUser);
        tr.querySelector('#editButton').addEventListener('click', editUser);
    });

}
function deleteUser(event) {
    let targetRow = event.target.closest('tr');
    currentUserIndex = targetRow.getAttribute('data-id');
    usersList.splice(currentUserIndex, 1);
    render(usersList);
}
function editUser(event) {
    let targetRow = event.target.closest('tr');
    currentUserIndex = targetRow.getAttribute('data-id');
    loginInput.value = usersList[currentUserIndex].login;
    passwordInput.value = usersList[currentUserIndex].password;
    emailInput.value = usersList[currentUserIndex].email;
    addButton.classList.toggle('hidden');
    saveButton.classList.toggle('hidden');

}
function saveEditUser() {
    if (checkValidation()) {
        let editData = getFormData();
        usersList.splice(currentUserIndex, 1, editData);
        addButton.classList.toggle('hidden');
        saveButton.classList.toggle('hidden');
        clearForm();
        render(usersList);
    }
}
function clearForm() {
    form.reset();
    loginInput.classList.remove('is-valid');
    passwordInput.classList.remove('is-valid');
    emailInput.classList.remove('is-valid');
}
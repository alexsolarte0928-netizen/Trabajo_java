let contacts = JSON.parse(localStorage.getItem('my_contacts')) || [
    { name: 'Alex Solarte', phone: '310 456 7890' },
    { name: 'María Gómez', phone: '320 987 6543' }
];
 
let editIndex = -1;
 
const nameInput = document.getElementById('contact-name');
const phoneInput = document.getElementById('contact-phone');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
 
renderContacts();
 
function guardarContactos() {
    localStorage.setItem('my_contacts', JSON.stringify(contacts));
}
 
function saveContact() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
 
    if (name === '' || phone === '') {
        alert('Por favor ingresa el nombre y el teléfono');
        return;
    }
 
    if (editIndex === -1) {
        contacts.push({ name: name, phone: phone });
    } else {
        contacts[editIndex] = { name: name, phone: phone };
        cancelEdit();
        guardarContactos();
        renderContacts();
        return;
    }
 
    nameInput.value = '';
    phoneInput.value = '';
    guardarContactos();
    renderContacts();
}
 
function editContact(index) {
    editIndex = index;
    nameInput.value = contacts[index].name;
    phoneInput.value = contacts[index].phone;
 
    submitBtn.innerText = 'Actualizar Contacto';
    cancelBtn.style.display = 'block';
    nameInput.focus();
}
 
function cancelEdit() {
    editIndex = -1;
    nameInput.value = '';
    phoneInput.value = '';
 
    submitBtn.innerText = 'Guardar Contacto';
    cancelBtn.style.display = 'none';
}
 
function deleteContact(index) {
    if (editIndex === index) {
        cancelEdit();
    }
    contacts.splice(index, 1);
    guardarContactos();
    renderContacts();
}
 
function renderContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
 
    if (contacts.length === 0) {
        contactList.innerHTML = '<p class="empty-msg">No tienes contactos guardados aún.</p>';
        return;
    }
 
    contacts.forEach(function (contact, index) {
        const element = document.createElement('div');
        element.classList.add('contact-item');
 
        const infoWrapper = document.createElement('div');
        infoWrapper.classList.add('contact-info');
 
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('contact-name');
        nameSpan.innerText = contact.name;
 
        const phoneSpan = document.createElement('span');
        phoneSpan.classList.add('contact-phone');
        phoneSpan.innerText = contact.phone;
 
        const actionsWrapper = document.createElement('div');
        actionsWrapper.classList.add('item-actions');
 
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Editar';
        editBtn.onclick = function () { editContact(index); };
 
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Eliminar';
        deleteBtn.onclick = function () { deleteContact(index); };
 
        infoWrapper.appendChild(nameSpan);
        infoWrapper.appendChild(phoneSpan);
 
        actionsWrapper.appendChild(editBtn);
        actionsWrapper.appendChild(deleteBtn);
 
        element.appendChild(infoWrapper);
        element.appendChild(actionsWrapper);
 
        contactList.appendChild(element);
    });
}
 
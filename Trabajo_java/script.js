// 1. ESTADO: Arreglo inicial con algunos contactos de ejemplo
let contacts = [
    { name: 'Juan Pérez', phone: '3104567890', email: 'juan@email.com' },
    { name: 'María Gómez', phone: '3209876543', email: 'maria@email.com' }
];

// Dibujamos la lista al cargar la página
renderContacts();

// 2. FUNCIÓN PARA AGREGAR UN NUEVO CONTACTO
function addContact() {
    const nameInput = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');
    const emailInput = document.getElementById('contact-email');

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (name === '' || phone === '') {
        alert('Por favor escribe al menos el nombre y el teléfono');
        return;
    }

    // Agregamos el nuevo contacto al arreglo
    contacts.push({
        name: name,
        phone: phone,
        email: email
    });

    // Limpiamos los inputs del formulario
    nameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';

    // Volvemos a renderizar la lista
    renderContacts();
}

// 3. FUNCIÓN PARA ELIMINAR UN CONTACTO ESPECÍFICO
function deleteContact(index) {
    // Eliminamos 1 elemento en la posición 'index'
    contacts.splice(index, 1);
    
    // Volvemos a dibujar la lista actualizada
    renderContacts();
}

// 4. FUNCIÓN RENDER: Dibuja los contactos en el HTML
function renderContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    // Recorremos el arreglo con forEach usando 'index'
    contacts.forEach(function (contact, index) {
        // Creamos la tarjeta del contacto (li o div con clase 'contact-item')
        const element = document.createElement('li');
        element.classList.add('contact-item');

        // Contenedor interno para la información
        const infoWrapper = document.createElement('div');
        infoWrapper.classList.add('contact-info');

        // Span para el Nombre
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('contact-name');
        nameSpan.innerText = contact.name;

        // Span para los Detalles (Teléfono y Correo)
        const detailsSpan = document.createElement('span');
        detailsSpan.classList.add('contact-details');
        detailsSpan.innerText = `${contact.phone} ${contact.email ? ' - ' + contact.email : ''}`;

        // Botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-delete');
        deleteButton.innerText = 'Eliminar';
        
        // Al hacer clic, eliminamos este contacto usando su índice
        deleteButton.onclick = function () {
            deleteContact(index);
        };

        // Unimos las piezas
        infoWrapper.appendChild(nameSpan);
        infoWrapper.appendChild(detailsSpan);
        
        element.appendChild(infoWrapper);
        element.appendChild(deleteButton);
        
        contactList.appendChild(element);
    });
}
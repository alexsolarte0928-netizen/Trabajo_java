// 1. ESTADO: Agregamos la propiedad 'completed' (inicia en false)
const todos = [
    { title: 'Estudiar desarrollo web', dueDate: '2026-11-15', completed: false },
    { title: 'Practicar bases de datos', dueDate: '2026-11-16', completed: true }, // Ejemplo ya completado
    { title: 'Hacer ejercicio', dueDate: '2026-11-17', completed: false }
];

render();

function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value.trim();

    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    if (title === '') {
        alert('Por favor escribe una tarea');
        return;
    }

    // 2. Al crear una nueva tarea, siempre nace como no completada (false)
    todos.push({
        title: title,
        dueDate: dueDate,
        completed: false
    });

    textbox.value = '';
    datePicker.value = '';

    render();
}

// 3. NUEVA FUNCIÓN: Cambia el estado de completado de una tarea específica
function toggleTodo(index) {
    // El operador '!' invierte el valor: si era false pasa a true, y viceversa
    todos[index].completed = !todos[index].completed;
    
    // Volvemos a dibujar la lista para que se refleje el tachado
    render();
}

function render() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    // 4. Pasamos 'index' en el forEach para saber qué posición exacta tiene cada tarea
    todos.forEach(function (todo, index) {
        const element = document.createElement('div');
        element.classList.add('todo-item');

        // Contenedor interno para agrupar el checkbox y el texto
        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('todo-content');

        // Creamos el checkbox dinámicamente
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed; // Marca la casilla si completed es true

        // Escuchamos el evento 'change' (cuando el usuario marca o desmarca)
        checkbox.onchange = function () {
            toggleTodo(index);
        };

        // Creamos un span para el texto de la tarea
        const textSpan = document.createElement('span');
        textSpan.innerText = `${todo.title} - (${todo.dueDate || 'Sin fecha'})`;

        // 5. Si la tarea está completada, le añadimos la clase CSS que la tacha
        if (todo.completed) {
            textSpan.classList.add('completed');
        }

        // Unimos las piezas: checkbox + texto -> contenedor interno -> tarjeta -> lista
        contentWrapper.appendChild(checkbox);
        contentWrapper.appendChild(textSpan);
        element.appendChild(contentWrapper);
        todoList.appendChild(element);
    });
}
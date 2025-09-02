console.log('Script loaded');

// =# STATE & GLOBAL VARIABLES #=

const todos = [
    {
        id: 1,
        date_created: '2025-08-30',
        title: 'Learning HTML',
        details: 'Study the basics of HTML including elements, attributes, and semantic tags.',
        completed: true
    },
    {
        id: 2,
        date_created: '2025-08-30',
        title: 'Learning CSS', 
        details: 'Understand CSS fundamentals such as selectors, properties, and the box model.',
        completed: true
    },
    {
        id: 3,
        date_created: '2025-08-30',
        title: 'Learning JavaScript',
        details: 'Get familiar with JavaScript syntax, data types, and basic programming concepts.',
        completed: false
    },
];

// =# ------------------------ #-

// =# DOM ELEMENT SELECTORS #=

const formElement = document.querySelector('#add-todo-form');
const inputTitleElement = document.querySelector('#input-task-title');
const inputDetailsElement = document.querySelector('#input-task-details');
const todoListElement = document.querySelector('#todo-list');

// =# --------------------- #-

// =# FUNCTIONS #=

const renderTodos = () => {
    let todosHTML = '';

    todos.forEach(
        (todo) => { 
            todosHTML += `
                <li class="todo-app__item ${ todo.completed ? 'todo-completed' : '' }">

                    <div class="todo-app__item-date">
                        <span class="underline bold">Date created:</span> <br> <span class="italic">${ todo.date_created }</spam>
                    </div>
                        
                    <h4 class="todo-app__item-title ${ todo.completed ? 'todo-completed' : '' }">
                        ${ todo.title }
                    </h4>

                    <p class="todo-app__item-details ${ todo.completed ? 'todo-completed' : '' }">${
                        todo.details 
                    }</p>
                </li>
            `;
        }
    );

    todoListElement.innerHTML = todosHTML;
}

// =# --------- #=

// =# EVENT LISTENERS #=

formElement.addEventListener(
    'submit',
    (event) => {
        event.preventDefault();

        const inputTitleValue = inputTitleElement.value.trim();
        const inputDetailsValue = inputDetailsElement.value.trim();
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        // Empty input validation

        if (inputTitleValue === '') {
            alert('Please enter a task title.');
            return;
        }

        else if (inputDetailsValue === '') {
            alert('Please enter task details.');
            return;
        }
        // ----------------------

        console.log("Form submitted");
        console.log("Title:", inputTitleValue);
        console.log("Details:", inputDetailsValue);

        // Insert the input value into a new todo object

        const newTodo = {
            id: Date.now(), // Unique ID based on timestamp
            date_created: formattedDate,
            title: inputTitleValue,
            details: inputDetailsValue,
            completed: false
        }

        todos.push(newTodo);
        console.log("New Todo Successflly Added:", todos);

        // ---------------------------------------------

        renderTodos();
        formElement.reset(); // Clear the form inputs
    }
);

// =# --------------- #=


// =# INITIALIZATION #=

renderTodos();

// =# -------------- #=
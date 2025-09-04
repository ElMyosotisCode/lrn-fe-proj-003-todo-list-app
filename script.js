console.log('Script loaded');

// =# STATE & GLOBAL VARIABLES #=

let todos = [
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
                <li 
                    class="todo-app__item ${ todo.completed ? 'todo-completed' : '' }"
                    data-id="${ todo.id }">

                    <!-- div 1 ~ Row 1 Column 1 : Main Content - Note Header -->

                    <div class="todo-app__item-column-content-header">
                        <div class="todo-app__item-date">
                            <span class="underline bold">Date created:</span> <br> <span class="italic">${ todo.date_created }</spam>
                        </div>
                            
                        <h4 class="todo-app__item-title ${ todo.completed ? 'todo-completed' : '' }">
                            ${ todo.title }
                        </h4>
                    </div>

                    <!-- ------------------------------------------- -->

                    <!-- div 2 ~ Row 2 Column 1 : Action Button - Checkbox -->

                    <div class="todo-app__item-column-checkbox">
                        <input
                            id="item-task-toggle-complete"
                            class="todo-app__item-complete-checkbox"
                            name="task-toggle-complete"
                            type="checkbox"
                            ${ todo.completed ? 'checked' : '' }>
                    </div>

                    <!-- ------------------------------------------ -->

                    <!-- div 3 ~ Row 2 Column 2 : Main Content - Note Body -->

                    <div class="todo-app__item-column-content-body">
                        <p class="todo-app__item-details ${ todo.completed ? 'todo-completed' : '' }">${
                            todo.details 
                        }</p>
                    </div>

                    <!-- ----------------------------------------- -->

                    <!-- div 4 ~ Row 2 Column 3 : Action Button - Delete -->

                    <div class="todo-app__item-column-delete-btn">
                        <button
                            type="button"
                            class="todo-app__item-delete-button">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="currentColor" stroke-width="2"stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    <!-- ---------------------------------------- -->
                </li>
            `;
        }
    );

    todoListElement.innerHTML = todosHTML;
}

const deleteTodo = (id) => {
    // 1.) Show confirmation dialogue and save the confirmation result
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");

    // 2.) Confirmation result based action
    //      2.1) If confirmed, delete the todo item
    if (isConfirmed) {
        todos = todos.filter(todo_item => todo_item.id !== Number(id));
        renderTodos();
        console.log("Task deleted successfully.");
    } 

    //      2.2) If canceled, do nothing
    else {
        console.log("Task deletion canceled.");
    }
}

const toggleCompleteTodo = (id) => {
    todos = todos.map(
        (todo_item) => {
            if (todo_item.id === Number(id)) {
                return {
                    ...todo_item,
                    completed: !todo_item.completed
                };
            }

            else {
                return todo_item;
            }
        }
    );

    renderTodos();
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

todoListElement.addEventListener(
    'click',
    (event) => {
        const target = event.target;
        const parentListItem = target.closest('li');

        // Check if the 'click' is targeted on the Notes Item

        if (!parentListItem) return; // Click outside a list item

        // --------------------------------------------------

        const todoId = parentListItem.dataset.id;

        // === ROUTER LOGIC ===

        // Check if "Toggle Complete" is clicked
        if (target.classList.contains('todo-app__item-complete-checkbox')) {
            toggleCompleteTodo(todoId);
        }

        // Check if "Delete Button" is clicked
        else if (target.classList.contains('todo-app__item-delete-button')) {
            deleteTodo(todoId);
        }

        // ====================
    }
);

// =# --------------- #=


// =# INITIALIZATION #=

renderTodos();

// =# -------------- #=
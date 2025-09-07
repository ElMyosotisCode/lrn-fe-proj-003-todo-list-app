console.log('Script loaded');

// =# 01.] STATE & GLOBAL VARIABLES #=

/* 01.1] Create a set (array) of dummy objects to be shown on the site. 
        -> This array holds the entire state of the application
        -> The UI is a direct reflection of this array. */

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

// 01.1] ---------------------------------------------------

// =# ------------------------ #-

// =# 02.] DOM ELEMENT SELECTORS #=

/* 02.1] Cache the frequently used DOM elements for.
        -> This cache brings better performance and maintainability
        -> We select those DOM elements once here to avoid repeated queries in our function*/

const formElement = document.querySelector('#add-todo-form');
const inputTitleElement = document.querySelector('#input-task-title');
const inputDetailsElement = document.querySelector('#input-task-details');
const todoListElement = document.querySelector('#todo-list');

// 02.1] -----------------------------------------------------------------------

// =# --------------------- #-

// =# 03.] FUNCTIONS #=

/* 03.1] The "Painter" or "Renderer" Function
        -> Generates the HTML for the entire todo list based on the 'todos' array.
        -> It completely replaces the existing list in the DOM with the new version.
        -> This function is called whenever a todo is added or deleted
*/

const renderTodos = () => {
    let todosHTML = '';

    todos.forEach(
        (todo) => { 
            todosHTML += `
                <li 
                    class="todo-app__item"
                    data-completed="${ todo.completed }"
                    data-id="${ todo.id }">

                    <!-- div 1 ~ Row 1 Column 1 : Main Content - Note Header -->

                    <div class="todo-app__item-column-content-header">
                        <div class="todo-app__item-date">
                            <span class="underline bold">Date created:</span> <br> <span class="italic">${ todo.date_created }</spam>
                        </div>
                            
                        <h4 class="todo-app__item-title">
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
                        <p class="todo-app__item-details">${
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

/* 03.1] ------------------------------------ */ 

/* 03.2] The Immutable-"Deleter" Function
        -> Removes a specific todo item from the state.
        -> It creates a new 'todos' array, filtering out the item to be deleted.
        -> After updating the state, it calls renderTodos() to update the UI.
*/

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

/* 03.2] -------------------------------------- */

/* 03.3] The Immutable-"Toggler" Function
        -> Toggles the 'completed' status of a specific todo item.
        -> It creates a new 'todos' array using .map(), returning a new object for the
            item that was changed, and the original objects for all others.
        -> Note: This function ONLY updates the data state, not the DOM
*/

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
}

/* -------------------------------------- */

// =# --------- #=

// =# 04.] EVENT LISTENERS #=

/* 04.1] Listener for the "Add New Task" form
        -> Handles the 'submit' event.
        -> Prevents default page reload, validates input, creates a new todo object,
            pushes it to the 'todos' state, and then re-renders the list.
*/

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

/* 04.1] ------------------------------------------ */

/* 04.2] Listener for "click(s)" within the entire todo list
        -> It's an `Event Delegation`
        -> Uses event delegation to handle clicks on dynamically created todo items.
        -> Determines if the click was on a "Toggle Complete" checkbox or a "Delete" button,
            and calls the appropriate function.
*/

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
            // Data Update through .map() to change completed status
            toggleCompleteTodo(todoId);

            // Re-render the updated todos
            const currentTodo = todos.find(todo => todo.id === Number(todoId));
            parentListItem.dataset.completed = currentTodo.completed;
        }

        // Check if "Delete Button" is clicked
        else if (target.classList.contains('todo-app__item-delete-button')) {
            deleteTodo(todoId);
        }

        // ====================
    }
);

/* 04.3] ---------------------------------------------------------*/

// =# --------------- #=


// =# 05.] INITIALIZATION #=

/* 05.1] Initial data render
        > Calls renderTodos() once when the script first loads to paint the
            initial state of the todo list onto the page.
*/ 

renderTodos();

/* 05.1] ------------------- */

// =# -------------- #=
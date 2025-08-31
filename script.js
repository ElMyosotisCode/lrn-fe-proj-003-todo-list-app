console.log('Script loaded');

const todos = [
    {
        id: 1, 
        title: 'Learning HTML',
        details: 'Study the basics of HTML including elements, attributes, and semantic tags.',
        completed: true
    },
    {
        id: 2, 
        title: 'Learning CSS', 
        details: 'Understand CSS fundamentals such as selectors, properties, and the box model.',
        completed: true
    },
    {
        id: 3, 
        title: 'Learning JavaScript',
        details: 'Get familiar with JavaScript syntax, data types, and basic programming concepts.',
        completed: false
    },
];

const todoListElement = document.querySelector('#todo-list');

const renderTodos = () => {
    let todosHTML = '';

    todos.forEach(
        (todo) => { 
            todosHTML += `
                <li class="todo-app__item ${ todo.completed ? 'todo-completed' : '' }">
                    <h4 class="todo-app__item-title ${ todo.completed ? 'todo-completed' : '' }">
                        ${ todo.title }
                    </h4>

                    <p class="todo-app__item-details ${ todo.completed ? 'todo-completed' : '' }">
                        ${ todo.details }
                    </p>
                </li>
            `;
        }
    );

    todoListElement.innerHTML = todosHTML;
}

renderTodos();
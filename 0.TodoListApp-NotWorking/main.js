function addTodo() {
    const todoTitle = dom.todoInput.value;

    const newTodo = {
        'task': todoTitle,
        'completed': false
    }

    //change state
    todoItems.push(newTodo);
}

function toggleComplete(index) {
    console.log('0.we in here');

    const todo = todoItems[index];
    todo.completed =  !todo.completed;

}

function deleteTodo(index) {
    todoItems.splice(index, 1);
}

function renderTodos() {
    console.log('we in here');
    
    dom.todoList.innerHTML = '';
    for (let i = 0; i < todoItems.length; i++) {
        const todo = todoItems[i];
        console.log(`i=${i}`);
        
        //for every object generate HTML
        dom.todoList.innerHTML += `
            <li class="todo-item" data-id="${i}">
                <span class="${todo.completed?'completed':''}">${todo.task}</span>
                <button class="complete-btn">${todo.completed?'Undo':'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </li>
        `;

        //We create buttons here and that's why we create addEventListeners here...
        // TOFIX: Add event listenters to the buttons (to the ul container, e.target style):
        const completeBtn = document.querySelector(`li[data-id='${i}']>.complete-btn`);
        const deleteBtn = document.querySelector(`li[data-id='${i}']>.delete-btn`);

        completeBtn.addEventListener('click', (e)=>{
            // console.log('sss');

            // console.log('1.We in here');
            // console.log(`0.i=${i}`);
            
            //data attribute - to know which li is pressed on
            const index = completeBtn.parentElement.dataset.id;
            console.log(`index: ${index}`);

            //change state
            toggleComplete(index);
            //change UI
            renderTodos();
            console.dir(todoItems);
        });

        deleteBtn.addEventListener('click', (e)=>{
            //console.log('000');
            
            const index = completeBtn.parentElement.dataset.id;
            console.log(`index: ${index}`);

            //change state
            deleteTodo(index);
            //change UI
            renderTodos();
            console.dir(todoItems);
        });

    }
}

// Get DOM elements
const dom = {
    todoInput : document.getElementById('todo-input'),
    addTodoButton : document.getElementById('add-todo'),
    todoList : document.getElementById('todo-list')
};

// initialize state
const todoItems = [
    {
        'task': 'Task 1',
        'completed': false
    },
    {
        'task': 'Task 2',
        'completed': true
    },
]; // взимаме информация от тук, когато искаме да изобразяваме

renderTodos();

dom.addTodoButton.addEventListener('click', (e)=>{
    //change state
    addTodo();
    //change UI
    renderTodos();
    console.dir(todoItems);
});
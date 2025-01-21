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

dom.todoList.addEventListener("click", (e)=>{
    let targetId = e.target.parentElement.dataset.id;

    if(e.target.classList.contains('complete-btn')){
        todoItems[targetId].completed = !todoItems[targetId].completed;
    }else if(e.target.classList.contains('delete-btn')){
        todoItems.splice(targetId, 1);
    }
        
    renderTodos();
    
});
function addTodo() {
    const todoTitle = dom.todoInput.value.trim();

    if (!todoTitle) {
        alert('Please enter a correct task title!');
        return;
    }

    const newTodo = {
        'task': todoTitle,
        'completed': false
    };

    //change state
    todoItems.push(newTodo);

    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    dom.todoInput.value = '';

}

function toggleComplete(index) {

    // toggle todo object 'completed' property value:
    todoItems[index].completed = !todoItems[index].completed;

    localStorage.setItem('todoItems', JSON.stringify(todoItems));

}

function deleteTodo(index) {

    index >= 0 && todoItems.splice(index, 1);

    localStorage.setItem('todoItems', JSON.stringify(todoItems));

}

function renderTodos() {
    // console.log('we in here');

    dom.todoList.innerHTML = '';

    for (let i = 0; i < todoItems.length; i++) {
        const todo = todoItems[i];
        const index = i;
        console.log(`i=${i}`);

        const listItem = document.createElement("li");
        listItem.className = "todo-item";

        if (todo.completed) {
            listItem.innerHTML = `<span class="completed">${todo.task}</span>`;
        } else {
            listItem.innerHTML = `<span>${todo.task}</span>`;
        }

        //Set dataset index for identification
        listItem.dataset.index = index;

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = todo.completed ? "Undo" : "Complete";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        //Apend the buttons to the li
        listItem.append(completeBtn);
        listItem.append(deleteBtn);

        //Append the li to the ul
        dom.todoList.appendChild(listItem);

        completeBtn.addEventListener('click', (e) => {

            //change state
            toggleComplete(index);

            //change UI
            renderTodos();
            console.dir(todoItems);
        });

        deleteBtn.addEventListener('click', (e) => {
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
    todoInput: document.getElementById('todo-input'),
    addTodoButton: document.getElementById('add-todo'),
    todoList: document.getElementById('todo-list')
};

// // initialize state
// const todoItems = [
//     {
//         'task': 'Task 1',
//         'completed': false
//     },
//     {
//         'task': 'Task 2',
//         'completed': true
//     },
// ]; // взимаме информация от тук, когато искаме да изобразяваме

let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];
renderTodos();
dom.todoInput.focus();

dom.addTodoButton.addEventListener("click", (e) => {
    //change state
    addTodo();
    //change UI
    renderTodos();
    console.dir(todoItems);
});

dom.todoInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        //change state
        addTodo();
        //change UI
        renderTodos();
        console.dir(todoItems);
    }
});
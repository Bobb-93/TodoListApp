function addTodo() {
    const todoTitle = dom.todoInput.value.trim();

    //[Node JS] change server state
    //[Node JS] fetch - и ако е минало успешно, да променяме

    //change local state

    if (!todoTitle) {
        alert('Please enter a correct task title!');
        return;
    }

    //[Node JS] to send with POST method in JSON format (as object)
    const newTodo = {
        'task': todoTitle,
        'completed': false
    };

    //change state
    todoItems.push(newTodo);

    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    dom.todoInput.value = '';

    //change server value

}

function toggleComplete(index) {

    // toggle todo object 'completed' property value:
    todoItems[index].completed = !todoItems[index].completed;

    //[Node JS] use PUT with whole object or PATCH method

    localStorage.setItem('todoItems', JSON.stringify(todoItems));

}

function deleteTodo(index) {

    //[Node JS] we don't send object

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

async function getTasks(url) {
    try{
        const response = await fetch(url);//if is not OK - later
        const data = await response.json();
        console.log(data);
        
        //set local state
        todoItemsDB = [...data];
    } catch(error){
        console.error(`ERROR: ${error}`);
    }
    
}

const baseURL = "http://localhost:3000/todos";

// initialize state
let todoItemsDB; // взимаме информация от тук, когато искаме да изобразяваме
getTasks(`${baseURL}/todos`);

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
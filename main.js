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

    //change server state
    //POST Request
    fetch(`${baseURL}/todos`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newTodo)
    })
        .then(response => {
            if (response.ok) {
                return response.json();

                //Bad idea:
                //Get Task Id
                // // change local state if server responded ok
                // todoItems.push(newTodo);
            } else {
                throw new Error(`Server error status: ${response.status}`);
            }
        })
        .then(data => {

            //change local state if server responded ok
            todoItems.push(data);
        })
        .catch(error => console.error(`ERROR: ${error}`));

}

function toggleComplete(index) {
    // const todo = todoItems[index];

    const todo = todoItems.filter(todo => todo.id === index)[0];

    console.dir(todoItems);
    console.log(`index: ${index}`);
    console.log(`todo: ${todo}`);

    // todo.completed = !todo.completed;

    fetch(`${baseURL}/todos/${index}`, {
        method: "PATCH",
        body: JSON.stringify({ "completed": !todo.completed }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => {
            if (response.ok) {
                //change local state
                todoItems.forEach(todo => todo.id === index && (todo.completed = !todo.completed));
            } else {
                throw new Error(`Server error status: ${response.status}`);
            }
        })
        .catch(error => console.error(`ERROR: ${error}`));

}

function deleteTodo(index) {
    fetch(`${baseURL}/todos/${index}`, {
        method: "DELETE",
    })
        .then(response => {
            if (response.ok) {
                //change local state
                // todoItems.splice(index, 1);

                const todoIndex = todoItems.findIndex(todo => todo.id == index);
                
                if (todoIndex !== -1) {
                    todoItems.splice(todoIndex, 1);
                }

            } else {
                throw new Error(`Server error status: ${response.status}`);
            }
        })
        .catch(error => console.error(`ERROR: ${error}`));
}

function renderTodos() {
    dom.todoList.innerHTML = '';
    todoItems.forEach(todo => {
        dom.todoList.innerHTML += `
            <li class="todo-item" data-id="${todo.id}">
                <span class="${todo.completed ? 'completed' : ''}">${todo.task}</span>
                <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </li>
        `;
    });
    // for (let i = 0; i < todoItems.length; i++) {
    //     const todo = todoItems[i];

    //     dom.todoList.innerHTML += `
    //         <li class="todo-item" data-id="${i}">
    //             <span class="${todo.completed?'completed':''}">${todo.task}</span>
    //             <button class="complete-btn">${todo.completed?'Undo':'Complete'}</button>
    //             <button class="delete-btn">Delete</button>
    //         </li>
    //     `;
    // }
}

// Get DOM elements
const dom = {
    todoInput: document.getElementById('todo-input'),
    addTodoButton: document.getElementById('add-todo'),
    todoList: document.getElementById('todo-list')
};

async function getTasks(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        todoItems = [...data]

        console.log(data);
        renderTodos();

    } catch (error) {
        console.error('Error:', error);
    }
}

const baseURL = "http://localhost:3000";
// initialize state
let todoItems;
getTasks(`${baseURL}/todos`);
dom.todoInput.focus();

// renderTodos();

dom.addTodoButton.addEventListener('click', (e) => {
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

dom.todoList.addEventListener('click', (e) => {
    console.log(e.target)
    const idx = e.target.parentElement.dataset.id;

    if (e.target.classList.contains('complete-btn')) {
        toggleComplete(idx);
        renderTodos();
    } else if (e.target.classList.contains('delete-btn')) {
        deleteTodo(idx);
        renderTodos();
    }
});
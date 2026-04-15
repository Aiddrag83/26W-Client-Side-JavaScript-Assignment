// Initial commit: set up To-Do List functionality

// Add commit: select DOM elements
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

// Add commit: create array to store tasks
let todos = [];

// Add commit: attach click event to add button
addBtn.addEventListener("click", addTodo);

// Add commit: function to add a new todo item
function addTodo() {
    const text = input.value.trim();

    // Add commit: validate input
    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    // Add commit: create todo object
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    // Add commit: add todo to array
    todos.push(todo);

    // Add commit: re-render todo list
    renderTodos();

    // Add commit: clear input field
    input.value = "";
}

// Add commit: function to render todos to DOM
function renderTodos() {
    list.innerHTML = "";

    // Add commit: loop through todos array
    todos.forEach(todo => {

        const li = document.createElement("li");

        // Add commit: create checkbox element
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        // Add commit: create text element
        const span = document.createElement("span");
        span.textContent = todo.text;

        // Add commit: create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        // Add commit: handle checkbox toggle
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;

            // Add commit: sort completed items to bottom
            todos.sort((a, b) => a.completed - b.completed);

            renderTodos();
        });

        // Add commit: handle delete action
        deleteBtn.addEventListener("click", () => {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });

        // Add commit: apply completed styling
        if (todo.completed) {
            li.classList.add("completed");
        }

        // Add commit: append elements to list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Add commit: append list item to DOM
        list.appendChild(li);
    });
}
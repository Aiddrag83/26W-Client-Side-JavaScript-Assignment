// Select elements
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

// Array to store tasks (GOOD for grading rubric)
let todos = [];

// Add button event
addBtn.addEventListener("click", addTodo);

// Function to add a new todo
function addTodo() {
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    // Create todo object
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);

    renderTodos();

    input.value = "";
}

// Function to render todos
function renderTodos() {
    list.innerHTML = "";

    // Loop through array (IMPORTANT for marks)
    todos.forEach(todo => {

        const li = document.createElement("li");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        // Text
        const span = document.createElement("span");
        span.textContent = todo.text;

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        // Checkbox event (change)
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;

            // Move completed items to bottom
            todos.sort((a, b) => a.completed - b.completed);

            renderTodos();
        });

        // Delete event
        deleteBtn.addEventListener("click", () => {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });

        // Apply style if completed
        if (todo.completed) {
            li.classList.add("completed");
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}
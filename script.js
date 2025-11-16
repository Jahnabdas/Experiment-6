let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => addTaskToUI(task));

addBtn.addEventListener("click", () => {
    let text = taskInput.value.trim();
    if (text === "") return alert("Enter a task!");

    let taskObj = { id: Date.now(), text, completed: false };
    tasks.push(taskObj);
    saveTasks();

    addTaskToUI(taskObj);
    taskInput.value = "";
});

function addTaskToUI(task) {
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
        <span>${task.text}</span>
        <div class="buttons">
            <button class="complete">✔</button>
            <button class="edit">✎</button>
            <button class="delete">✖</button>
        </div>
    `;

    li.querySelector(".complete").addEventListener("click", () => {
        li.classList.toggle("completed");
        updateCompletion(task.id);
    });

    li.querySelector(".edit").addEventListener("click", () => {
        let newText = prompt("Edit task:", task.text);
        if (newText !== null && newText.trim() !== "") {
            task.text = newText;
            li.querySelector("span").innerText = newText;
            saveTasks();
        }
    });

    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        deleteTask(task.id);
    });

    taskList.appendChild(li);
}

function updateCompletion(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

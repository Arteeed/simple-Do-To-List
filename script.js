const addButton = document.querySelector("#addButton");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addButton.click();
  }
});

addButton.addEventListener("click", addTask);

let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(task => renderTask(task));
  }
}

function renderTask(task) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const textNode = document.createTextNode(task.text);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  li.appendChild(checkbox);
  li.appendChild(textNode);
  li.appendChild(deleteButton);
  li.appendChild(editButton);

  if (task.completed) {
    li.classList.add("completed");
  }


  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    if (task.completed) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
    saveTasks();
  });


  deleteButton.addEventListener("click", () => {
    taskList.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });


  editButton.addEventListener("click", () => {
    if (editButton.textContent === "Edit") {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;

      input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          editButton.click();
        }
      });

      li.replaceChild(input, textNode);
      editButton.textContent = "Save";
    } else {
      const input = li.querySelector("input[type=text]");
      task.text = input.value;
      saveTasks();

      const updatedTextNode = document.createTextNode(task.text);
      li.replaceChild(updatedTextNode, input);
      editButton.textContent = "Edit";
    }
  });

  taskList.appendChild(li);
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please Add Task");
    return;
  }
  const newTask = { text: text, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);
  taskInput.value = "";
}

loadTasks();

const addButton = document.getElementById("addButton");
const completeAllButton = document.getElementById("completeAllButton");
const clearButton = document.getElementById("clearButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

addButton.addEventListener("click", addTask);
completeAllButton.addEventListener("click", toggleAllCompleted);
clearButton.addEventListener("click", clearAllTasks);

taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="check">&#10003;</span>
      <span>${taskText}</span>
      <span class="delete">X</span>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
    addEventListeners(li);
    updateTaskCount();
  }
}

function addEventListeners(li) {
  const check = li.querySelector(".check");
  const deleteBtn = li.querySelector(".delete");
  
  check.addEventListener("click", toggleTask);
  deleteBtn.addEventListener("click", deleteTask);
}

function toggleTask(event) {
  const check = event.target;
  const task = check.parentElement;
  task.classList.toggle("completed");
  updateTaskCount();
}

function deleteTask(event) {
  const deleteBtn = event.target;
  const task = deleteBtn.parentElement;
  taskList.removeChild(task);
  updateTaskCount();
}

function toggleAllCompleted() {
  const tasks = taskList.children;
  let allCompleted = true;

  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (!completed) {
      allCompleted = false;
      break;
    }
  }

  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (allCompleted) {
      task.classList.remove("completed");
      if (!completed) {
        check.textContent = "";
      }
    } else {
      task.classList.add("completed");
      if (!completed) {
        check.textContent = "✓";
      }
    }
  }

  updateTaskCount();
}




function clearAllTasks() {
  taskList.innerHTML = ""; // Clear all tasks
  updateTaskCount();
}

function updateTaskCount() {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll(".completed").length;
  taskCount.textContent = `${completedTasks} tasks completed out of ${totalTasks} total tasks`;
}
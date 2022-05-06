const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
filters = document.querySelectorAll(".filters span");
let editedId;
let isEdited = false;
const clearAll = document.querySelector(".clear-btn");
//   getting local storage todo list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showToDo(btn.id);
  });
});

const showToDo = (filter) => {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        li += `<li class="task">
          <label for="${id}">
          <input  onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}/>
          <p class=${isCompleted}>${todo.name}</p>
          </label>
          <div class="settings">
          <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
          <ul class="task-menu">
          <li onclick="updateTask(${id},'${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
          <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
          </ul>
          </div>
          </li>`;
      }
    });
  }
  taskBox.innerHTML = li || `<span> You Dont Have Any Todo Here! </span>`;
};
showToDo("all");

const deleteTask = (id) => {
  todos.splice(id, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showToDo("all");
};
clearAll.addEventListener("click", () => {
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showToDo("all");
});

const updateTask = (id, name) => {
  editedId = id;
  isEdited = true;
  taskInput.value = name;
};

const showMenu = (selectedTask) => {
  // gettingthe task menu div
  let tasMenu = selectedTask.parentElement.lastElementChild;
  tasMenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      tasMenu.classList.remove("show");
    }
  });
};

const updateStatus = (selectedTask) => {
  // getting the paragraph that contains task name
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
};

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();

  if (e.key === "Enter" && userTask) {
    if (!isEdited) {
      if (!todos) {
        // if there is no tod pass an emty array
        todos = [];
      }
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEdited = false;
      todos[editedId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDo("all");
  }
});

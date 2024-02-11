const taskDom = document.querySelector(".list_wrapper"),
  forDom = document.querySelector(".form"),
  taskInput = document.querySelector(".input_task"),
  tasksAlert = document.querySelector(".alert_msg");
const URL_PAGE = "https://task-manager-app-613v.onrender.com";

const showTasks = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get(`${URL_PAGE}/api/v1/tasks`);

    if (tasks.length < 1) {
      return (taskDom.innerHTML = `<h1 class="no_task">no  task available</h1>`);
    }

    const displayTasks = tasks
      .map((task) => {
        const { name, _id: taskID, completed } = task;

        return `<article class="single_item">
      <div class="items_left ${completed && "completed"}">
          <span class="complected_icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path
                      d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
              </svg>
          </span>
          <p class="item_title">${name}</p>
      </div>

      <div class="icon_container">
          <a href="edit.html?id=${taskID}" class="edit_btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
              </svg>
          </a>
          <button class="delete_btn" data-id=${taskID}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash3-fill"
                  viewBox="0 0 16 16">
                  <path
                      d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
          </button>
      </div>
  </article>`;
      })
      .join("");
    taskDom.innerHTML = displayTasks;
  } catch (error) {
    taskDom.innerHTML = `<h1 class="no_task">error fetching task</h1>`;
  }
};

taskDom.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.parentElement.classList.contains("delete_btn")) {
    const id = el.parentElement.parentElement.dataset.id;

    try {
      await axios.delete(`${URL_PAGE}/api/v1/tasks/${id}`);
      showTasks();
      textAlert("task removed", "red");
    } catch (error) {
      console.log(error);
    }
  }
});

forDom.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInput.value;
  if (!name) {
    return textAlert("input a text", "red");
  }

  try {
    axios.post(`${URL_PAGE}/api/v1/tasks`, { name });
    showTasks();
    textAlert("Task added", "green");
    taskInput.value = "";
  } catch (error) {
    console.log(error);
  }
});

function textAlert(text, classL) {
  tasksAlert.classList.add(classL);
  tasksAlert.textContent = text;
  setTimeout(function () {
    tasksAlert.classList.remove(classL);
  }, 3000);
}

showTasks();

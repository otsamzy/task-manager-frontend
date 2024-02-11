const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const idDisplay = document.querySelector(".id_display"),
  nameDispaly = document.querySelector(".edit_input"),
  checkDom = document.querySelector(".check_input"),
  formDom = document.querySelector(".edit_form"),
  alertMessage = document.querySelector(".alert_message");
const URL_PAGE = "https://task-manager-app-613v.onrender.com";

const loadTask = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get(`${URL_PAGE}/api/v1/tasks/${id}`);
    const { name, completed, _id: taskID } = tasks;
    nameDispaly.value = name;
    idDisplay.textContent = taskID;
    if (completed) {
      checkDom.checked = true;
    }
  } catch (error) {}
};

loadTask();

formDom.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const taskName = nameDispaly.value;
    const taskCompleted = checkDom.checked;
    const {
      data: { tasks },
    } = await axios.patch(`${URL_PAGE}/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });

    const { name, completed, _id: taskId } = tasks;
    nameDispaly.value = name;
    idDisplay.textContent = taskId;

    alertM("success", "edited successfully");
    if (completed) {
      checkDom.checked = true;
    }
  } catch (error) {
    alertM("failed", "error try again");
  }
});

function alertM(classL, action) {
  alertMessage.textContent = action;
  alertMessage.classList.add(classL);
  setTimeout(function () {
    alertMessage.classList.remove(classL);
    alertMessage.textContent = "";
  }, 3000);
}

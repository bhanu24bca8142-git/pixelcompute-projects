
let task = document.querySelector("#task");
let date = document.querySelector("#start-date");
let time = document.querySelector("#time");
let button = document.querySelector(".button");
let search = document.querySelector("#search");
let body = document.querySelector("body");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editTask = null;
let filteredTasks = tasks;

const displayTasks = (taskList) => {
    let old = document.querySelector(".result");

    if (old) {
        old.remove();
    }

    let result = document.createElement("div");
    result.classList.add("result");
    body.appendChild(result);

    let due = document.createElement("div");
    let today = document.createElement("div");
    let upcoming = document.createElement("div");

    let dueHeading = document.createElement("h2");
    dueHeading.textContent = "Due Tasks";
    due.appendChild(dueHeading);

    let todayHeading = document.createElement("h2");
    todayHeading.textContent = "Today's Tasks";
    today.appendChild(todayHeading);

    let upcomingHeading = document.createElement("h2");
    upcomingHeading.textContent = "Upcoming Tasks";
    upcoming.appendChild(upcomingHeading);

    result.appendChild(due);
    result.appendChild(today);
    result.appendChild(upcoming);

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let day = String(currentDate.getDate()).padStart(2, "0");
    let todayDate = year + "-" + month + "-" + day;

    taskList.forEach((taskobj) => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task-item");

        let h = document.createElement("h3");
        h.textContent = taskobj.date;

        let p = document.createElement("p");
        p.textContent = taskobj.task + " - " + taskobj.time;

        let b1 = document.createElement("button");
        b1.textContent = "Edit";

        let b2 = document.createElement("button");
        b2.textContent = "Remove";

        taskDiv.appendChild(h);
        taskDiv.appendChild(p);
        taskDiv.appendChild(b1);
        taskDiv.appendChild(b2);

        if (taskobj.date < todayDate) {
            due.appendChild(taskDiv);
        } else if (taskobj.date === todayDate) {
            today.appendChild(taskDiv);
        } else {
            upcoming.appendChild(taskDiv);
        }

        b1.addEventListener("click", () => {
            task.value = taskobj.task;
            date.value = taskobj.date;
            time.value = taskobj.time;
            editTask = taskobj;
        });

        b2.addEventListener("click", () => {
            tasks = tasks.filter((item) => item !== taskobj);

            localStorage.setItem("tasks", JSON.stringify(tasks));

            filteredTasks = tasks.filter((item) =>
                item.task.toLowerCase().includes(search.value.toLowerCase())
            );

            displayTasks(filteredTasks);
        });
    });
};

button.addEventListener("click", () => {
    let input_task = task.value.trim();
    let input_date = date.value;
    let input_time = time.value;

    if (input_task === "" || input_date === "" || input_time === "") {
        showAlert("Please fill in all fields.");
        return;
    }

    if (editTask !== null) {
        editTask.task = input_task;
        editTask.date = input_date;
        editTask.time = input_time;
        editTask = null;
    } else {
        let taskobj = {
            task: input_task,
            date: input_date,
            time: input_time
        };

        tasks.push(taskobj);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));

    task.value = "";
    date.value = "";
    time.value = "";

    filteredTasks = tasks.filter((item) =>
        item.task.toLowerCase().includes(search.value.toLowerCase())
    );

    displayTasks(filteredTasks);
});

search.addEventListener("input", () => {
    filteredTasks = tasks.filter((item) =>
        item.task.toLowerCase().includes(search.value.toLowerCase())
    );

    displayTasks(filteredTasks);
});

let customAlert = document.querySelector("#custom-alert");
let alertMessage = document.querySelector("#alert-message");

const showAlert = (message) => {
    alertMessage.textContent = message;
    customAlert.style.display = "block";
};

document.querySelector("#ok-alert").addEventListener("click", () => {
    customAlert.style.display = "none";
});

document.querySelector("#close-alert").addEventListener("click", () => {
    customAlert.style.display = "none";
});

displayTasks(tasks);

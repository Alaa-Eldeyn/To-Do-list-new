let taskInput = document.getElementById("task");
let submit = document.getElementById("submit");
let myTasks = document.querySelector(".myTasks");
let mood = "create";
let tmp;

onload = taskInput.focus();
let myData = [];

if (localStorage.getItem("Tasks")) {
    myData = JSON.parse(localStorage.Tasks);
} else {
    myData = []
};

submit.addEventListener("click", () => {
    if (taskInput.value != "") {
        addTask();
    };
});

function addTask() {
    let task = {
        id: Date.now(),
        title: taskInput.value,
        complete: false,
    };
    if (mood == "create") {
        myData.push(task);
    } else {
        myData[tmp] = task;
        mood = "create";
        submit.textContent = "Create";
        taskInput.value = '';
    };
    localStorage.setItem("Tasks", JSON.stringify(myData));
    showTasks();
    taskInput.value = '';
    taskInput.focus();
};

function showTasks() {
    myTasks.innerHTML = '';
    for (let i = 0; i < myData.length; i++){
        let theTask = document.createElement("div");
        theTask.className = "theTask";
        theTask.setAttribute("data-id", myData[i].id);
        theTask.innerHTML = `
        <p><span>${i+1}</span>&nbsp; ${myData[i].title}</p>
        <div>
        <button onclick = "editTask(${i})" id='edit'><i class='fa-solid fa-pen-to-square'></i></button>
        <button onclick = "deleteTask(${i})" id='delete'><i class='fa-solid fa-trash-can'></i></button>
        </div>
        `;
        myTasks.appendChild(theTask);
    };
    let theTask = document.querySelectorAll(".theTask");
    theTask.forEach(e => {
        e.addEventListener("click", (e) => {
            e.currentTarget.classList.toggle("done");
            completedTask(e.target.getAttribute("data-id"))
        });
    });
    let deleteAll = document.getElementById("deleteAll");
    if (myData.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${myData.length})</button>`
    } else {
        deleteAll.innerHTML = "";
    }
};
showTasks();

document.addEventListener("keyup", (key) => {
    if (key.key == "Enter") {
        if (taskInput.value != "") {
            addTask();
        };
    };
});

function deleteTask(i){
    myData.splice(i,1)
    localStorage.setItem("Tasks", JSON.stringify(myData));
    showTasks();
};

function editTask(i) {
    taskInput.focus();
    taskInput.value = myData[i].title;
    tmp = i;
    mood = "edit";
    submit.textContent = "Update";
};

function completedTask(j) {
    for (let i = 0; i < myData.length; i++){
        if (myData[i].id == j) {
            myData[i].complete == false
                ? (myData[i].complete = true) 
                : (myData[i].complete = false);
        };
    };
    localStorage.setItem("Tasks", JSON.stringify(myData));
};

function deleteAll() {
    if (confirm("Are you sure ?") == true) {
        localStorage.clear();
        myData = [];
        showTasks();
    };
};
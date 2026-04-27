function updateTime() {
    const now = new Date();

    // JAM
    const time = now.toLocaleTimeString();
    document.getElementById("time").innerText = time;

    // GREETING
    let hour = now.getHours();
    let greeting = "";

    if (hour < 12) greeting = "🌅 Good Morning";
    else if (hour < 18) greeting = "🌤️ Good Afternoon";
    else greeting = "🌙 Good Evening";

    document.getElementById("greeting").innerText = greeting;

    // 🔥 TANGGAL (PINDAH KE SINI)
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    const dateString = now.toLocaleDateString('id-ID', options);
    document.getElementById("date").innerText = dateString;
}

setInterval(updateTime, 1000);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value;

    if (text === "") return;

    tasks.push({ text: text, done: false });
    input.value = "";

    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    let list = document.getElementById("taskList");

    if (!list) {
        list = document.createElement("ul");
        list.id = "taskList";
        document.body.appendChild(list);
    }

    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = task.text;

        if (task.done) {
            span.style.textDecoration = "line-through";
        }

        span.onclick = () => toggleTask(index);

        let btn = document.createElement("button");
        btn.innerText = "Delete";
        btn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(btn);
        list.appendChild(li);
    });
}

renderTasks();

let timer = 0; // 0 menit
let interval;
  updateTimerDisplay();

function updateTimerDisplay() {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    document.getElementById("timer").innerText =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (interval) return;

    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            updateTimerDisplay();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    timer = 1500;
    updateTimerDisplay();
}

let links = JSON.parse(localStorage.getItem("links")) || [];

function saveLinks() {
    localStorage.setItem("links", JSON.stringify(links));
}

function addLink() {
    let name = document.getElementById("linkName").value;
    let url = document.getElementById("linkURL").value;

    if (name === "" || url === "") return;

    links.push({ name, url });

    saveLinks();
    renderLinks();
}

function renderLinks() {
    let container = document.getElementById("links");
    container.innerHTML = "";

    links.forEach((link, index) => {
        let a = document.createElement("a");
        a.href = link.url;
        a.innerText = "💖 " + link.name;
        a.target = "_blank";
        a.classList.add("link-btn");

        let delBtn = document.createElement("❌");
        delBtn.innerText = "❌";
        delBtn.classList.add("delete-link-btn");
        delBtn.onclick = () => deleteLink(index);

        let wrapper = document.createElement("div");
        wrapper.classList.add("link-item");

        wrapper.appendChild(a);
        wrapper.appendChild(delBtn);

        container.appendChild(wrapper);
    });
}

renderLinks();
function deleteLink(index) {
    links.splice(index, 1);
    saveLinks();
    renderLinks();
}

function saveName() {
    let input = document.getElementById("username");
    let name = input.value;

    if (name === "") return;

    localStorage.setItem("username", name);
    showName();

    input.value = ""; // 🔥 INI KUNCINYA (reset ke kosong)
}

function showName() {
    let name = localStorage.getItem("username");

    if (name) {
        document.getElementById("welcomeUser").innerText =
            "Hello, " + name + " ✨";

        // 🔥 sembunyikan input
        document.getElementById("nameSection").style.display = "none";
    }
}

function editName() {
    document.getElementById("nameSection").style.display = "block";
}

showName();

function setCustomTime() {
    let input = document.getElementById("customTime");
    let minutes = parseInt(input.value);

    if (!minutes || minutes <= 0) return;

    clearInterval(interval);
    interval = null;

    timer = minutes * 60;
    updateTimerDisplay();

    input.value = "";
}

function updateTimerDisplay() {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    document.getElementById("timer").innerText =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}


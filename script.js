// ===== USER NAME =====
function saveName() {
    const input = document.getElementById("nameInput");
    const name = input.value.trim();
    if (!name) return;

    localStorage.setItem("username", name);

    const hello = document.getElementById("helloText");
    if (hello) hello.innerText = `Hello, ${name}!`;

    const sub = document.getElementById("subText");
    if (sub) sub.style.display = "block";

    input.value = "";
}

function loadUserName() {
    const hello = document.getElementById("helloText");
    const sub = document.getElementById("subText");

    if (hello) hello.innerText = "Hello, please input your name!";
    if (sub) sub.style.display = "none";
}

// ===== TIME =====
function updateTime() {
    const now = new Date();

    document.getElementById("time").innerText = now.toLocaleTimeString();

    let hour = now.getHours();
    let greeting = "";

    if (hour < 12) greeting = "🌅 Good Morning";
    else if (hour < 18) greeting = "🌤️ Good Afternoon";
    else greeting = "🌙 Good Evening";

    document.getElementById("greeting").innerText = greeting;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date").innerText =
        now.toLocaleDateString('id-ID', options);
}

setInterval(updateTime, 1000);


// ===== TASK =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (!text) return;

    tasks.push({ text, done: false });
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

// ===== EMOJI =====
function getEmoji(text) {
    text = text.toLowerCase();

    if (text.includes("makan")) return "🍽️";
    if (text.includes("masak")) return "🍳";
    if (text.includes("minum")) return "🍹";
    if (text.includes("tidur")) return "😴";
    if (text.includes("belajar")) return "📚";
    if (text.includes("kerja")) return "💻";
    if (text.includes("olahraga")) return "🏃";
    if (text.includes("ngopi")) return "☕";
    if (text.includes("nonton")) return "🎬";

    return "✨";
}

// ===== RENDER TASK =====
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = `${getEmoji(task.text)} ${task.text}`;

        if (task.done) span.style.textDecoration = "line-through";

        span.onclick = () => toggleTask(index);

        const editBtn = document.createElement("button");
        editBtn.innerText = "✏️";
        editBtn.onclick = () => showEditInput(li, index);

        const delBtn = document.createElement("button");
        delBtn.innerText = "❌";
        delBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}

// ===== EDIT INLINE =====
function showEditInput(li, index) {
    li.innerHTML = "";

    const input = document.createElement("input");
    input.value = tasks[index].text;
    input.className = "edit-input";

    const saveBtn = document.createElement("button");
    saveBtn.innerText = "💾";
    saveBtn.onclick = () => {
        const newText = input.value.trim();
        if (!newText) return;

        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    };

    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "❌";
    cancelBtn.onclick = () => renderTasks();

    li.appendChild(input);
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);
}


// ===== TIMER =====
let timer = 25 * 60;
let interval = null;

function updateTimerDisplay() {
    let m = Math.floor(timer / 60);
    let s = timer % 60;

    document.getElementById("timer").innerText =
        `${m}:${s < 10 ? "0" : ""}${s}`;
}

function startTimer() {
    if (interval || timer <= 0) return;

    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            updateTimerDisplay();
        } else {
            clearInterval(interval);
            interval = null;
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
    timer = 25 * 60;
    updateTimerDisplay();
}

function setCustomTime() {
    const input = document.getElementById("customTime");
    const minutes = parseInt(input.value);

    if (!minutes || minutes <= 0) return;

    timer = minutes * 60;
    updateTimerDisplay();

    input.value = "";
}


// ===== LINKS =====
let links = JSON.parse(localStorage.getItem("links")) || [];

function saveLinks() {
    localStorage.setItem("links", JSON.stringify(links));
}

function addLink() {
    const name = document.getElementById("linkName").value.trim();
    const url = document.getElementById("linkURL").value.trim();

    if (!name || !url) return;

    links.push({ name, url });

    saveLinks();
    renderLinks();

    document.getElementById("linkName").value = "";
    document.getElementById("linkURL").value = "";
}

function deleteLink(index) {
    links.splice(index, 1);
    saveLinks();
    renderLinks();
}

function renderLinks() {
    const container = document.getElementById("linkList");
    container.innerHTML = "";

    links.forEach((link, index) => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = link.url;
        a.innerText = "💖 " + link.name;
        a.target = "_blank";

        const btn = document.createElement("button");
        btn.innerText = "❌";
        btn.onclick = () => deleteLink(index);

        li.appendChild(a);
        li.appendChild(btn);

        container.appendChild(li);
    });
}


// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
    loadUserName();
    updateTime();
    renderTasks();
    renderLinks();
    updateTimerDisplay();
});

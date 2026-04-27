// ===== USER NAME =====
function saveName() {
    const input = document.getElementById("nameInput");
    const name = input.value.trim();
    if (!name) return;
    localStorage.setItem("username", name);
    document.getElementById("helloText").innerText = `Hello, ${name}!`;
    document.getElementById("subText").style.display = "block";
    input.value = "";
}

function loadUserName() {
    const hello = document.getElementById("helloText");
    const sub = document.getElementById("subText");

    // ❗ SELALU reset ke default
    hello.innerText = "Hello, please input your name!";
    sub.style.display = "none";
}

// ===== TIME & GREETING =====
function updateTime() {
    const now = new Date();

    // JAM
    document.getElementById("time").innerText = now.toLocaleTimeString();

    // GREETING + EMOJI
    let hour = now.getHours();
    let greeting = "";

    if (hour < 12) greeting = "🌅 Good Morning";
    else if (hour < 18) greeting = "🌤️ Good Afternoon";
    else greeting = "🌙 Good Evening";

    document.getElementById("greeting").innerText = greeting;

    // TANGGAL
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    const dateString = now.toLocaleDateString('id-ID', options);
    document.getElementById("date").innerText = dateString;
}

// update tiap detik
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

function getEmoji(task) {
    const text = task.toLowerCase();

    if (text.includes("makan")) return "🍽️";
    if (text.includes("masak")) return "🍳";
    if (text.includes("minum")) return "🍹";
    if (text.includes("tidur")) return "😴";
    if (text.includes("belajar")) return "📚";
    if (text.includes("kerja")) return "💻";
    if (text.includes("olahraga")) return "🏃";
    if (text.includes("ngopi")) return "☕";
    if (text.includes("nonton")) return "🎬";

    return "✨"; // default
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const emoji = getEmoji(task.text);

        // TEXT
        const span = document.createElement("span");
        span.innerText = `${emoji} ${task.text}`;

        if (task.done) {
            span.style.textDecoration = "line-through";
        }

        span.onclick = () => toggleTask(index);

        // EDIT BUTTON
const editBtn = document.createElement("button");
editBtn.innerText = "✏️";
editBtn.onclick = () => showEditInput(li, index);

const deleteBtn = document.createElement("button");
deleteBtn.innerText = "❌";
deleteBtn.onclick = () => deleteTask(index);

// append
li.appendChild(span);
li.appendChild(editBtn);
li.appendChild(deleteBtn);

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);

    if (!newText) return;

    tasks[index].text = newText;

    saveTasks();
    renderTasks();
}

// ===== TIMER (COUNTDOWN) =====
let timer = 0;
let interval = null;

function updateTimerDisplay() {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    document.getElementById("timer").innerText =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
    timer = 0;
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
    loadUserName(); // sekarang cuma reset, bukan load nama
    updateTime();
    renderTasks();
    renderLinks();
    updateTimerDisplay();
});

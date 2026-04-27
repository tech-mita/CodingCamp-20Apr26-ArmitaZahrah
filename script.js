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
    document.getElementById("helloText").innerText =
        "Hello, please input your name!";
    document.getElementById("subText").style.display = "none";
}

// ===== TIME =====
function updateTime() {
    const now = new Date();

    document.getElementById("time").innerText =
        now.toLocaleTimeString();

    const hour = now.getHours();
    let greeting = "";

    if (hour < 12) greeting = "🌅 Good Morning";
    else if (hour < 18) greeting = "🌤️ Good Afternoon";
    else greeting = "🌙 Good Evening";

    document.getElementById("greeting").innerText = greeting;

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    document.getElementById("date").innerText =
        now.toLocaleDateString("id-ID", options);
}

setInterval(updateTime, 1000);

// ===== TASK =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function normalize(text) {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== ADD TASK =====
function addTask() {
    const input = document.getElementById("taskInput");
    const raw = input.value;

    const text = normalize(raw);
    if (!text) return;

    const isDuplicate = tasks.some(t => normalize(t.text) === text);

    if (isDuplicate) {
        alert("Task sudah ada!");
        return;
    }

    tasks.push({ text: raw.trim(), done: false });
    input.value = "";

    saveTasks();
    renderTasks();
}

// ===== TOGGLE DONE =====
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

// ===== DELETE =====
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// ===== MOVE =====
function moveTaskUp(index) {
    if (index === 0) return;

    [tasks[index - 1], tasks[index]] =
        [tasks[index], tasks[index - 1]];

    saveTasks();
    renderTasks();
}

function moveTaskDown(index) {
    if (index === tasks.length - 1) return;

    [tasks[index + 1], tasks[index]] =
        [tasks[index], tasks[index + 1]];

    saveTasks();
    renderTasks();
}

// ===== EMOJI =====
function getEmoji(text) {
    const t = text.toLowerCase();

    if (t.includes("makan")) return "🍽️";
    if (t.includes("minum")) return "🍹";
    if (t.includes("tidur")) return "😴";
    if (t.includes("belajar")) return "📚";
    if (t.includes("kerja")) return "💻";
    if (t.includes("olahraga")) return "🏃";

    return "✨";
}

// ===== RENDER =====
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // TEXT
        const span = document.createElement("span");
        span.innerText = `${getEmoji(task.text)} ${task.text}`;

        if (task.done)
            span.style.textDecoration = "line-through";

        span.onclick = () => toggleTask(index);

        // BUTTON WRAPPER
        const actions = document.createElement("div");
        actions.className = "task-actions";

        // BUTTONS
        const up = document.createElement("button");
        up.innerText = "⬆️";
        up.onclick = () => moveTaskUp(index);

        const down = document.createElement("button");
        down.innerText = "⬇️";
        down.onclick = () => moveTaskDown(index);

        const edit = document.createElement("button");
        edit.innerText = "✏️";
        edit.onclick = () => showEditInput(li, index);

        const del = document.createElement("button");
        del.innerText = "❌";
        del.onclick = () => deleteTask(index);

        actions.append(up, down, edit, del);

        li.append(span, actions);
        list.appendChild(li);
    });
}

// ===== EDIT =====
function showEditInput(li, index) {
    li.innerHTML = "";

    const input = document.createElement("input");
    input.value = tasks[index].text;

    const save = document.createElement("button");
    save.innerText = "💾";

    save.onclick = () => {
        const raw = input.value;
        const newText = normalize(raw);

        if (!newText) return;

        const isDuplicate = tasks.some((t, i) =>
            i !== index && normalize(t.text) === newText
        );

        if (isDuplicate) {
            alert("Task sudah ada!");
            return;
        }

        tasks[index].text = raw.trim();
        saveTasks();
        renderTasks();
    };

    const cancel = document.createElement("button");
    cancel.innerText = "❌";
    cancel.onclick = () => renderTasks();

    li.append(input, save, cancel);
}

// ===== TIMER =====
let DEFAULT_TIME = 25 * 60;
let timer = DEFAULT_TIME;
let interval = null;

function updateTimerDisplay() {
    let m = Math.floor(timer / 60);
    let s = timer % 60;

    document.getElementById("timer").innerText =
        `${m}:${s < 10 ? "0" : ""}${s}`;
}

function startTimer() {
    if (interval) return;

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

    timer = DEFAULT_TIME;
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

        li.append(a, btn);
        container.appendChild(li);
    });
}

// ===== DARK MODE =====
function loadTheme() {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";

    document.body.classList.toggle("dark", isDark);

    const btn = document.getElementById("themeToggle");
    if (btn) btn.innerText = isDark ? "☀️" : "🌙";
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    const btn = document.getElementById("themeToggle");
    if (btn) btn.innerText = isDark ? "☀️" : "🌙";
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
    loadUserName();
    updateTime();
    renderTasks();
    renderLinks();
    updateTimerDisplay();
    loadTheme();

    const btn = document.getElementById("themeToggle");
    if (btn) btn.addEventListener("click", toggleTheme);
});

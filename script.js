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

// ===== HELPERS =====
function normalize(text) {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== ADD =====
function addTask() {
    const input = document.getElementById("taskInput");
    const raw = input.value;

    const text = normalize(raw);
    if (!text) return;

    // CEK DUPLIKAT
    const isDuplicate = tasks.some(t => normalize(t.text) === text);

    if (isDuplicate) {
        input.style.border = "2px solid red";
        setTimeout(() => input.style.border = "", 1000);
        input.value = "";
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

// ===== MOVE ORDER =====
function moveTaskUp(index) {
    if (index === 0) return;

    [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
    saveTasks();
    renderTasks();
}

function moveTaskDown(index) {
    if (index === tasks.length - 1) return;

    [tasks[index + 1], tasks[index]] = [tasks[index], tasks[index + 1]];
    saveTasks();
    renderTasks();
}

// ===== EMOJI =====
function getEmoji(text) {
    const t = text.toLowerCase();

    if (t.includes("makan")) return "🍽️";
    if (t.includes("masak")) return "🍳";
    if (t.includes("minum")) return "🍹";
    if (t.includes("tidur")) return "😴";
    if (t.includes("belajar")) return "📚";
    if (t.includes("kerja")) return "💻";
    if (t.includes("olahraga")) return "🏃";
    if (t.includes("ngopi")) return "☕";
    if (t.includes("nonton")) return "🎬";

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

        if (task.done) span.style.textDecoration = "line-through";

        span.onclick = () => toggleTask(index);

        // MOVE
        const upBtn = document.createElement("button");
        upBtn.innerText = "⬆️";
        upBtn.onclick = () => moveTaskUp(index);

        const downBtn = document.createElement("button");
        downBtn.innerText = "⬇️";
        downBtn.onclick = () => moveTaskDown(index);

        // EDIT
        const editBtn = document.createElement("button");
        editBtn.innerText = "✏️";
        editBtn.onclick = () => showEditInput(li, index);

        // DELETE
        const delBtn = document.createElement("button");
        delBtn.innerText = "❌";
        delBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(upBtn);
        li.appendChild(downBtn);
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
        const raw = input.value;
        const newText = normalize(raw);

        if (!newText) return;

        // ❗ CEK DUPLIKAT SAAT EDIT
        const isDuplicate = tasks.some((t, i) =>
            i !== index && normalize(t.text) === newText
        );

        if (isDuplicate) {
            input.style.border = "2px solid red";
            return;
        }

        tasks[index].text = raw.trim();
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
renderTasks();
// ===== TIMER =====
let DEFAULT_TIME = 25 * 60; 
let timer = DEFAULT_TIME;
let interval = null;

// ===== DISPLAY =====
function updateTimerDisplay() {
    let m = Math.floor(timer / 60);
    let s = timer % 60;

    document.getElementById("timer").innerText =
        `${m}:${s < 10 ? "0" : ""}${s}`;
}

// ===== START =====
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

// ===== STOP =====
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

// ===== SET CUSTOM =====
function setCustomTime() {
    const input = document.getElementById("customTime");
    const minutes = parseInt(input.value);
    if (!minutes || minutes <= 0) return;
    timer = minutes * 60;
    updateTimerDisplay();
    input.value = "";
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
    updateTimerDisplay();
});

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

// ===== DARK MODE =====
function loadTheme() {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
        document.body.classList.add("dark");
        const btn = document.getElementById("themeToggle");
        if (btn) btn.innerText = "☀️";
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const btn = document.getElementById("themeToggle");
    if (btn) btn.innerText = isDark ? "☀️" : "🌙";
}
}
// event
toggleBtn.addEventListener("click", toggleTheme);

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
    loadUserName();
    updateTime();
    renderTasks();
    renderLinks();
    updateTimerDisplay();
    loadTheme();

    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", toggleTheme);
    }
});

// ===== USER NAME =====
function saveName() {
    const name = document.getElementById("nameInput").value;
    localStorage.setItem("username", name);
    loadUserName();
}

function loadUserName() {
    const name = localStorage.getItem("username") || "User";
    document.getElementById("helloText").innerText = `Hello, ${name}`;
}

// ===== TIME =====
function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString();
    const date = now.toDateString();

    document.getElementById("time").innerText = time;
    document.getElementById("date").innerText = date;

    const hour = now.getHours();
    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    document.getElementById("greeting").innerText = greeting;
}

setInterval(updateTime, 1000);

// ===== TIMER =====
let timer;
let seconds = 0;

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        document.getElementById("timer").innerText = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    document.getElementById("timer").innerText = "0:00";
}

function setCustomTime() {
    const mins = document.getElementById("customTime").value;
    seconds = mins * 60;
    document.getElementById("timer").innerText = formatTime(seconds);
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}

// ===== TASK =====
function addTask() {
    const input = document.getElementById("taskInput");
    const li = document.createElement("li");
    li.innerText = input.value;
    document.getElementById("taskList").appendChild(li);
    input.value = "";
}

// ===== LINKS =====
function addLink() {
    const name = document.getElementById("linkName").value;
    const url = document.getElementById("linkURL").value;

    const li = document.createElement("li");
    li.innerHTML = `<a href="${url}" target="_blank">${name}</a>`;

    document.getElementById("linkList").appendChild(li);
}

// ===== INIT =====
window.onload = function() {
    loadUserName();
    updateTime();
};

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

// DELETE
function deleteLink(index) {
    links.splice(index, 1);
    saveLinks();
    renderLinks();
}

// RENDER
function renderLinks() {
    const container = document.getElementById("linkList");
    container.innerHTML = "";

    links.forEach((link, index) => {
        const li = document.createElement("li");

        // TEXT LINK
        const span = document.createElement("span");

        const a = document.createElement("a");
        a.href = link.url;
        a.innerText = "🔗 " + link.name;
        a.target = "_blank";

        span.appendChild(a);

        // ACTION BUTTON
        const actions = document.createElement("div");
        actions.className = "link-actions";

        // EDIT
        const edit = document.createElement("button");
        edit.innerText = "✏️";
        edit.onclick = () => showEditLink(li, index);

        // DELETE
        const del = document.createElement("button");
        del.innerText = "❌";
        del.onclick = () => deleteLink(index);

        actions.append(edit, del);

        li.append(span, actions);
        container.appendChild(li);
    });
}

// EDIT
function showEditLink(li, index) {
    li.innerHTML = "";

    const nameInput = document.createElement("input");
    nameInput.value = links[index].name;

    const urlInput = document.createElement("input");
    urlInput.value = links[index].url;

    const save = document.createElement("button");
    save.innerText = "💾";

    save.onclick = () => {
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();

        if (!name || !url) return;

        links[index] = { name, url };
        saveLinks();
        renderLinks();
    };

    const cancel = document.createElement("button");
    cancel.innerText = "❌";
    cancel.onclick = () => renderLinks();

    li.append(nameInput, urlInput, save, cancel);
}

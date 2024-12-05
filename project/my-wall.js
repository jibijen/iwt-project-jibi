function openEditModal() {
    document.getElementById("edit-modal").classList.remove("hidden");
}

function closeEditModal() {
    document.getElementById("edit-modal").classList.add("hidden");
}

function saveChanges() {
    document.getElementById("profile-photo").src = document.getElementById("edit-photo").value;
    document.getElementById("age").innerText = document.getElementById("edit-age").value;
    document.getElementById("location").innerText = document.getElementById("edit-location").value;
    document.getElementById("cgpa").innerText = document.getElementById("edit-cgpa").value;

    document.getElementById("skills-text").innerText = document.getElementById("edit-skills").value;
    updateList("achievements-list", document.getElementById("edit-achievements").value);
    updateList("courses-list", document.getElementById("edit-courses").value);
    updateList("activities-list", document.getElementById("edit-activities").value);

    closeEditModal();
}

function updateList(elementId, value) {
    const list = value.split(";").map(item => `<li>${item.trim()}</li>`).join("");
    document.getElementById(elementId).innerHTML = list;
}

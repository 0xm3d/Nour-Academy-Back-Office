import { courses } from "./data/courses.js";
import { loadInscriptions, resetDemoData, saveInscriptions } from "./storage.js";
import { renderTable } from "./ui/table.js";

const body = document.getElementById("registrations-body");
const count = document.getElementById("registrations-count");
const summary = document.getElementById("registrations-summary");
const resetButton = document.getElementById("reset-demo");
const editDialog = document.getElementById("edit-registration-dialog");
const editForm = document.getElementById("edit-registration-form");
const cancelEditButton = document.getElementById("cancel-registration-edit");
const dossierInput = document.getElementById("edit-dossier");
const studentInput = document.getElementById("edit-student");
const phoneInput = document.getElementById("edit-phone");
const levelInput = document.getElementById("edit-level");
const courseInput = document.getElementById("edit-course");
const statusInput = document.getElementById("edit-status");
const dateInput = document.getElementById("edit-date");

let registrations = loadInscriptions();
let editingRegistrationId = null;

// Add available courses to the edit form.
courseInput.innerHTML = courses.map((course) =>
    `<option value="${course.id}">${course.title}</option>`
).join("");

// Refresh the table and registration counts.
function renderDashboard() {
    count.textContent = `${registrations.length} registrations`;
    summary.textContent = `${registrations.length} registrations across the 3 centers`;
    renderTable(registrations);
}

// Open the form with the selected student's current registration data.
body.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-action='edit']");
    if (!editButton) return;

    editingRegistrationId = Number(editButton.dataset.id);
    const registration = registrations.find(({ id }) => id === editingRegistrationId);
    if (!registration) return;

    dossierInput.value = registration.dossier;
    studentInput.value = registration.student;
    phoneInput.value = registration.phone;
    levelInput.value = registration.level;
    courseInput.value = String(registration.courseId);
    statusInput.value = registration.status;
    dateInput.value = registration.date;
    editDialog.showModal();
});

// Save the edited registration and show the updated table.
editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (editingRegistrationId === null || !editForm.reportValidity()) return;

    const selectedCourse = courses.find(({ id }) => id === Number(courseInput.value));
    if (!selectedCourse) return;

    registrations = registrations.map((registration) =>
        registration.id === editingRegistrationId
            ? {
                ...registration,
                student: studentInput.value.trim(),
                phone: phoneInput.value.trim(),
                level: levelInput.value,
                courseId: selectedCourse.id,
                course: selectedCourse.title,
                status: statusInput.value,
                date: dateInput.value
            }
            : registration
    );

    saveInscriptions(registrations);
    renderDashboard();
    editDialog.close();
    editingRegistrationId = null;
});

// Close the form without saving.
cancelEditButton.addEventListener("click", () => {
    editDialog.close();
    editingRegistrationId = null;
});

// Restore the demo registrations.
resetButton.addEventListener("click", () => {
    registrations = resetDemoData();
    renderDashboard();
});

renderDashboard();
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
const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("status-filter");
const sortBy = document.getElementById("sort-by");
const prevButton=document.getElementById("prev-page");
const nextButton=document.getElementById("next-page")
const pageInfo=document.getElementById("page-info")
const newRegistrationButton = document.getElementById("new-registration");
const newRegistrationDialog = document.getElementById("new-registration-dialog");
const cancelNewRegistrationButton = document.getElementById("cancel-new-registration");
const newCourseInput = document.getElementById("new-course");
const newRegistrationForm = document.getElementById("new-registration-form");
const newStudentInput = document.getElementById("new-student");
const newPhoneInput = document.getElementById("new-phone");
const newStatusInput = document.getElementById("new-status");
const newLevelInput = document.getElementById("new-level");
const newDateInput = document.getElementById("new-date");

// Open the form
newRegistrationButton.addEventListener("click", () => {
    newRegistrationDialog.showModal();
});

// Close the form
cancelNewRegistrationButton.addEventListener("click", () => {
    newRegistrationDialog.close();
});

// Add courses to the select
newCourseInput.innerHTML = courses.map((course) =>
    `<option value="${course.id}">${course.title}</option>`
).join("");

// Save registration
newRegistrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedCourse = courses.find(
        (course) => course.id === Number(newCourseInput.value)
    );

    if (!selectedCourse) return;

    const newRegistration = {
        id: Date.now(),
        dossier: `NA-${new Date().getFullYear()}-${Date.now()}`,
        student: newStudentInput.value.trim(),
        phone: newPhoneInput.value.trim(),
        level: newLevelInput.value,
        courseId: selectedCourse.id,
        course: selectedCourse.title,
        status: newStatusInput.value,
        date: newDateInput.value
    };

    registrations.push(newRegistration);

    saveInscriptions(registrations);
    renderDashboard();

    newRegistrationForm.reset();
    newRegistrationDialog.close();
});
//pagination- 10 page pour tout page
let currentPage=1
const itemsPerPage=10

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
    filterRegistrations();
    
}


// Open the form with the selected student's current registration data.
body.addEventListener("click", (event) => {
    //delete registration
    const deleteButton=event.target.closest("[data-action='delete']")
    if(deleteButton){
        const registrationId=Number(deleteButton.dataset.id)
        const confirmed=confirm("Are you want to delete this registration?")
        if(!confirmed) return
        registrations=registrations.filter(
            (registration)=>registration.id !=registrationId

        )
        saveInscriptions(registrations)
        renderDashboard()
        return



    }


    //edit registration
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

// Afficher les inscriptions dans le tableau
function renderRegistration(liste) {
    renderTable(liste);
    count.textContent = `${liste.length} registrations`;
}

// Recherche + filtre Status + tri
function filterRegistrations() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;
    const selectedSort = sortBy.value;

    // Recherche par nom ou téléphone
    let results = registrations.filter((inscription) => {
        const matchesSearch =
            (inscription.student || "").toLowerCase().includes(searchValue) ||
            String(inscription.phone || "").includes(searchValue);

        const matchesStatus =
            selectedStatus === "all" ||
            inscription.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Tri selon le choix de l'utilisateur
    if (selectedSort === "name-asc") {
        results.sort((a, b) =>
            a.student.localeCompare(b.student)
        );

    } else if (selectedSort === "name-desc") {
        results.sort((a, b) =>
            b.student.localeCompare(a.student)
        );

    } else if (selectedSort === "date-desc") {
        results.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

    } else if (selectedSort === "date-asc") {
        results.sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );
    }
    // Calculate pagination
const totalPages = Math.max(1, Math.ceil(results.length / itemsPerPage));

if (currentPage > totalPages) {
    currentPage = totalPages;
}

const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedResults = results.slice(
    startIndex,
    startIndex + itemsPerPage
);

// Display current page
renderRegistration(paginatedResults);

// Update pagination controls
pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
prevButton.disabled = currentPage === 1;
nextButton.disabled = currentPage === totalPages;

}
// Pagination buttons
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        filterRegistrations();
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    filterRegistrations();
});

// Reset to page 1 when searching or filtering
searchInput.addEventListener("input", () => {
    currentPage = 1;
    filterRegistrations();
});

statusFilter.addEventListener("change", () => {
    currentPage = 1;
    filterRegistrations();
});

sortBy.addEventListener("change", () => {
    currentPage = 1;
    filterRegistrations();
});


renderDashboard();

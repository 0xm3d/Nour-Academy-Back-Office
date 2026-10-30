import "../styles/styles.css";
import { courses } from "./data/courses.js";
import { loadInscriptions } from "./storage.js";
import { calculateStatistics } from "./utils.js";
import { renderTable } from "./ui/table.js";

const registrations = loadInscriptions();
const statistics = calculateStatistics(registrations, courses);

document.getElementById("stat-total").textContent = statistics.total;
document.getElementById("stat-pending").textContent = statistics.statusCounts.Pending;
document.getElementById("stat-validated").textContent = statistics.statusCounts.Validated;
document.getElementById("stat-paid").textContent = statistics.statusCounts.Paid;
document.getElementById("stat-revenue").textContent =
    `${new Intl.NumberFormat("en-US").format(statistics.revenue)} MAD`;
document.getElementById("occupancy-list").innerHTML = statistics.occupancy.map((course) => `
    <li class="flex justify-between gap-4 border-b border-[var(--color-soft)] py-2">
        <span>${course.title}</span>
        <span class="shrink-0">${course.students} / 15 (${course.percentage}%)</span>
    </li>
`).join("");
document.getElementById("registrations-count").textContent =
    `${registrations.length} registrations`;

renderTable(registrations, false);

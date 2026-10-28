
import { inscriptions } from "../data/data.js";

const body = document.getElementById("registrations-body");
const count = document.getElementById("registrations-count");

const statusClasses = {
    Paid: "bg-green-100 text-green-700",
    Validated: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700"
};

export function renderTable() {
    if (!body || !count) {
        console.error("Table elements not found in HTML");
        return;
    }

    count.textContent = `${inscriptions.length} registrations`;

    body.innerHTML = inscriptions.map((r) => `
        <tr class="border-b border-[var(--color-soft)]">
            <td class="px-4 py-3 text-sm font-semibold">${r.dossier}</td>
            <td class="px-4 py-3 text-sm">${r.student}</td>
            <td class="px-4 py-3 text-sm">${r.level}</td>
            <td class="px-4 py-3 text-sm">${r.course}</td>
            <td class="px-4 py-3 text-sm">${r.phone}</td>
            <td class="px-4 py-3 text-sm">
                <span class="rounded-full px-3 py-1 text-xs ${statusClasses[r.status] || ""}">
                    ${r.status}
                </span>
            </td>
            <td class="px-4 py-3 text-sm">${r.date}</td>
        </tr>
    `).join("");
}

renderTable();

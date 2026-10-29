const body = document.getElementById("registrations-body");

const statusClasses = {
    Paid: "bg-green-100 text-green-700",
    Validated: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700"
};

// Draw registration rows in the dashboard table.
export function renderTable(registrations) {
    if (!body) {
        console.error("Table body not found in HTML");
        return;
    }

    body.innerHTML = registrations.map((registration) => `
        <tr class="border-b border-[var(--color-soft)]">
            <td class="px-4 py-3 text-sm font-semibold">${registration.dossier}</td>
            <td class="px-4 py-3 text-sm">${registration.student}</td>
            <td class="px-4 py-3 text-sm">${registration.level}</td>
            <td class="px-4 py-3 text-sm">${registration.course}</td>
            <td class="px-4 py-3 text-sm">${registration.phone}</td>
            <td class="px-4 py-3 text-sm">
                <span class="rounded-full px-3 py-1 text-xs ${statusClasses[registration.status] || ""}">
                    ${registration.status}
                </span>
            </td>
            <td class="px-4 py-3 text-sm">${registration.date}</td>
            <td class="px-4 py-3 text-center align-middle">
                <div class="flex items-center justify-center gap-[10px]">
                    <button type="button" data-action="edit" data-id="${registration.id}"
                        aria-label="Edit ${registration.student}">
                        <i class="fa-solid fa-pen-to-square text-blue-600 cursor-pointer" aria-hidden="true"></i>
                    </button>
                    <button type="button" data-action="delete" data-id="${registration.id}"
                        aria-label="Delete ${registration.student}">
                        <i class="fa-solid fa-trash-can text-red-600 cursor-pointer" aria-hidden="true"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join("");
}

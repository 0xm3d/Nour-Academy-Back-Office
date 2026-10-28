import "../styles/styles.css";
import { courses } from "./courses.js";
import "./form.js";

let catalog = document.getElementById("catalog");
let counter = document.getElementById("counter");
let noResult = document.getElementById("no-results");
let levelSelect = document.getElementById("level");
let subjectSelect = document.getElementById("subject");
let searchInput = document.getElementById("search");

let cartList = document.getElementById("cart-list");
let cartEmpty = document.getElementById("cart-empty");
let cartCount = document.getElementById("cart-count");
let cartTotal = document.getElementById("cart-total");
let cartSubmit = document.getElementById("cart-submit");

// courses the parent picked
let selected = [];

function showCourses() {
  let chosenLevel = levelSelect.value;
  let chosenSubject = subjectSelect.value;
  let search = searchInput.value.toLowerCase().trim();
  let count = 0;

  catalog.innerHTML = "";

  for (let i = 0; i < courses.length; i++) {
    let c = courses[i];

    if (chosenLevel != "" && c.level != chosenLevel) continue;

    if (chosenSubject != "" && c.subject != chosenSubject) continue;

    let text = (c.title + " " + c.subject).toLowerCase();
    if (!text.includes(search)) continue;

    count++;

    let seats = c.seatsRemaining + " seats left";
    let buttonText = "Select this course";
    let disabled = "";

    if (c.seatsRemaining === 0) {
      seats = "Full";
      buttonText = "Selection unavailable";
      disabled = "disabled";
    }

    catalog.innerHTML += `
      <article class="flex flex-col gap-2 rounded-xl border border-[var(--color-soft)] bg-white p-5">
        <span class="self-end rounded-full bg-[var(--color-soft)] px-3 py-1 text-xs">${seats}</span>
        <p class="text-xs font-semibold text-[var(--color-muted)]">${c.subject}</p>
        <h3 class="text-xl font-semibold text-[var(--color-primary)]">${c.title}</h3>
        <p class="text-sm">${c.level}</p>
        <p class="text-sm">${c.schedule}</p>
        <p class="text-sm">${c.center}</p>
        <p class="mt-2 text-2xl font-semibold text-[var(--color-primary)]">${c.price} MAD / month</p>
        <button type="button" data-action="add" data-id="${c.id}" ${disabled}
          class="mt-2 min-h-11 rounded-md bg-[var(--color-primary)] px-4 text-sm text-white disabled:opacity-50">
          ${buttonText}
        </button>
      </article>`;
  }

  counter.textContent = count + " courses found";

  if (count === 0) {
    noResult.classList.remove("hidden");
  } else {
    noResult.classList.add("hidden");
  }
}

function addCourse(id) {
  // already in the cart, do nothing
  for (let i = 0; i < selected.length; i++) {
    if (selected[i].id === id) return;
  }

  for (let i = 0; i < courses.length; i++) {
    // a full course can't be added
    if (courses[i].id === id && courses[i].seatsRemaining > 0) {
      selected.push(courses[i]);
    }
  }

  showCart();
}

function removeCourse(id) {
  // keep everything except the course we remove
  let newList = [];

  for (let i = 0; i < selected.length; i++) {
    if (selected[i].id !== id) newList.push(selected[i]);
  }

  selected = newList;
  showCart();
}

function showCart() {
  let total = 0;
  cartList.innerHTML = "";

  for (let i = 0; i < selected.length; i++) {
    let c = selected[i];
    total += c.price;

    cartList.innerHTML += `
      <div class="mb-3 flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-semibold text-[var(--color-primary)]">${c.title}</p>
          <p class="text-xs text-[var(--color-muted)]">${c.price} MAD / month</p>
        </div>
        <button type="button" data-action="remove" data-id="${c.id}"
          class="min-h-11 px-2 text-xs text-[var(--color-primary)] underline">
          Remove
        </button>
      </div>`;
  }

  cartCount.textContent = selected.length;
  cartTotal.textContent = total;

  if (selected.length === 0) {
    cartEmpty.classList.remove("hidden");
    cartSubmit.disabled = true;
  } else {
    cartEmpty.classList.add("hidden");
    cartSubmit.disabled = false;
  }
}

levelSelect.addEventListener("change", showCourses);
subjectSelect.addEventListener("change", showCourses);
searchInput.addEventListener("input", showCourses);

// one listener on the container, so it still works after a filter
catalog.addEventListener("click", function (event) {
  let button = event.target.closest("[data-action='add']");
  if (button) addCourse(Number(button.dataset.id));
});

cartList.addEventListener("click", function (event) {
  let button = event.target.closest("[data-action='remove']");
  if (button) removeCourse(Number(button.dataset.id));
});

showCourses();
showCart();
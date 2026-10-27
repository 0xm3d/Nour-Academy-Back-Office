let form = document.getElementById("enroll-form");
let parentName = document.getElementById("parent-name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let studentName = document.getElementById("student-name");
let studentLevel = document.getElementById("student-level");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let consent = document.getElementById("consent");
let selectionError = document.getElementById("selection-error");
let summary = document.getElementById("registration-summary");
let summaryText = document.getElementById("registration-summary-text");

function show(input, ok, text) {
  let msg = document.getElementById(input.id + "-msg");
  msg.textContent = text;
  input.classList.remove("border-gray-300", "border-green-600", "border-red-600");
  input.classList.add(ok ? "border-green-600" : "border-red-600");
  msg.className = ok ? "text-[14px] text-green-600" : "text-[14px] text-red-600";
  return ok;
}

function checkParentName() {
  if (parentName.value.trim().length < 2) return show(parentName, false, "Enter the parent's name.");
  return show(parentName, true, "Valid name.");
}

function checkEmail() {
  let ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  if (!ok) return show(email, false, "Invalid email address. Example: name@example.com");
  return show(email, true, "Valid email address.");
}

function checkPhone() {
  let number = phone.value.replace(/\s/g, "");
  let ok = /^(0[67][0-9]{8}|\+212[67][0-9]{8})$/.test(number);
  if (!ok) return show(phone, false, "Invalid number. Example: 0612345678 or +212612345678.");
  return show(phone, true, "Valid phone number.");
}

function checkStudentName() {
  if (studentName.value.trim().length < 2) return show(studentName, false, "Enter the student's first name.");
  return show(studentName, true, "Valid first name.");
}

function checkStudentLevel() {
  if (studentLevel.value === "") return show(studentLevel, false, "Choose the student's level.");
  return show(studentLevel, true, "Level selected.");
}

function checkConfirmPassword() {
  if (confirmPassword.value === "" || confirmPassword.value !== password.value) {
    return show(confirmPassword, false, "The two passwords must match.");
  }
  return show(confirmPassword, true, "Passwords match.");
}

function checkConsent() {
  if (!consent.checked) return show(consent, false, "You must accept this statement to continue.");
  return show(consent, true, "Thank you for your consent.");
}

parentName.addEventListener("input", checkParentName);
email.addEventListener("input", checkEmail);
phone.addEventListener("input", checkPhone);
studentName.addEventListener("input", checkStudentName);
studentLevel.addEventListener("change", checkStudentLevel);
password.addEventListener("input", function () {
  if (confirmPassword.value !== "") checkConfirmPassword();
});
confirmPassword.addEventListener("input", checkConfirmPassword);
consent.addEventListener("change", checkConsent);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  summary.classList.add("hidden");
  selectionError.textContent = "";

  // Check each field in order and focus the first one that is invalid.
  if (!checkParentName()) return parentName.focus();
  if (!checkEmail()) return email.focus();
  if (!checkPhone()) return phone.focus();
  if (!checkStudentName()) return studentName.focus();
  if (!checkStudentLevel()) return studentLevel.focus();
  if (!checkConfirmPassword()) return confirmPassword.focus();
  if (!checkConsent()) return consent.focus();

  let count = Number(document.getElementById("cart-count").textContent);
  if (count === 0) {
    selectionError.textContent = "Add at least one course to your selection before submitting the enrollment.";
    document.getElementById("courses").scrollIntoView({ behavior: "smooth" });
    return;
  }

  let student = studentName.value.trim();
  let level = studentLevel.options[studentLevel.selectedIndex].text;
  let selectedCourses = [];
  let courseNames = document.querySelectorAll("#cart-list p.text-sm.font-semibold");
  for (let i = 0; i < courseNames.length; i++) {
    selectedCourses.push(courseNames[i].textContent);
  }
  let total = document.getElementById("cart-total").textContent;
  let registrationNumber = "NA-" + Date.now();

  summaryText.textContent = "Enrollment " + registrationNumber + " confirmed. Student: " + student + " (" + level + "). Courses: " + selectedCourses.join(", ") + ". Total: " + total + " MAD / month.";
  summary.classList.remove("hidden");

  form.reset();
  let inputs = [parentName, email, phone, studentName, studentLevel, password, confirmPassword, consent];
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("border-green-600", "border-red-600");
    inputs[i].classList.add("border-gray-300");
    let msg = document.getElementById(inputs[i].id + "-msg");
    msg.textContent = "";
    msg.className = "text-[14px]";
  }

  document.dispatchEvent(new Event("registration-success"));
});
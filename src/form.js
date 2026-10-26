let form = document.getElementById("enroll-form");
let parentName = document.getElementById("parent-name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let studentName = document.getElementById("student-name");
let studentLevel = document.getElementById("student-level");
let consent = document.getElementById("consent");

// shows the message under the field and changes the border color
function show(input, ok, text) {
  let msg = document.getElementById(input.id + "-msg");
  msg.textContent = text;

  if (ok) {
    input.className = input.className.replace("border-gray-300", "border-green-600").replace("border-red-600", "border-green-600");
    msg.className = "text-[14px] text-green-600";
  } else {
    input.className = input.className.replace("border-gray-300", "border-red-600").replace("border-green-600", "border-red-600");
    msg.className = "text-[14px] text-red-600";
  }

  return ok;
}

function checkParentName() {
  if (parentName.value.trim().length < 2) return show(parentName, false, "Enter the parent's name.");
  return show(parentName, true, "Looks good.");
}

function checkEmail() {
  let ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!ok) return show(email, false, "Invalid email. Example: name@example.com");
  return show(email, true, "Email is valid.");
}

function checkPhone() {
  // spaces removed first so "06 12 34 56 78" works
  let number = phone.value.replace(/ /g, "");
  let ok = /^(0|\+212)[67][0-9]{8}$/.test(number);
  if (!ok) return show(phone, false, "Invalid number. Example: 0612345678 or +212612345678");
  return show(phone, true, "Phone number is valid.");
}

function checkStudentName() {
  if (studentName.value.trim().length < 2) return show(studentName, false, "Enter the student's first name.");
  return show(studentName, true, "Looks good.");
}

function checkStudentLevel() {
  if (studentLevel.value === "") return show(studentLevel, false, "Choose a level.");
  return show(studentLevel, true, "Level chosen.");
}

function checkConsent() {
  if (!consent.checked) return show(consent, false, "You must accept to continue.");
  return show(consent, true, "Thank you.");
}

if (form) {
  parentName.addEventListener("input", checkParentName);
  email.addEventListener("input", checkEmail);
  phone.addEventListener("input", checkPhone);
  studentName.addEventListener("input", checkStudentName);
  studentLevel.addEventListener("change", checkStudentLevel);
  consent.addEventListener("change", checkConsent);
}

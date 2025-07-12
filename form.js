// static/js/form.js

const urlParams = new URLSearchParams(window.location.search);
const editingId = parseInt(urlParams.get("id"));
const employeeForm = document.getElementById("employeeForm");
const formTitle = document.getElementById("formTitle");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

if (editingId) {
  const emp = employees.find((e) => e.id === editingId);
  if (emp) {
    document.getElementById("employeeId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
    formTitle.textContent = "Edit Employee";
  }
}

employeeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("employeeId").value;
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value;
  const role = document.getElementById("role").value;

  if (!firstName || !lastName || !email || !department || !role) {
    alert("Please fill out all fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email.");
    return;
  }

  const newEmployee = {
    id: id ? parseInt(id) : Date.now(),
    firstName,
    lastName,
    email,
    department,
    role,
  };

  const existingIndex = employees.findIndex((e) => e.id === newEmployee.id);

  if (existingIndex !== -1) {
    employees[existingIndex] = newEmployee;
  } else {
    employees.push(newEmployee);
  }

  localStorage.setItem("employees", JSON.stringify(employees));

  // Redirect back to dashboard
  window.location.href = "index.html";
});

function validateEmail(email) {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return pattern.test(email);
}

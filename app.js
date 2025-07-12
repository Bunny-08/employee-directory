const employeeList = document.getElementById("employeeList");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

function renderEmployees(data) {
  employeeList.innerHTML = "";

  if (data.length === 0) {
    employeeList.innerHTML = "<p>No employees found.</p>";
    return;
  }

  data.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h2>${emp.firstName} ${emp.lastName}</h2>
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <div class="actions">
          <button onclick="editEmployee(${emp.id})">Edit</button>
          <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    `;
    employeeList.appendChild(card);
  });
}

function editEmployee(id) {
  window.location.href = `form.html?id=${id}`;
}

function deleteEmployee(id) {
  employees = employees.filter(e => e.id !== id);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployees(employees);
}

renderEmployees(employees);

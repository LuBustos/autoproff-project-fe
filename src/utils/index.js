export function getEmployees() {
  const data = localStorage.getItem("employee_data");
  return JSON.parse(data);
}

export function getEmployeeById(id) {
  const data = getEmployees();
  return data.filter((emp) => emp.employee_id === id)[0];
}

export function employeeFiltered(filter) {
    const data = getEmployees();
    return data.filter((emp) => emp.name.includes(filter.employee_name));
  }

export function setEmployeeInStorage(data) {
  localStorage.setItem("employee_data", JSON.stringify(data));
}

export function saveEmployee(employee) {
  const data = getEmployees();
  data.push({ employee_id: data.length + 1, ...employee });
  setEmployeeInStorage(data);
}

export function updateEmployee(id, employee) {
  const data = getEmployees();
  const index = data.findIndex((emp) => emp.employee_id === id);

  if (index === -1) {
    return false;
  }

  data[index].name = employee.name;
  data[index].workshop = employee.workshop;

  setEmployeeInStorage(data);

  return true;
}

export function clearEmployee() {
  localStorage.removeItem("employee_data");
}

export function removeEmployeeById(id) {
    const data = getEmployees();
    const employees = data.filter((emp) => emp.employee_id !== id);
    setEmployeeInStorage(employees);
}

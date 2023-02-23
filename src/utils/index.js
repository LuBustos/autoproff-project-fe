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
  return data.filter((emp) =>
    emp.name.toLowerCase().includes(filter.employee_name.toLowerCase())
  );
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
  data[index].job_name = employee.job_name;

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
export function createEmployeeFile() {
  const data = getEmployees();
  const element = document.createElement("a");
  const textFile = new Blob([JSON.stringify(data)], { type: "text/plain" });
  element.href = URL.createObjectURL(textFile);
  element.download = "employees.json";
  document.body.appendChild(element);
  element.click();
}

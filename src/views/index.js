import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Divider } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AlertUI } from "../components";
import GridUI from "../components/grid";
import CreateOrUpdateModal from "../components/modal/create";
import RemoveModal from "../components/modal/remove";
import local_employees from "../constants/employees.json";
import { workshops } from "../constants/workshops";
import { useAlert, useOpenEditModal, useOpenRemoveModal } from "../hooks";
import { employeeFiltered, getEmployees, setEmployeeInStorage } from "../utils";
import styles from "./styles.module.css";
import Filters from "../components/filter";

const Title = ({ children }) => {
  return (
    <div className={styles.title}>
      <h1>{children}</h1>
      <Divider />
    </div>
  );
};

function getWorkshop(params) {
  return workshops.find((x) => x.value === params.value).label;
}

const initial_filter = {
  employee_name: "",
};

const MainPage = () => {
  const [filters, setFilters] = useState(initial_filter);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const { closeAlert, openAlert, showAlert } = useAlert();
  const { handlerCloseEditModal, handlerOpenEditModal, openEditModal } =
    useOpenEditModal();
  const { handlerCloseRemoveModal, handlerOpenRemoveModal, openRemoveModal } =
    useOpenRemoveModal();

  useEffect(() => {
    let dataToSave = local_employees;
    const employees = getEmployees();
    if (employees) {
      dataToSave = employees;
    }
    setEmployeeInStorage(dataToSave);
    setEmployees(dataToSave);
  }, []);

  useEffect(() => {
    if (loading) {
      const data = getEmployees();
      setEmployees(data);
    }
  }, [loading]);

  useEffect(() => {
    if (filters) {
        const data = employeeFiltered(filters);
        setEmployees(data);
      }
  },[filters])

  const handlerFilters = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const columns = [
    { field: "employee_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "workshop",
      headerName: "Workshop",
      width: 150,
      valueGetter: getWorkshop,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon color="primary" />}
            label="Edit"
            className="textPrimary"
            onClick={() => handlerOpenEditModal(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color="error" />}
            label="Delete"
            onClick={() => handlerOpenRemoveModal(row.employee_id, row.name)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const process = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <Title>Employees</Title>
      <div>
        <h3>Filters</h3>
        <Filters filters={filters} handlerFilters={handlerFilters}/>
      </div>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <GridUI
            columns={columns}
            data={employees}
            loading={loading}
            getRowId={(row) => row.employee_id}
            showAlert={showAlert}
            process={process}
          />
        </div>
        {openEditModal.open ? (
          <CreateOrUpdateModal
            open={openEditModal.open}
            handleClose={handlerCloseEditModal}
            title={"Edit"}
            update={true}
            id={openEditModal.id}
            showAlert={showAlert}
            process={process}
          />
        ) : null}
        {openRemoveModal.open ? (
          <RemoveModal
            open={openRemoveModal.open}
            handleClose={handlerCloseRemoveModal}
            id={openRemoveModal.id}
            row_name={openRemoveModal.row_name}
            showAlert={showAlert}
            process={process}
          />
        ) : null}
      </div>
      {openAlert.open ? (
        <AlertUI
          open={openAlert.open}
          severity={openAlert.severity}
          message={openAlert.message}
          handleClose={closeAlert}
        />
      ) : null}
    </div>
  );
};

export default MainPage;

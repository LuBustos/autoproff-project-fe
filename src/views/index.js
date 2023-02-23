import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Divider, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { AlertUI } from "../components";
import Filters from "../components/filter";
import GridUI from "../components/grid";
import CreateOrUpdateModal from "../components/modal/create";
import RemoveModal from "../components/modal/remove";
import local_employees from "../constants/employees.json";
import { workshops } from "../constants/workshops";
import {
  useAlert,
  useEventListener,
  useOpenEditModal,
  useOpenRemoveModal,
} from "../hooks";
import {
  clearEmployee,
  employeeFiltered,
  getEmployees,
  setEmployeeInStorage,
} from "../utils";
import styles from "./styles.module.css";

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
  const keyPressed = useEventListener();
  const btnRef = useRef();

  const getAndSaveEmployees = () => {
    let dataToSave = local_employees;
    const employees = getEmployees();
    if (employees) {
      dataToSave = employees;
    }
    setEmployeeInStorage(dataToSave);
    setEmployees(dataToSave);
  };

  useEffect(() => {
    getAndSaveEmployees();
  }, []);

  useEffect(() => {
    if (loading) {
      const data = getEmployees();
      setEmployees(data);
      clearFilters();
    }
  }, [loading]);

  useEffect(() => {
    if (filters) {
      const data = employeeFiltered(filters);
      setEmployees(data);
    }
  }, [filters]);

  useEffect(() => {
    if (
      keyPressed?.ctrlKey &&
      (keyPressed?.code === "g" || keyPressed?.code === "KeyG")
    ) {
      if (btnRef.current != null) {
        setFocus();
        keyPressed.preventDefault();
      }
    }

    if (
      keyPressed?.ctrlKey &&
      (keyPressed?.code === "f" || keyPressed?.code === "KeyF")
    ) {
      if (btnRef.current != null) {
        loseFocus();
        keyPressed.preventDefault();
      }
    }

    if (
      keyPressed?.ctrlKey &&
      (keyPressed?.code === "r" || keyPressed?.code === "KeyR")
    ) {
      clearEmployee();
      getAndSaveEmployees();
      keyPressed.preventDefault();
    }
  }, [keyPressed]);

  const handlerFilters = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const setFocus = () => {
    btnRef.current.focus();
  };

  const loseFocus = () => {
    btnRef.current.blur();
  };

  const clearFilters = () => {
    setFilters(initial_filter);
  };

  const columns = [
    { field: "employee_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 350,
    },
    {
      field: "job_name",
      headerName: "Role",
      width: 530,
    },
    {
      field: "workshop",
      headerName: "Workshop",
      width: 350,
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
            ref={id === employees[0].employee_id ? btnRef : null}
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
    <div style={{ height: 400, width: "100%" }}>
      <Title>Employees</Title>
      <div style={{ margin: 10 }}>
        <h3>Filters</h3>
        <Filters
          filters={filters}
          handlerFilters={handlerFilters}
          keyPressed={keyPressed}
        />
      </div>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1, padding: 10 }}>
          <GridUI
            columns={columns}
            data={employees}
            loading={loading}
            getRowId={(row) => row.employee_id}
            showAlert={showAlert}
            process={process}
            keyPressed={keyPressed}
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
      <div style={{padding:10}}>
        <Typography variant="subtitle2" gutterBottom>
          Shortcuts
        </Typography>
        <Typography variant="body2" gutterBottom>
          Ctrl + G - Focus on grid
        </Typography>
        <Typography variant="body2" gutterBottom>
          Ctrl + R - Refresh & load info from file
        </Typography>
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

import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useFields } from "../../hooks";
import { workshops } from "../../constants/workshops";
import {
  getEmployeeById,
  saveEmployee,
  setEmployeeInStorage,
  updateEmployee,
} from "../../utils";

const initial_form = {
  name: "",
  workshop: "",
};

const Create = ({
  open,
  handleClose,
  title,
  id,
  update,
  showAlert,
  process,
}) => {
  const { fields, handlerFields, saveAllFields } = useFields(initial_form);

  const getEmployee = (id) => {
    const employee = getEmployeeById(id);
    saveAllFields(employee);
  };

  useEffect(() => {
    if (update) {
      getEmployee(id);
    }
  }, []);

  //Save info.
  const submit = async () => {
    try {
      if (fields.name.length === 0 || fields.name.length > 25) {
        showAlert("The name should have a max of 25 characters", "error");
        return;
      }
      if (update) {
        updateEmployee(id, fields);
        showAlert("The employee was updated", "success");
        process();
        handleClose();
      } else {
        saveEmployee(fields);
        showAlert("The employee was created", "success");
        process();
        handleClose();
      }
    } catch (error) {
      showAlert("Ops! Please, try again", "error");
      console.error(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2 }} style={{ textAlign: "center" }}>
          {title}
          <Divider />
        </DialogTitle>
        <DialogContent>
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <TextField
              margin="dense"
              id="name"
              label="Employee Name"
              fullWidth
              variant="outlined"
              onChange={(event) =>
                handlerFields("name", event.currentTarget.value)
              }
              value={fields.name}
              helperText="The employee name should have a max of 25 characters"
              error={fields.name.length > 25 ? true : false}
            />
            <TextField
              select
              margin="dense"
              id="demo-simple-select"
              label={"Workshop"}
              value={fields.workshop}
              variant="outlined"
              fullWidth
              onChange={(event) =>
                handlerFields("workshop", event.target.value)
              }
            >
              {workshops.map((workshop, index) => {
                return (
                  <MenuItem key={index} value={workshop.value}>
                    {workshop.label}
                  </MenuItem>
                );
              })}
            </TextField>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" variant="contained" onClick={submit}>
            {!update ? "Create" : "Edit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Create;

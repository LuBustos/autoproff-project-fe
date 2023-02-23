import { Divider, FormControl, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { workshops } from "../../constants/workshops";
import { useEventListener, useFields } from "../../hooks";
import { getEmployeeById, saveEmployee, updateEmployee } from "../../utils";

const initial_form = {
  name: "",
  job_name: "",
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
  const keyPressed = useEventListener();

  useEffect(() => {
    if (update) {
      getEmployee(id);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (keyPressed?.code === "Enter") {
      submit();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  const getEmployee = (id) => {
    const employee = getEmployeeById(id);
    saveAllFields(employee);
  };

  //Save info.
  const submit = async () => {
    try {
      if (fields.name.length === 0 || fields.name.length > 25) {
        showAlert("The name should have a max of 25 characters", "error");
        return;
      }

      if (fields.workshop.length === 0) {
        showAlert("You should select a workshop", "error");
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
              autoFocus
            />
            <TextField
              margin="dense"
              id="job_name"
              label="Role"
              fullWidth
              variant="outlined"
              onChange={(event) =>
                handlerFields("job_name", event.currentTarget.value)
              }
              value={fields.job_name}
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

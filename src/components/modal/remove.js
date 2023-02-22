import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { removeEmployeeById } from "../../utils";

const Remove = ({ open, handleClose, row_name, id, showAlert,process }) => {
  const removeEmployee = async () => {
    try {
      removeEmployeeById(id);
      showAlert("The employee was removed", "success");
      process();
      handleClose();
    } catch (error) {
      showAlert("Ops! Please, try again", "error");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove Employee - {row_name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={removeEmployee}
            autoFocus
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Remove;

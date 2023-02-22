import { TextField } from "@mui/material";

const Filters = ({ filters, handlerFilters }) => {
  return (
    <div>
      <TextField
        margin="dense"
        id="name"
        label="Employee Name"
        fullWidth
        variant="outlined"
        onChange={(event) => handlerFilters("employee_name", event.currentTarget.value)}
        value={filters.employee_name}
      />
    </div>
  );
};

export default Filters;

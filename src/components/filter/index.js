import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Filters = ({ filters, handlerFilters, keyPressed }) => {
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (
      keyPressed?.ctrlKey &&
      (keyPressed?.code === "f" || keyPressed?.code === "KeyF")
    ) {
      if (focus === false) {
        keyPressed.preventDefault();
      }

      setFocus(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  return (
    <div>
      <TextField
        id="name"
        label="Search employee"
        variant="outlined"
        onChange={(event) =>
          handlerFilters("employee_name", event.currentTarget.value)
        }
        value={filters.employee_name}
        inputRef={(input) => (focus ? input?.focus() : null)}
        onBlur={() => setFocus(false)}
        helperText="You can press ctrl + F and start to filter"
      />
    </div>
  );
};

export default Filters;

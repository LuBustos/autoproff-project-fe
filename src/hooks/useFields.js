import { useState } from "react";

function useFields(initial_form) {
  const [fields, setFields] = useState(initial_form);

  const handlerFields = (name, value) => {
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const saveAllFields = (values) => {
    setFields(values);
  };

  return { saveAllFields, handlerFields, fields };
}

export default useFields;

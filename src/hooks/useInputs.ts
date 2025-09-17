import { useState } from "react";

export const useInputs = <T extends Record<string, unknown>>(
  initialValues: T,
) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (field: keyof T) => {
    setValues((prev) => ({ ...prev, [field]: "" }));
  };

  return {
    values,
    handleChange,
    handleDelete,
  };
};

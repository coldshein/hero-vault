import { useState } from "react";

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
}

interface ValidationErrors {
  [key: string]: string | null;
}

export const useValidation = <T extends { [key: string]: string }>(
  initialValues: T,
  rules: ValidationRules
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string) => {
    const rule = rules[name];
    let error = null;

    if (rule.required && !value) {
      error = "This field is required";
    } else if (rule.minLength && value.length < rule.minLength) {
      error = `Minimum length is ${rule.minLength} characters`;
    } else if (rule.maxLength && value.length > rule.maxLength) {
      error = `Maximum length is ${rule.maxLength} characters`;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return !error;
  };

  const validateAll = () => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    for (const key in values) {
      const isFieldValid = validateField(key, values[key]);
      if (!isFieldValid) {
        newErrors[key] = errors[key];
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value } as T));
    validateField(name, value);
  };

  return { values, errors, handleChange, validateAll };
};

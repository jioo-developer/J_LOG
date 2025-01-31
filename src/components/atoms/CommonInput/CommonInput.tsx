/** @jsxImportSource @emotion/react */

import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { inputStyle } from "./CommonInputStyle";
import { forwardRef } from "react";

export interface CommonInputProps<T extends FieldValues> {
  id: Path<T>;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  register?: UseFormRegister<T>;
  error?: FieldError;
  validation?: RegisterOptions<T>;
  value?: string | number;
  label?: string;
}

const CommonInput = forwardRef<HTMLInputElement, CommonInputProps<FieldValues>>(
  (
    {
      id,
      type = "text",
      placeholder = "",
      register,
      error,
      validation = {},
      value,
      label,
    },
    ref
  ) => {
    return (
      <label htmlFor={String(id)} className="label__area">
        <span>{label && label}</span>

        <input
          ref={ref} // ✅ ref 적용
          value={value}
          id={String(id)}
          type={type}
          placeholder={placeholder}
          css={inputStyle}
          {...(register && register(id, validation))}
        />
        {error && <span>{error.message}</span>}
      </label>
    );
  }
);

CommonInput.displayName = "CommonInput";

export default CommonInput;

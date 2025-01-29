/** @jsxImportSource @emotion/react */
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { input } from "./CommonInputStyle";
export interface CommonInputProps<T extends FieldValues> {
  id: Path<T>;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  register?: UseFormRegister<T>; // 제네릭 타입으로 register 타입 설정
  error?: FieldError;
  validation?: RegisterOptions<T>; // 유효성 검사 옵션을 제네릭으로 설정
  value?: string | number;
}

function CommonInput<T extends FieldValues>({
  id,
  type = "text",
  placeholder = "",
  register,
  error,
  validation = {},
  value,
}: CommonInputProps<T>) {
  return (
    <label htmlFor={String(id)} style={{ width: "100%" }}>
      <input
        value={value}
        id={String(id)}
        type={type}
        placeholder={placeholder}
        css={input}
        {...(register && register(id, validation))}
      />

      {error && <span>{error.message}</span>}
    </label>
  );
}

export default CommonInput;

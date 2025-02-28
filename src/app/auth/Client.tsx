"use client";
import "./style.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputTypes } from "@/static/types/common";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import InputFields from "./component/InputFields";
import AgreementList from "./component/AgreementList/AgreementList";
import useAuthSubmitHook from "./useActions/useFormSubmitHook";

interface LoginProps {
  onSubmit?: (data: authInputType) => Promise<void>;
}

export interface authInputType extends InputTypes {
  nickNameRequired: string;
}

function AuthPage({ onSubmit }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authInputType>();

  const [disable, setDisable] = useState(true);

  const submitHandler = useAuthSubmitHook();

  return (
    <form
      className="auth__Form"
      data-testid="form-test"
      onSubmit={handleSubmit(onSubmit || submitHandler)}
    >
      <InputFields register={register} errors={errors} />
      <AgreementList disableHandler={setDisable} />
      <CommonButton
        theme={disable ? "disable" : "primary"}
        size="rg"
        disabled={disable}
        type="submit"
      >
        회원가입
      </CommonButton>
    </form>
  );
}

export default AuthPage;

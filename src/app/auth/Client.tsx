"use client";
import "./style.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputTypes } from "@/static/types/common";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { ChevronLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import AgreementForm from "./component/AgreementForm";
import useAuthHandler from "@/apis/userAuth/auth/hook/useAuthHook";
import { DevTool } from "@hookform/devtools";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import Link from "next/link";
import useNickNameQueryHook from "@/apis/userAuth/auth/hook/useGetNicknameHook";

interface InputType extends InputTypes {
  nickNameRequired: string;
}

const AuthPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();

  const [disable, setDisable] = useState(true);
  const [showInputBlind, setShowBlind] = useState(false);

  const { nicknameData } = useNickNameQueryHook();

  const { mutate: createAccount } = useAuthHandler();

  async function createAccountHandler(data: InputType) {
    createAccount({
      email: data.emailRequired,
      password: data.passwordRequired,
      nickname: data.nickNameRequired,
    });
  }

  return (
    <div className="page-Reset auth__Wrap">
      <div className="title__Area flex-Set">
        <button className="flex-Set">
          <Link href="/login">
            <ChevronLeftIcon className="close" size={22} />
          </Link>
        </button>
        회원가입
      </div>
      <form
        className="auth__Form"
        onSubmit={handleSubmit(createAccountHandler)}
      >
        <CommonInput
          id="emailRequired"
          label="이메일"
          type="text"
          placeholder="이메일을 입력하세요"
          register={register}
          validation={{
            required: "이메일을 입력하세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          }}
          error={errors.emailRequired}
        />
        <p className="warning">
          ※ 실제 사용하시는 이메일을 사용하셔야 비밀번호를 찾으실 수 있습니다.
        </p>
        <div className="input__Blind__Wrap">
          <CommonCheckbox
            stateValue={showInputBlind}
            setStateHandler={setShowBlind}
            childrens={[
              <EyeIcon key="eye" size={20} />,
              <EyeOffIcon key="eyeOff" size={20} color="#888" />,
            ]}
          />
          <CommonInput
            id="passwordRequired"
            label="비밀번호"
            type={showInputBlind ? "text" : "password"}
            placeholder="비밀번호를 8자리 이상 입력하세요"
            register={register}
            validation={{
              required: "비밀번호를 입력하세요.",
              minLength: {
                value: 8,
                message: "비밀번호가 짧습니다.",
              },
            }}
            error={errors.passwordRequired}
          />
        </div>

        <CommonInput
          id="nickNameRequired"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          register={register}
          validation={{
            required: "닉네임을 입력해주세요",
            validate: (value) =>
              !nicknameData.includes(value) || "이미 사용 중인 닉네임입니다",
          }}
          error={errors.nickNameRequired}
        />
        <AgreementForm disableHandler={setDisable} />
        <CommonButton
          theme={disable ? "disable" : "primary"}
          size="rg"
          disabled={disable}
        >
          회원가입
        </CommonButton>
      </form>
    </div>
  );
};

export default AuthPage;

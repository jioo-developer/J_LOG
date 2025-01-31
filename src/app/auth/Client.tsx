"use client";
import "./style.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { InputTypes } from "@/type/common";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { ChevronLeftIcon } from "lucide-react";
import AgreementForm from "./AgreementForm";
import useAuthHandler from "@/service/apis/auth/hook/useAuthHook";
import { updateProfile, UserCredential } from "firebase/auth";
import { DevTool } from "@hookform/devtools";

interface InputType extends InputTypes {
  nickNameRequired: string;
}

const AuthPage = ({ nicknameData }: { nicknameData: string[] }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();

  const [disable, setDisable] = useState(true);

  const router = useRouter();

  const { mutateAsync: createAccount } = useAuthHandler();

  async function createAccountHandler(data: InputType) {
    const response = await createAccount({
      email: data.emailRequired,
      password: data.passwordRequired,
      nickname: data.nickNameRequired,
    });

    const { user }: UserCredential = await response.json();

    // 사용자 프로필 업데이트
    await updateProfile(user, {
      displayName: data.nickNameRequired,
      photoURL: "/img/default.svg",
    });
  }

  return (
    <div className="page-Reset auth__Wrap">
      <div className="title__Area flex-Set">
        <button className="flex-Set" onClick={() => router.back()}>
          <ChevronLeftIcon className="close" size={22} />
        </button>
        회원가입
      </div>
      <form
        className="auth__Form"
        onSubmit={handleSubmit(createAccountHandler)}
      >
        <CommonInput
          id="emailRequired"
          placeholder="이메일을 입력해주세요."
          label="이메일"
          {...register("emailRequired", {
            required: "이메일을 입력하세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          error={errors.emailRequired}
        />

        <p className="warning">
          ※ 실제 사용하시는 이메일을 사용하셔야 비밀번호를 찾으실 수 있습니다.
        </p>
        <CommonInput
          type="password"
          id="passwordRequired"
          label="비밀번호"
          {...register("passwordRequired", {
            required: "비밀번호를 입력하세요.",
            minLength: {
              value: 8,
              message: "비밀번호가 짧습니다.",
            },
          })}
          placeholder="비밀번호를 입력하세요."
          error={errors.passwordRequired}
        />

        <CommonInput
          type="text"
          id="nickNameRequired"
          label="닉네임"
          {...register("nickNameRequired", {
            required: "닉네임을 입력하세요.",
            validate: (value) =>
              !nicknameData.includes(value) || "이미 사용 중인 닉네임입니다.",
          })}
          placeholder="닉네임을 입력해주세요"
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
      <DevTool control={control} />
    </div>
  );
};

export default AuthPage;

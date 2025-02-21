"use client";
import "./style.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputTypes } from "@/static/types/common";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import AgreementForm from "@/app/auth/component/AgreementForm";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import Link from "next/link";
import useNickNameQueryHook from "@/apis/member/mypage/query/useGetNicknameQuery";
import useAuthMutation from "@/apis/auth/useMutation";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";

interface InputType extends InputTypes {
  nickNameRequired: string;
}

interface LoginProps {
  onSubmit?: (data: InputType) => Promise<void>;
}

function AuthPage({ onSubmit }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();

  const [disable, setDisable] = useState(true);
  const [showInputBlind, setShowBlind] = useState(false);

  const { nicknameData } = useNickNameQueryHook();

  const { mutate: createAccount } = useAuthMutation();

  async function createAccountHandler(data: InputType) {
    createAccount({
      email: data.emailRequired,
      password: data.passwordRequired,
      nickname: data.nickNameRequired,
    });
  }

  return (
    <div className="auth__Wrap">
      <div className="title__Area flex-Set">
        <button type="button" className="flex-Set">
          <Link href="/login" className="close">
            <FaChevronLeft size={22} />
          </Link>
          회원가입
        </button>
      </div>
      <form
        className="auth__Form"
        data-testid="form-test"
        onSubmit={handleSubmit(onSubmit || createAccountHandler)}
      >
        <CommonInput
          id="emailRequired"
          testId="emailRequired"
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
              <IoEyeOutline key="eye" size={20} />,
              <IoEyeOffOutline key="eyeOff" size={20} color="#888" />,
            ]}
          />
          <CommonInput
            id="passwordRequired"
            testId="passwordRequired"
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
          testId="nickNameRequired"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          register={register}
          validation={{
            required: "닉네임을 입력해주세요",
            validate: (value) =>
              !nicknameData.includes(value) || "이미 사용중인 닉네임 입니다",
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
}

export default AuthPage;

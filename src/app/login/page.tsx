"use client";
import "./style.scss";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import Image from "next/image";
import SocialLoginPage from "./(snsLogin)";
import { useForm } from "react-hook-form";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { DevTool } from "@hookform/devtools";
import useLoginHook from "@/service/api-hooks/login/loginType/firebase/useMutation";
import { useState } from "react";
import { InputTypes } from "@/static/type/common";
import Link from "next/link";

function LoginPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputTypes>();

  const [showInputBlind, setShowBlind] = useState(false);

  const { mutate: login } = useLoginHook();

  function LoginHandler(data: InputTypes) {
    login({ email: data.emailRequired, pw: data.passwordRequired });
  }
  return (
    <div className="page-Reset sign__Wrap flex-Set ">
      <div className="logo__Wrap">
        <Image
          src="/images/logo.svg"
          width={300}
          height={115}
          alt="로고"
          sizes="100vw"
          priority
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <h1 className="logo__Title">J.log</h1>
      </div>
      <form className="sign__Form" onSubmit={handleSubmit(LoginHandler)}>
        <CommonInput
          id="emailRequired"
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
        <div className="input__Blind__Wrap">
          <CommonInput
            id="passwordRequired"
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
          <CommonCheckbox
            stateValue={showInputBlind}
            setStateHandler={setShowBlind}
            childrens={[
              <EyeIcon key="eye" size={20} />,
              <EyeOffIcon key="eyeOff" size={20} color="#888" />,
            ]}
          />
        </div>
        <CommonButton theme="primary" size="rg">
          로그인
        </CommonButton>
      </form>
      <SocialLoginPage />
      <div className="assistance">
        <CommonButton theme="none" size="sm">
          <span style={{ color: "var(--subTextcolor)" }}>
            <Link href="/resetPw"> 비밀번호 변경&amp;찾기</Link>
          </span>
        </CommonButton>
        <CommonButton theme="none" size="sm">
          <span style={{ color: "var(--subTextcolor)" }}>
            <Link href="/auth">회원가입</Link>
          </span>
        </CommonButton>
      </div>
      <DevTool control={control} />
    </div>
  );
}

export default LoginPage;

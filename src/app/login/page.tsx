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
import useLoginHook from "@/service/apis/login/hook/useLoginHook";
import { useState } from "react";

type InputTypes = {
  idRequired: string;
  passwordRequired: string;
};

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
    login({ id: data.idRequired, pw: data.passwordRequired });
  }
  return (
    <div className="sign__wrap flex-set">
      <div className="logo__wrap">
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
        <h1 className="logo__title">J.log</h1>
      </div>
      <form className="sign__form" onSubmit={handleSubmit(LoginHandler)}>
        <CommonInput
          id="idRequired"
          type="text"
          placeholder="아이디를 입력하세요"
          register={register}
          validation={{
            required: "이메일을 입력해 주세요.",
          }}
          error={errors.idRequired}
        />
        <div className="input__blind__wrap">
          <CommonInput
            id="passwordRequired"
            type={showInputBlind ? "text" : "password"}
            placeholder="비밀번호를 8자리 이상 입력하세요"
            register={register}
            validation={{
              required: "비밀번호를 입력해 주세요.",
            }}
            error={errors.passwordRequired}
          />
          <CommonCheckbox
            stateValue={showInputBlind}
            setStateHanlder={setShowBlind}
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
            비밀번호 변경&amp;찾기
          </span>
        </CommonButton>
        <CommonButton theme="none" size="sm">
          <span style={{ color: "var(--subTextcolor)" }}>회원가입</span>
        </CommonButton>
      </div>
      <DevTool control={control} />
    </div>
  );
}

export default LoginPage;

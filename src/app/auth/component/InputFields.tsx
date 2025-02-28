import { useState } from "react";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import useNickNameQueryHook from "@/apis/member/mypage/query/useGetNicknameQuery";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { authInputType } from "../Client";

interface AuthInputsProps {
  register: UseFormRegister<authInputType>;
  errors: FieldErrors<authInputType>;
}

export default function InputFields({ register, errors }: AuthInputsProps) {
  const [showInputBlind, setShowBlind] = useState(false);
  const { nicknameData } = useNickNameQueryHook();
  return (
    <>
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
    </>
  );
}

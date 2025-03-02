import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { InputTypes } from "@/static/types/common";
import useLoginHook from "@/apis/login/firebase/useMutation";

interface LoginFormProps {
  onSubmit?: (data: InputTypes) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();

  const [showInputBlind, setShowBlind] = useState(false);

  const { mutate: login } = useLoginHook();

  function LoginHandler(data: InputTypes) {
    login({ email: data.emailRequired, pw: data.passwordRequired });
  }

  return (
    <form
      className="sign__Form"
      data-testid="form-test"
      onSubmit={handleSubmit(onSubmit || LoginHandler)}
    >
      <CommonInput
        id="emailRequired"
        testId="emailRequired"
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
          testId="passwordRequired"
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
          testId="pwBlind"
          stateValue={showInputBlind}
          setStateHandler={setShowBlind}
          childrens={[
            <IoEyeOutline key="eye" size={20} />,
            <IoEyeOffOutline key="eyeOff" size={20} />,
          ]}
        />
      </div>
      <CommonButton theme="primary" type="submit" size="rg">
        로그인
      </CommonButton>
    </form>
  );
}

export default LoginForm;

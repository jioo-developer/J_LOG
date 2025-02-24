/** @jsxImportSource @emotion/react */
"use client";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import { authService } from "@/lib/firebase";
import { InputTypes } from "@/static/types/common";
import { popuprHandler } from "@/utils/popupHandler";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Style, wrap } from "./style";

const ResetPwPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();

  const router = useRouter();

  async function resetHandler(data: InputTypes) {
    try {
      // 올바른 이메일 인지 검증
      await sendPasswordResetEmail(authService, data.emailRequired);
      // 비밀번호 찾는 이메일 보내는  함수
      popuprHandler({ message: "입력하신 메일로 비밀번호 안내 해드렸습니다." });
    } catch (error) {
      popuprHandler({ message: "올바른 이메일 형식이 아닙니다." });
    }
  }

  return (
    <div className="flex-Set" css={wrap}>
      <form
        data-testid="form-test"
        className="flex-Set"
        css={Style}
        onSubmit={handleSubmit(resetHandler)}
      >
        <CommonInput
          id="emailRequired"
          testId="emailRequired"
          placeholder="이메일을 입력하세요"
          label="비밀번호를 잊어버리셨나요?"
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
        <div className="button__group">
          <CommonButton
            type="button"
            theme="none"
            size="rg"
            onClick={() => router.back()}
          >
            취소
          </CommonButton>
          <CommonButton type="submit" theme="success" size="rg">
            확인
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default ResetPwPage;



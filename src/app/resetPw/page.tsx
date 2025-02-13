/** @jsxImportSource @emotion/react */
"use client";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import { authService } from "@/lib/firebase";
import { InputTypes } from "@/static/types/common";
import { css } from "@emotion/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
      window.alert("입력하신 메일로 비밀번호 안내 해드렸습니다.");
      // popuprHandler({ message: "입력하신 메일로 비밀번호 안내드렸습니다" });
    } catch (error) {
      //   popuprHandler({ message: "올바른 이메일 형식이 아닙니다." });
    }
  }

  return (
    <div className="flex-Set" css={wrap}>
      <form
        className="flex-Set"
        css={Style}
        onSubmit={handleSubmit(resetHandler)}
      >
        <CommonInput
          id="emailRequired"
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

const wrap = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
`;

const Style = css`
  width: 28rem;
  height: auto;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px 8px;
  padding: 2rem;
  display: flex;
  box-sizing: border-box;
  border-radius: 4px;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--gap-medium);

  .label__area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: var(--gap-large);
    span {
      width: 100%;
      text-align: left;
      font-size: 1.125rem;
      margin: 0px;
      color: rgb(61, 61, 62);
    }
  }
`;

/** @jsxImportSource @emotion/react */
"use client";
import isCredential from "@/app/member/quit/handler/credentialHandler";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputTypes } from "@/static/types/common";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import { useRouter } from "next/navigation";
import useUserQueryHook from "@/apis/login/query/useGetUserQuery";
import { Style, wrap } from "./style";
import useQuitHook from "./useActions/useQuitHook";

const QuitPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();

  const router = useRouter();
  const [loginType, setType] = useState("");
  const { data: user } = useUserQueryHook();

  useEffect(() => {
    if (user) {
      const Credential = isCredential(user);
      setType(Credential);
    }
  }, [user]);

  const { deleteHandler } = useQuitHook({ loginType });

  return (
    <div className="flex-Set" css={wrap}>
      <form
        className="flex-Set label-area"
        data-testid="form-test"
        css={Style}
        onSubmit={handleSubmit(deleteHandler)}
      >
        <span>정말로 회원탈퇴를 진행할까요?</span>
        {loginType === "origin" && (
          <CommonInput
            id="passwordRequired"
            placeholder="회원탈퇴를 위해 비밀번호를 입력해주세요"
            register={register}
            validation={{
              required: "비밀번호를 입력하세요.",
              minLength: {
                value: 8,
                message: "비밀번호가 짧습니다.",
              },
            }}
            error={errors.emailRequired}
          />
        )}
        <div className="button__group">
          <CommonButton theme="none" size="rg" onClick={() => router.back()}>
            취소
          </CommonButton>
          <CommonButton
            type={loginType === "origin" ? "submit" : "button"}
            theme="success"
            size="rg"
          >
            확인
          </CommonButton>
        </div>
      </form>
    </div>
  );
};
export default QuitPage;

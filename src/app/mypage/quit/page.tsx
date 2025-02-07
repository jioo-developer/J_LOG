/** @jsxImportSource @emotion/react */
"use client";
import originDeleteHandler from "@/service/member/quit/originquitHandler";
import SocialDeleteHandler from "@/service/member/quit/socialquitHandler";
import isCredential from "@/service/member/quit/credentialHandler";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import useGetQueryHandler from "../getQueryHandler";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { InputTypes } from "@/static/types/common";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Link from "next/link";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/static/constants/common";

type UserType = {
  user: User;
};

const QuitPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();
  const router = useRouter();
  const { user }: UserType = useGetQueryHandler() as UserType;
  const [loginType, setType] = useState("");

  useEffect(() => {
    const Credential = isCredential(user);
    setType(Credential);
  }, []);

  async function deleteHandler(data?: InputTypes) {
    try {
      if (loginType === "sosial") {
        await SocialDeleteHandler();
      } else {
        await originDeleteHandler((data as InputTypes).passwordRequired); // 1. `quitPw`를 사용하여 원래 삭제 핸들러 실행
      }

      await fetch(`${apiUrl}/api/mypage`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({ user }),
      });

      router.push("/login");
    } catch {
      //   popuprHandler({ message: "회원 탈퇴에 실패하였습니다" });
    }
  }

  return (
    <div className="flex-Set" css={wrap}>
      <form
        className="flex-Set"
        css={Style}
        onSubmit={handleSubmit(deleteHandler)}
      >
        {loginType === "origin" && (
          <CommonInput
            id="passwordRequired"
            placeholder="회원탈퇴를 위해 비밀번호를 입력해주세요요"
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
          <CommonButton theme="none" size="rg">
            <Link href="/mypage">취소</Link>
          </CommonButton>
          <CommonButton
            type={loginType === "origin" ? "submit" : "button"}
            theme="success"
            size="rg"
            onClick={deleteHandler}
          >
            확인
          </CommonButton>
        </div>
      </form>
    </div>
  );
};
export default QuitPage;

const wrap = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
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

  .button__group {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
`;

/** @jsxImportSource @emotion/react */
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import useNameChangeHandler from "@/apis/member/mypage/nicknameForm/useMutation";
import { Skeleton } from "@mui/material";
import { User } from "firebase/auth";
import { startTransition, Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormEditorButton, NameWrap } from "./NicknameFormStyle";

type propsType = {
  user: User;
  data: string[];
};

type InputType = {
  nickNameRequired: string;
};

function NicknameForm({ user, data }: propsType) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InputType>({});

  const router = useRouter();
  const [nameToggle, setnameToggle] = useState(false);
  const { mutateAsync } = useNameChangeHandler();

  // user.displayName이 변경되면 폼 값도 업데이트
  useEffect(() => {
    if (user?.displayName) {
      setValue("nickNameRequired", user.displayName as string);
    }
  }, [user?.displayName, setValue]);

  async function changeNameHandler(data: InputType) {
    await mutateAsync({ nickname: data.nickNameRequired });
    setnameToggle(false);

    startTransition(() => {
      router.refresh(); // 서버 컴포넌트 리렌더링
      reset(); // 클라이언트 컴포넌트 리렌더링
    });
  }

  return (
    <div css={NameWrap}>
      {!nameToggle ? (
        <div className="name_area">
          <b className="nickname">
            {user ? (
              user.displayName + ".log"
            ) : (
              <Skeleton variant="text" width={"100%"} />
            )}
          </b>
          <div className="flex-Set" css={FormEditorButton}>
            <CommonButton
              type="button"
              theme="none"
              size="rg"
              onClick={() => setnameToggle(true)}
            >
              닉네임 수정
            </CommonButton>
          </div>
        </div>
      ) : (
        <>
          <form
            className="name_area"
            data-testid="form-test"
            onSubmit={handleSubmit(changeNameHandler)}
          >
            <CommonInput
              id="nickNameRequired"
              placeholder="닉네임을 입력해주세요"
              register={register}
              validation={{
                required: "닉네임을 입력해주세요",
                validate: (value) =>
                  !data.includes(value) || "이미 사용중인 닉네임입니다",
              }}
              error={errors.nickNameRequired}
            />
            <div className="flex-Set" css={FormEditorButton}>
              <CommonButton theme="none" size="rg">
                수정완료
              </CommonButton>
              <CommonButton
                theme="none"
                size="rg"
                type="button"
                onClick={() => setnameToggle(false)}
              >
                취소
              </CommonButton>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default NicknameForm;

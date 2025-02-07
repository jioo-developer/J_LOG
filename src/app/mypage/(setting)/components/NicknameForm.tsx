import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import useNameChangeHandler from "@/service/member/mypage/profile/useNameMutation";
import { Skeleton } from "@mui/material";
import { User } from "firebase/auth";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
    trigger,
    formState: { errors },
  } = useForm<InputType>({});

  const [nameToggle, setnameToggle] = useState(false);
  const { mutateAsync } = useNameChangeHandler();

  // user.displayName이 변경되면 폼 값도 업데이트
  useEffect(() => {
    if (user?.displayName) {
      setValue("nickNameRequired", user.displayName as string);
    }
  }, [user?.displayName, setValue, trigger]);

  async function changeNameHandler(data: InputType) {
    await mutateAsync({ nickname: data.nickNameRequired });
    setnameToggle(false);
  }

  return (
    <div className="form__wrap">
      {!nameToggle ? (
        <div className="name_area">
          <b className="nickname">
            <Suspense fallback={<Skeleton variant="text" />}>
              {user ? (
                user.displayName + ".log"
              ) : (
                <Skeleton variant="text" width={"100%"} />
              )}
            </Suspense>
          </b>
          <div className="nick__editor flex-Set">
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
            data-testid="name_area"
            onSubmit={handleSubmit(changeNameHandler)}
          >
            <CommonInput
              id="nickNameRequired"
              placeholder="닉네임을 입력해주세요"
              register={register}
              validation={{
                required: "닉네임을 입력해주세요",
                validate: (value) =>
                  !data.includes(value) || "이미 사용 중인 닉네임입니다",
              }}
              error={errors.nickNameRequired}
            />
            <div className="nick__editor flex-Set">
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

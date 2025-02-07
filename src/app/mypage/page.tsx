"use client";
import "./Style.scss";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import useImageChanger from "@/service/member/mypage/profile/useImageChangeMutation";
import useNameChanger from "@/service/member/mypage/profile/useNameChangeMutation";
import ChangeFileHanlder from "@/utils/onFileChangeHandler";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import useGetQueryHandler from "./getQueryHandler";

type InputType = {
  nickNameRequired: string;
};

function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();

  const [nameToggle, setnameToggle] = useState(false);

  const { user, nicknameData } = useGetQueryHandler();

  const nameChangeMutate = useNameChanger();
  const imageChangeMutate = useImageChanger();

  async function changeNameHandler(data: InputType) {
    await nameChangeMutate.mutateAsync({ nickname: data.nickNameRequired });
    setnameToggle(!nameToggle);
  }

  async function changeImageHandler(e: ChangeEvent<HTMLInputElement>) {
    const theFiles = Array.from(e.target.files || []);
    if (theFiles.length > 0) {
      try {
        const { result: url, files } = await ChangeFileHanlder(theFiles);
        imageChangeMutate.mutate({ url, files });
        // 업로드 한  파일을 URL로 변환하는 함수
        // Firebase에 등록 할 수 있게 URL 변환
      } catch (error) {
        // popuprHandler({ message: "프로필 업로드에 실패하였습니다." });
        window.alert((error as Error).message);
      }
    }
  }

  return (
    <div className="profile_wrap flex-Set">
      <section className="content">
        <div className="profile_area">
          <div className="img_wrap flex-Set">
            <input
              type="file"
              accept="image/*"
              id="img_check"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                changeImageHandler(e)
              }
            />

            <figure className="profileImg">
              <Image
                width={135}
                height={135}
                src={user ? (user.photoURL as string) : "images/default.svg"}
                alt="프로필 이미지"
              />
            </figure>

            <CommonButton theme="success" size="rg">
              <label htmlFor="img_check" className="uploads">
                이미지 업로드
              </label>
            </CommonButton>
          </div>
          <form
            className="name_area"
            data-testid="name_area"
            onSubmit={handleSubmit(changeNameHandler)}
          >
            {nameToggle ? (
              <CommonInput
                id="nickNameRequired"
                placeholder="닉네임을 입력해주세요"
                register={register}
                validation={{
                  required: "닉네임을 입력해주세요",
                  validate: (value) =>
                    !nicknameData.includes(value) ||
                    "이미 사용 중인 닉네임입니다",
                }}
                error={errors.nickNameRequired}
              />
            ) : (
              <b className="nickname">{user ? user.displayName : ""}</b>
            )}
            <div className="nick__editor flex-Set">
              <CommonButton
                type={nameToggle ? "submit" : "button"}
                theme="none"
                size="rg"
                onClick={() => setnameToggle(!nameToggle)}
              >
                {nameToggle ? "수정완료" : "닉네임 수정"}
              </CommonButton>
              {nameToggle && (
                <CommonButton
                  theme="none"
                  size="rg"
                  type="button"
                  onClick={() => nameToggle && setnameToggle(!nameToggle)}
                >
                  취소
                </CommonButton>
              )}
            </div>
          </form>
        </div>

        <div className="withdrawal">
          <div className="suggest">
            <p className="suggest_title">문의사항</p>
            <p className="director_email">rlawlgh388@naver.com</p>
          </div>
          <div className="delete_wrap">
            <p className="withdrawal_title">회원 탈퇴</p>
            <div className="in_wrap">
              <CommonButton theme="warnning" size="rg">
                회원 탈퇴
              </CommonButton>
            </div>
          </div>
          <div className="delete_wrap">
            <p className="withdrawal_title">우선권 구매</p>
            <div className="in_wrap">
              <CommonButton theme="white" size="rg">
                구매하기
              </CommonButton>
            </div>
          </div>

          <p className="explan">
            탈퇴 시 작성한 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
          </p>
          <p className="explan">
            소셜로그인 회원탈퇴는 첫 가입 시 입력했던 2차 비밀번호 입니다.
          </p>
        </div>
      </section>
    </div>
  );
}

export default MyPage;

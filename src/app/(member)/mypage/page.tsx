"use client";
import "./Style.scss";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import useImageChanger from "@/service/api-hooks/mypage/useImageChangeMutation";
import useNameChanger from "@/service/api-hooks/mypage/useNameChangeMutation";
import onFileChange from "@/utils/onFileChangeHandler";
import storageUpload from "@/utils/storageUploadHandler";
import { Skeleton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import Image from "next/image";
import { ChangeEvent, Suspense, useState } from "react";
import { useForm } from "react-hook-form";

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

  const user = useQueryClient().getQueryData<User>(["getuser"]);
  const nicknameData =
    useQueryClient().getQueryData<string[]>(["getNickname"]) || [];

  const nameChangeMutate = useNameChanger();
  const imageChangeMutate = useImageChanger();

  async function changeNameHandler(data: InputType) {
    nameChangeMutate.mutate({ nickname: data.nickNameRequired });
    setnameToggle(!nameToggle);
  }

  async function changeImageHandler(e: ChangeEvent<HTMLInputElement>) {
    const theFiles = Array.from(e.target.files || []);
    if (theFiles.length > 0) {
      let upload = null;
      try {
        const { result, files } = await onFileChange(theFiles);
        // 업로드 한  파일을 URL로 변환하는 함수
        upload = await storageUpload(result, files);
        if (upload.length === 0 || !upload[0]) return;
        // Firebase에 등록 할 수 있게 URL 변환
      } catch (error) {
        // popuprHandler({ message: "프로필 업로드에 실패하였습니다." });
        return;
      }

      if (upload && upload.length > 0 && upload[0]) {
        imageChangeMutate.mutate({ imgurl: upload[0] });
      }
    }
  }

  return (
    <div className="profile_wrap">
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
              <Suspense fallback={<Skeleton />}>
                <Image
                  width={135}
                  height={135}
                  src={user ? (user.photoURL as string) : "images/default.svg"}
                  alt="프로필 이미지"
                />
              </Suspense>
            </figure>

            <label htmlFor="img_check" className="uploads btn">
              이미지 업로드
            </label>
          </div>
          <form
            className="name_area"
            data-testid="name_area"
            onSubmit={handleSubmit(changeNameHandler)}
          >
            <CommonInput
              id="nickNameRequired"
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              register={register}
              validation={{
                required: "닉네임을 입력해주세요",
                validate: (value) =>
                  nicknameData.includes(value) || "이미 사용 중인 닉네임입니다",
              }}
              error={errors.nickNameRequired}
            />
            <b className="nickname">{user ? user.displayName : ""}</b>
            <CommonButton theme="success">수정</CommonButton>

            {/* <CommonButton theme="white">취소</CommonButton> */}
          </form>
        </div>
        <div className="suggest">
          <p className="suggest_title">문의사항</p>
          <p className="director_email">rlawlgh388@naver.com</p>
        </div>
        <div className="withdrawal">
          <div className="delete_wrap">
            <p className="withdrawal_title">회원 탈퇴</p>
            <button className="btn">회원 탈퇴</button>
          </div>
          <div className="delete_wrap">
            <p className="withdrawal_title">우선권 구매</p>
            <CommonButton theme="white">구매하기</CommonButton>
          </div>
          <p
            className="explan"
            style={{ borderBottom: "1px solid #eee", paddingBottom: 15 }}
          >
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

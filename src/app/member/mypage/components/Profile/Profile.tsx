/** @jsxImportSource @emotion/react */
import ChangeFileHanlder from "@/utils/onFileChangeHandler";
import Image from "next/image";
import { ChangeEvent } from "react";
import useImageChangeHandler from "@/apis/member/mypage/profile/useMutation";
import Skeleton from "@mui/material/Skeleton";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { User } from "firebase/auth";
import { ImageWrap, ProfileImage } from "./ProfileStyle";

function ProfileComponent({ user }: { user: User }) {
  const { mutate } = useImageChangeHandler();

  async function changeImageHandler(e: ChangeEvent<HTMLInputElement>) {
    const theFiles = Array.from(e.target.files || []);
    if (theFiles.length > 0) {
      try {
        const { result: url } = await ChangeFileHanlder(theFiles);
        mutate({ url, files: theFiles });
        // 업로드 한  파일을 URL로 변환하는 함수
        // Firebase에 등록 할 수 있게 URL 변환
      } catch (error) {
        // popuprHandler({ message: "프로필 업로드에 실패하였습니다." });
        window.alert((error as Error).message);
      }
    }
  }

  return (
    <div className="flex-Set" css={ImageWrap}>
      <input
        type="file"
        accept="image/*"
        id="img_check"
        onChange={(e: ChangeEvent<HTMLInputElement>) => changeImageHandler(e)}
      />

      <figure css={ProfileImage}>
        {user ? (
          <Image
            width={135}
            height={135}
            src={user.photoURL || "/images/default.svg"}
            style={{ borderRadius: "50%" }}
            alt="프로필 이미지"
          />
        ) : (
          <Skeleton variant="circular" width={135} height={135} />
        )}
      </figure>

      <CommonButton theme="success" size="rg">
        <label htmlFor="img_check" className="uploads">
          이미지 업로드
        </label>
      </CommonButton>
    </div>
  );
}

export default ProfileComponent;

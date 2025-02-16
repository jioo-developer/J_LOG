import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { FirebaseData } from "@/static/types/common";
import Image from "next/image";
import Link from "next/link";
import clipboardHanlder from "../handler/clipboardHanlder";
import CommonImage from "@/components/atoms/CommonImage";
import { Skeleton } from "@mui/material";
import usePageDeleteMutation from "@/apis/detail/action/delete/useMutation";
import { askDeleteHandler } from "../handler/pageDeleteHandler";
import useFavoriteMutation from "@/apis/detail/favorite/useMutation";
import { authService } from "@/lib/firebase";

type propsType = {
  pageData: FirebaseData;
  isLoading: boolean;
};

export default function PageComponent({ pageData, isLoading }: propsType) {
  const { mutate } = usePageDeleteMutation();
  const favoriteMutate = useFavoriteMutation();
  // handle delete
  function handleDelete() {
    askDeleteHandler({
      data: {
        writer: pageData.writer,
        fileName: pageData.fileName,
        pageId: pageData.pageId,
      },
      mutate,
    });
    // handle delete
  }

  function favoriteHandler() {
    const user = authService.currentUser?.uid as string;
    const newFavorite = pageData.favorite;
    favoriteMutate.mutate({
      user,
      value: newFavorite,
      id: pageData.pageId,
    });
  }

  return (
    <>
      <section className="sub_header">
        <h1>{pageData?.title}</h1>
        <div className="writer_wrap flex-Set">
          <div className="left_wrap">
            {isLoading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Image
                src={pageData?.profile}
                width={40}
                height={40}
                alt="프로필"
                className="profile"
              />
            )}

            <p className="writer">{pageData?.user}</p>
            <p className="date">{pageData?.date}</p>
          </div>
          <div className="right_wrap flex-Set">
            <CommonButton theme="none" size="rg">
              <Link href="/updateEditor">수정</Link>
            </CommonButton>
            <CommonButton theme="none" onClick={handleDelete}>
              삭제
            </CommonButton>
          </div>
        </div>
      </section>
      <section className="content_wrap">
        <pre className="text">{pageData?.text}</pre>
        <div className="grid">
          {pageData?.url?.length > 0 &&
            pageData.url.map((value, index) => (
              <CommonImage
                src={value}
                className="att"
                alt="업로드 이미지"
                key={index}
                width={160}
                height={160}
              />
            ))}
        </div>
        <div className="comment flex-Set">
          <div className="favorite_wrap">
            <p className="com_title">게시글에 대한 댓글을 달아주세요.</p>
            <div className="right_box">
              <CommonButton
                theme="white"
                type="button"
                onClick={clipboardHanlder}
              >
                공유하기
              </CommonButton>

              <CommonButton
                theme="white"
                type="button"
                onClick={favoriteHandler}
              >
                <span>👍</span>추천&nbsp;{pageData?.favorite}
              </CommonButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

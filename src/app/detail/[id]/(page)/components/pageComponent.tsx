import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { FirebaseData } from "@/static/types/common";
import Image from "next/image";
import Link from "next/link";
import clipboardHanlder from "../handler/clipboardHanlder";
import CommonImage from "@/components/atoms/CommonImage";
import { Skeleton } from "@mui/material";
import usePageDeleteMutation from "@/apis/detail/action/delete/useMutation";
import useFavoriteMutation from "@/apis/detail/action/favorite/useMutation";
import useMediaQuery from "@/utils/useMediaQuery";
import { popuprHandler } from "@/utils/popupHandler";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "@/lib/firebase";
import CommonLinkButton from "@/components/atoms/CommonLinkButton/CommonLinkButton";

type propsType = {
  user: string;
  pageData: FirebaseData;
  isLoading: boolean;
};

export default function PageComponent({
  user,
  pageData,
  isLoading,
}: propsType) {
  const { mutate } = usePageDeleteMutation();
  const favoriteMutate = useFavoriteMutation();
  const isMobile = useMediaQuery("(max-width: 450px)");

  // handle delete
  function deletePagePopup() {
    popuprHandler({
      message: "정말로 해당 글을 삭제하시겠습니까?",
      type: "confirm",
      callback: () => deletePageHandler(),
    });
  }

  async function deletePageHandler() {
    const files = pageData.fileName;
    const writer = pageData.writer;
    const pageId = pageData.pageId;

    if (files.length > 0) {
      await Promise.all(
        files.map(async (item: string) => {
          const imageRef = ref(storageService, `${writer}/${item}`);
          await deleteObject(imageRef);
        })
      );
    }

    mutate(pageId);
  }

  function favoriteHandler() {
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
          {pageData.writer === user && (
            <>
              <div className="right_wrap flex-Set">
                <CommonLinkButton
                  size="rg"
                  testId="updateButton"
                  padding={isMobile ? "none" : undefined}
                >
                  <Link href="/updateEditor">수정</Link>
                </CommonLinkButton>
                <CommonButton
                  theme="none"
                  onClick={deletePagePopup}
                  padding={isMobile ? "none" : undefined}
                >
                  삭제
                </CommonButton>
              </div>
            </>
          )}
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

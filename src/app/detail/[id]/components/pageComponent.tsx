import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { FirebaseData } from "@/static/types/common";
import Image from "next/image";
import Link from "next/link";
import clipboardHanlder from "../handler/clipboardHanlder";
import { usePageDeleteHandler } from "../handler/usePageDeleteHandler";

type propsType = {
  pageData: FirebaseData;
};

export default function PageComponent({ pageData }: propsType) {
  return (
    <>
      <section className="sub_header">
        <h1>{pageData?.title}</h1>
        <div className="writer_wrap flex-Set">
          <div className="left_wrap">
            <Image
              src={pageData?.profile ? pageData?.profile : "/img/default.svg"}
              width={40}
              height={40}
              alt="프로필"
              className="profile"
            />
            <p className="writer">{pageData?.user}</p>
            <p className="date">{pageData?.date}</p>
          </div>
          <div className="right_wrap flex-Set">
            <CommonButton theme="none" size="rg">
              <Link href="/edit">수정</Link>
            </CommonButton>
            <CommonButton
              theme="none"
              onClick={() => usePageDeleteHandler(pageData)}
            >
              삭제
            </CommonButton>
          </div>
        </div>
      </section>
      <section className="content_wrap">
        <pre className="text">{pageData?.text}</pre>
        <div className="grid">
          {pageData?.url?.length &&
            pageData.url.map((value, index) => (
              <Image
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
              <CommonButton theme="white" onClick={clipboardHanlder}>
                공유하기
              </CommonButton>

              <CommonButton theme="white">
                <span>👍</span>추천&nbsp;{pageData?.favorite}
              </CommonButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

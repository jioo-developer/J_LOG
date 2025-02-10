import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { usePageInfoStore } from "@/store/common";
import Image from "next/image";
import Link from "next/link";

const DetailPage = () => {
  const pageInfo = useGetPageInfo();
  const { pageData, isLoading } = useDetailQueryHook(pageInfo);

  const favoriteMutate = useFavoriteMutate();
  const pageDeleteMutate = usePageDeleteHandler();

  const { setEditMode } = usePageInfoStore();

  const { fromAction, setFromAction } = usePageInfoStore();

  async function pageDeleteHandler() {
    // popuprHandler({ message: "정말 삭제 하시겠습니까?", type: "confirm" });
    setFromAction("detail");
  }

  async function onDelete() {
    if (fromAction === "detail") {
      pageDeleteMutate.mutate(pageData);
    }
  }

  const handleCopy = async () => {
    try {
      // 현재 페이지 URL을 가져와 클립보드에 복사합니다.
      await navigator.clipboard.writeText(window.location.href);
      //   popuprHandler({ message: "클립보드에 복사되었습니다" });
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  return (
    <div className="detail_wrap">
      <div className="in_wrap">
        <section className="sub_header">
          <h1>{pageData.title}</h1>
          <div className="writer_wrap flex-Set">
            <div className="left_wrap">
              <Image
                src={pageData.profile ? pageData.profile : "/img/default.svg"}
                width={40}
                height={40}
                alt="프로필"
                className="profile"
              />
              <p className="writer">{pageData.user}</p>
              <p className="date">{pageData.date}</p>
            </div>
            <div className="right_wrap flex-Set">
              <CommonButton
                theme="none"
                size="rg"
                onClick={() => setEditMode(true)}
              >
                <Link href="/edit">수정</Link>
              </CommonButton>
              <button className="delete" onClick={pageDeleteHandler}>
                삭제
              </button>
            </div>
          </div>
        </section>
        <section className="content_wrap">
          <pre className="text">{pageData.text}</pre>
          <div className="grid">
            {pageData.url.length > 0 &&
              pageData.url.map((value, index) => {
                return (
                  <Image
                    src={value}
                    className="att"
                    alt="업로드 이미지"
                    key={index}
                    width={160}
                    height={160}
                  />
                );
              })}
          </div>
          <div className="comment flex-Set">
            <div className="favorite_wrap">
              <p className="com_title">게시글에 대한 댓글을 달아주세요.</p>
              <div className="right_box">
                <button className="favorite_btn" onClick={handleCopy}>
                  공유하기
                </button>

                <button className="favorite_btn flex-Set">
                  <span>👍</span>추천&nbsp;{pageData.favorite}
                </button>
              </div>
            </div>
            <MyContextProvider>
              <Reply />
            </MyContextProvider>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailPage;

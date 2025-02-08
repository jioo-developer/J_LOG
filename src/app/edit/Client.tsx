"use client";
import useGetQueryHandler from "@/apis/member/mypage/query/getMyDataQuery";
import "./Style.scss";
import useDetailQueryHook from "@/apis/detail/hook/useGetDetaillHook";
import { usePageInfoStore } from "@/store/common";
import Priority from "./components/PriorityChecker";
import { useRouter } from "next/navigation";
import { useCreateId } from "@/apis/detail/handler/pageInfoHandler";
import InputForm from "./components/InputForm";
const EditorPage = () => {
  const { user } = useGetQueryHandler();
  const { pgId: pageInfo, editMode } = usePageInfoStore();

  const { pageData } = useDetailQueryHook(editMode ? pageInfo : "");

  const createId = useCreateId();

  const router = useRouter();

  // useEffect(() => {
  //   if (!editMode) {
  //     pageInfoStore.setState({ pgId: createId });
  //     //edit mode가 false이기 때문에 pageid를 새로 구성 = pageData가 없음
  //   } else {
  //     // edit mode가 true이기 때문에 이미 pageData가 있음
  //     const oldData = pageData as FirebaseData;
  //     // 그래서 거짓의 값이 없을 경우 타입 단언 적용
  //     setTitle(oldData.title);
  //     // 이전에 있는 제목
  //     setText(oldData.text);
  //     // 이전에 있는 내용
  //     const imageUrl = oldData.url;
  //     setPreview(imageUrl);

  //     setName(oldData.fileName);
  //     // 이전에 있는 이미지
  //   }
  // }, [editMode, pageData]);

  return (
    <div className="upload">
      <InputForm />
      <Priority />
      <div className="bottom_wrap">
        <button className="exit" onClick={() => router.back()}>
          ← &nbsp;나가기
        </button>
        <div className="cancel_wrap">
          <button type="submit" className="post">
            글작성
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditorPage;

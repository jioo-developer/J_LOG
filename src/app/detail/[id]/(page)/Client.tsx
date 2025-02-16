"use client";
import "./Style.scss";
import useDetailQueryHook from "@/apis/detail/query/useDetailQuery";
import { usePopupStore } from "@/store/popupStore";
import { popuprHandler } from "@/utils/popupHandler";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PageComponent from "./components/pageComponent";
import useGetMyInfoQueryHandler from "@/apis/member/mypage/query/getMyDataQuery";
import { User } from "firebase/auth";
type propsType = {
  pageId: string;
};

const DetailPage = ({ pageId }: propsType) => {
  const router = useRouter();
  const { message } = usePopupStore();
  const { user } = useGetMyInfoQueryHandler();
  const { pageData, isLoading } = useDetailQueryHook(pageId);

  useEffect(() => {
    if (!pageData) {
      popuprHandler({ message: "페이지 정보가 조회 되지 않습니다." });
    }
  }, [pageData]);

  useEffect(() => {
    if (!pageData) {
      usePopupStore.subscribe((state, prevState) => {
        const target = "페이지 정보가 조회 되지 않습니다.";
        if (prevState.message === target && state.message === "") {
          router.push("/");
        }
      });
    }
  }, [message, pageData]);
  // 팝업 노출 후 확인 눌렀을 시 메인페이지로 이동

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="page-Reset detail_wrap">
      <div className="in_wrap">
        {pageData && (
          <PageComponent
            pageData={pageData}
            user={user?.uid as string}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default DetailPage;

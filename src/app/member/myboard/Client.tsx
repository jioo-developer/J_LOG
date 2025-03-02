// MyBoardPage.tsx
"use client";
import "./Style.scss";
import useMyDataQueryHook from "@/apis/member/myboard/query/useGetMyPostQuery";
import { useEffect } from "react";
import { popuprHandler } from "@/utils/popupHandler";
import useUserQueryHook from "@/apis/login/query/useGetUserQuery";
import ProfileSection from "./components/ProfileSection";
import BoardContent from "./components/BoardContent";

const MyBoardPage = () => {
  const { data: user } = useUserQueryHook();
  const { myData, isLoading } = useMyDataQueryHook(user ? user.uid : "");

  useEffect(() => {
    if (!isLoading && !myData) {
      popuprHandler({ message: "작성한 게시글이 없습니다." });
    }
  }, [isLoading, myData]);

  return (
    <>
      {myData && (
        <div className="wrap board_wrap">
          {user && (
            <>
              <ProfileSection
                photoURL={user.photoURL as string}
                displayName={user.displayName as string}
              />
            </>
          )}

          <BoardContent myData={myData} />
        </div>
      )}
    </>
  );
};

export default MyBoardPage;

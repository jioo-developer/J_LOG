"use client";
import "./Style.scss";
import NicknameForm from "./components/NicknameForm/NicknameForm";
import ProfileComponent from "./components/Profile/Profile";
import SkeletonComponent from "./components/Skeleton";
import { Skeleton } from "@mui/material";
import useUserQueryHook from "@/apis/login/query/useGetUserQuery";
import useNickNameQueryHook from "@/apis/member/mypage/query/useGetNicknameQuery";
import Withdrawal from "./components/withdrawal";

function MyPage() {
  const { data: user } = useUserQueryHook();
  const { nicknameData } = useNickNameQueryHook();
  return (
    <div className="profile_wrap flex-Set">
      <section className="content">
        <div className="profile_area">
          {user ? (
            <>
              <ProfileComponent user={user} />
              <NicknameForm user={user} data={nicknameData} />
            </>
          ) : (
            <>
              <Skeleton
                variant="circular"
                width={160}
                height={135}
                style={{ marginRight: 40 }}
              />
              <SkeletonComponent />
            </>
          )}
        </div>
        <Withdrawal />
      </section>
    </div>
  );
}

export default MyPage;

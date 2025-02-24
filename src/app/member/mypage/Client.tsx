"use client";
import "./Style.scss";
import useGetQueryHandler from "@/apis/member/mypage/query/getMyDataQuery";
import NicknameForm from "./components/NicknameForm/NicknameForm";
import ProfileComponent from "./components/Profile/Profile";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Link from "next/link";
import SkeletonComponent from "./components/Skeleton";
import { Skeleton } from "@mui/material";

function MyPage() {
  const { user, nicknameData } = useGetQueryHandler();
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

        <div className="withdrawal">
          <div className="suggest">
            <p className="suggest_title">문의사항</p>
            <p className="director_email">rlawlgh388@naver.com</p>
          </div>
          <div className="delete_wrap">
            <p className="withdrawal_title">회원 탈퇴</p>
            <div className="in_wrap">
              <CommonButton theme="warnning" size="rg">
                <Link href="/member/quit">회원탈퇴</Link>
              </CommonButton>
            </div>
          </div>
          <div className="delete_wrap">
            <p className="withdrawal_title">우선권 구매</p>
            <div className="in_wrap">
              <CommonButton theme="white" size="rg">
                <Link href="/market">구매하기</Link>
              </CommonButton>
            </div>
          </div>

          <p className="explan">
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

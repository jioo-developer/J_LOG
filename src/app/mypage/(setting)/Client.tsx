"use client";
import useGetQueryHandler from "@/service/member/mypage/getQueryDataHook";
import NicknameForm from "./components/NicknameForm";
import ProfileComponent from "./components/Profile";
import "./Style.scss";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";

function MyPage() {
  const { user, nicknameData } = useGetQueryHandler();
  return (
    <div className="profile_wrap flex-Set">
      <section className="content">
        {user && (
          <div className="profile_area">
            <ProfileComponent user={user} />
            <NicknameForm user={user} data={nicknameData} />
          </div>
        )}
        <div className="withdrawal">
          <div className="suggest">
            <p className="suggest_title">문의사항</p>
            <p className="director_email">rlawlgh388@naver.com</p>
          </div>
          <div className="delete_wrap">
            <p className="withdrawal_title">회원 탈퇴</p>
            <div className="in_wrap">
              <CommonButton theme="warnning" size="rg">
                회원 탈퇴
              </CommonButton>
            </div>
          </div>
          <div className="delete_wrap">
            <p className="withdrawal_title">우선권 구매</p>
            <div className="in_wrap">
              <CommonButton theme="white" size="rg">
                구매하기
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

import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Link from "next/link";

function AssistanceLinks() {
  return (
    <div className="assistance">
      <CommonButton theme="none" size="sm">
        <span>
          <Link href="/resetPw">비밀번호 변경&amp;찾기</Link>
        </span>
      </CommonButton>
      <CommonButton theme="none" size="sm">
        <span>
          <Link href="/auth">회원가입</Link>
        </span>
      </CommonButton>
    </div>
  );
}

export default AssistanceLinks;

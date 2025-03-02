import CommonLinkButton from "@/components/atoms/CommonLinkButton/CommonLinkButton";
import Link from "next/link";

function AssistanceLinks() {
  return (
    <div className="assistance">
      <CommonLinkButton size="sm">
        <span>
          <Link href="/resetPw">비밀번호 변경&amp;찾기</Link>
        </span>
      </CommonLinkButton>
      <CommonLinkButton size="sm">
        <span>
          <Link href="/auth">회원가입</Link>
        </span>
      </CommonLinkButton>
    </div>
  );
}

export default AssistanceLinks;

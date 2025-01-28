import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Image from "next/image";
import "./style.scss";
import { GoogleLogin } from "@/service/apis/login/snsLogin/google/loginHandler";
import { useRouter } from "next/navigation";

export type objType = {
  id: string;
  name: string;
  service: string;
  pw?: number;
};

const SocialLoginPage = () => {
  const router = useRouter();
  async function LoginHandler() {
    try {
      await GoogleLogin();
      router.push("/");
    } catch (error) {
      window.alert((error as Error).message);
    }
  }
  return (
    <div className="sns_sign flex-set">
      <CommonButton theme="none" size="rg" onClick={LoginHandler}>
        {/* onClick={LoginHandler} */}
        <div className="button_wrap">
          <Image
            src="/images/google.svg"
            width={20}
            height={20}
            alt="구글 로그인"
          />
          <span>구글로 시작하기</span>
        </div>
      </CommonButton>
      <CommonButton theme="none" size="rg">
        <div className="button_wrap">
          <Image
            src="/images/facebook.svg"
            alt="페이스북 로그인"
            width={20}
            height={20}
          />
          <span>페이스북으로 시작하기</span>
        </div>
      </CommonButton>
    </div>
  );
};

export default SocialLoginPage;

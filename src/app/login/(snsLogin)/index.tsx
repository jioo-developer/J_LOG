import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Image from "next/image";
import "./style.scss";
import useGoogleHook from "@/service/apis/login/loginType/google/mutationHandler";

export type objType = {
  id: string;
  name: string;
  service: string;
  pw?: number;
};

const SocialLoginPage = () => {
  const { mutate } = useGoogleHook();
  return (
    <div className="sns_Sign flex-Set">
      <CommonButton theme="none" size="rg" onClick={() => mutate()}>
        <div className="button_Wrap">
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
        <div className="button_Wrap">
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

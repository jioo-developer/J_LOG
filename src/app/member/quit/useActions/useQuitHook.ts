import useQuitMutation from "@/apis/member/quit/useMutation";
import SocialDeleteHandler from "@/app/member/quit/handler/socialquitHandler";
import originDeleteHandler from "@/app/member/quit/handler/originquitHandler";
import { popuprHandler } from "@/utils/popupHandler";
import { InputTypes } from "@/static/types/common";

type propsType = {
  loginType: string;
};

const useQuitHook = ({ loginType }: propsType) => {
  const { mutate: quitHandler } = useQuitMutation();

  const deleteHandler = async (data: InputTypes) => {
    try {
      if (loginType === "social") {
        await SocialDeleteHandler();
      } else {
        await originDeleteHandler(data.passwordRequired);
      }
      quitHandler();
    } catch {
      popuprHandler({ message: "회원 탈퇴에 실패하였습니다" });
    }
  };

  return {
    deleteHandler,
  };
};

export default useQuitHook;

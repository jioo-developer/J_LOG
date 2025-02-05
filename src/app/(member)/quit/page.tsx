"use client";
import deleteUserDB from "@/service/api-hooks/quit/deleteDB";
import originDeleteHandler from "@/service/api-hooks/quit/originquit";
import SocialDeleteHandler from "@/service/api-hooks/quit/socialquit";
import isCredential from "@/service/api-hooks/quit/userCredential/credentialHandler";
import { useQueryClient } from "@tanstack/react-query";
import { deleteUser, User } from "firebase/auth";
import { useState } from "react";

const QuitPage = () => {
  const user = useQueryClient().getQueryData<User>(["getuser"]);
  const [loginType, setType] = useState("");

  async function LogintypeCheck() {
    const Credential = await isCredential(user as User);
    setType(Credential);

    if (Credential === "sosial") {
      //state에 저장
      //   popuprHandler({
      //     message: "회원탈퇴에 사용 될 2차비밀번호를 입력 해주세요",
      //     type: "prompt",
      //     state: setPw,
      //   });
    } else {
      //   popuprHandler({
      //     message: "로그인에 사용 되는 비밀번호를 입력 해주세요",
      //     type: "prompt",
      //     state: setPw,
      //   });
    }
  }

  async function deleteHandler() {
    await deleteUserDB(user);
    try {
      if (loginType === "sosial") {
        await SocialDeleteHandler();
        await deleteUser(user);
        // popupInit();
        // router.push("/pages/login"); // 4. 로그인 페이지로 네비게이션 (비동기 작업이므로 완료 전에 다음 줄로 넘어갈 수 있음)
        // 소셜 로그인 삭제
      } else {
        await originDeleteHandler(quitPw); // 1. `quitPw`를 사용하여 원래 삭제 핸들러 실행
        await deleteUser(user); // 2. 사용자를 Firebase 인증에서 삭제
        // popupInit();
        // router.push("/pages/login"); // 4. 로그인 페이지로 네비게이션 (비동기 작업이므로 완료 전에 다음 줄로 넘어갈 수 있음)
        // 기존 로그인 삭제
      }
    } catch {
      //   popuprHandler({ message: "회원 탈퇴에 실패하였습니다" });
    }
  }

  return (
    <Popup
      type="custom"
      width="28rem;"
      customText="정말로 계정을 삭제 하시겠습니까?"
    >
      <ButtonGroup>
        <Button onClick={() => setQuit(false)}>취소</Button>
        <Button theme="success" onClick={() => LogintypeCheck()}>
          확인
        </Button>
      </ButtonGroup>
    </Popup>
  );
};

export default QuitPage;

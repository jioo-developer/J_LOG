import { popuprHandler } from "@/utils/popupHandler";

export default async function clipboardHanlder() {
  try {
    // 현재 페이지 URL을 가져와 클립보드에 복사합니다.
    await navigator.clipboard.writeText(window.location.href);
    //   popuprHandler({ message: "클립보드에 복사되었습니다" });
  } catch (error) {
    popuprHandler({ message: "클립보드 복사에 실패하였습니다." });
  }
}

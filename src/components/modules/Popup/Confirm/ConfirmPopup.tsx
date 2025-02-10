import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonPopup from "@/components/atoms/CommonPopup/CommonPopup";
import { usePopupStore } from "@/store/popupStore";
import { popupInit } from "@/utils/popupHandler";

const ConfirmPopup = () => {
  return (
    <CommonPopup type="confirm">
      <CommonButton theme="white" onClick={popupInit}>
        취소
      </CommonButton>
      <CommonButton
        theme="success"
        onClick={() => usePopupStore.setState({ isClick: true })}
      >
        확인
      </CommonButton>
    </CommonPopup>
  );
};

export default ConfirmPopup;

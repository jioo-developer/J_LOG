import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import CommonPopup from "@/components/atoms/CommonPopup/CommonPopup";
import { usePopupStore } from "@/store/popupStore";

const ConfirmPopup = () => {
  const { setMessage, callback } = usePopupStore();
  return (
    <CommonPopup type="confirm">
      <CommonButton theme="white" onClick={() => setMessage("")}>
        취소
      </CommonButton>
      <CommonButton theme="success" onClick={callback}>
        확인
      </CommonButton>
    </CommonPopup>
  );
};

export default ConfirmPopup;

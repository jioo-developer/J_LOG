import CommonPopup from "@/components/atoms/CommonPopup/CommonPopup";
import ConfirmPopup from "./ConfirmPopup";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";

export default {
  title: "MODULES/ConfirmPopup",
  component: ConfirmPopup,

  tags: ["autodocs"],

  parameters: {
    controls: { expanded: true },
  },
};

export const Default = {
  render: () => (
    <div style={{ position: "relative" }}>
      <CommonPopup type="confirm">
        <div className="button__group">
          <CommonButton theme="white">취소</CommonButton>
          <CommonButton theme="success">확인</CommonButton>
        </div>
      </CommonPopup>
    </div>
  ),
};

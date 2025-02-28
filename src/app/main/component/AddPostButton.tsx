import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { usePageInfoStore } from "@/store/pageInfoStore";
import Image from "next/image";
import Link from "next/link";

const AddButton = () => {
  const { setEditMode } = usePageInfoStore();
  return (
    <div className="add_button_wrap">
      <CommonButton theme="none" onClick={() => setEditMode(false)}>
        <Link href="/edit">
          <Image src="/images/add.svg" width={60} height={60} alt="edit 버튼" />
        </Link>
      </CommonButton>
    </div>
  );
};

export default AddButton;

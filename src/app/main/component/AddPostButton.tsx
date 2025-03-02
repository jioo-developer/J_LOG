/** @jsxImportSource @emotion/react */
import CommonLinkButton from "@/components/atoms/CommonLinkButton/CommonLinkButton";
import { usePageInfoStore } from "@/store/pageInfoStore";
import Image from "next/image";
import Link from "next/link";
import { addButton } from "../style";

const AddButton = () => {
  const { setEditMode } = usePageInfoStore();
  return (
    <div css={addButton}>
      <CommonLinkButton padding="none" onClick={() => setEditMode(false)}>
        <Link href="/edit">
          <Image src="/images/add.svg" width={60} height={60} alt="edit 버튼" />
        </Link>
      </CommonLinkButton>
    </div>
  );
};

export default AddButton;

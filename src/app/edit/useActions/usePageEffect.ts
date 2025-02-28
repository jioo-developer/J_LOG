import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { imageInfo } from "../Client";
import { useEditDetailStore } from "@/app/updateEditor/store";

export const usePageEffect = (
  checkRef: React.RefObject<HTMLInputElement>,
  setImage: React.Dispatch<React.SetStateAction<imageInfo>>,
  imageInfoArray: imageInfo
) => {
  const pathName = usePathname();
  const { checked } = useEditDetailStore();

  useEffect(() => {
    if (pathName !== "/edit") {
      if (checked && checkRef.current) {
        checkRef.current.checked = true;
      }
      setImage(imageInfoArray); // imageInfoArray로 상태 설정
    }
  }, [pathName, checked, imageInfoArray, setImage]);
};

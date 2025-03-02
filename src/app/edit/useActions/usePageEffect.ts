import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useEditDetailStore } from "@/app/updateEditor/store";

export const usePageEffect = (checkRef: React.RefObject<HTMLInputElement>) => {
  const pathName = usePathname();
  const { checked } = useEditDetailStore();

  useEffect(() => {
    if (pathName !== "/edit") {
      if (checked && checkRef.current) {
        checkRef.current.checked = true;
      }
    }
  }, [pathName, checked]);
};

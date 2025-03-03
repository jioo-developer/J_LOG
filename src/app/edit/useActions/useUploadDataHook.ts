import { useEffect, useState } from "react";
import { imageInfo, uploaderType } from "../Client";
import { useEditDetailStore } from "@/app/updateEditor/store";

export const useUploadDataHandler = () => {
  const { imageInfo } = useEditDetailStore();
  const [imageInfoArray, setImage] = useState<imageInfo>({
    url: [],
    files: [],
    fileName: [],
  });

  useEffect(() => {
    if (imageInfo.url.length > 0) {
      setImage(imageInfo);
    }
  }, [imageInfo.url]);

  const getUploadDataHandler = ({
    url,
    files,
    fileName,
    isDelete = false,
  }: uploaderType) => {
    if (isDelete) {
      setImage({
        url,
        files,
        fileName,
      });
    } else {
      setImage((prev) => ({
        url: [...prev.url, ...url],
        files: [...prev.files, ...files],
        fileName: [...prev.fileName, ...fileName],
      }));
    }
  };

  return { imageInfoArray, setImage, getUploadDataHandler };
};

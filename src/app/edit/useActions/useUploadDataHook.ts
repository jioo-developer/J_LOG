import { useState } from "react";
import { imageInfo, uploaderType } from "../Client";

export const useUploadDataHandler = () => {
  const [imageInfoArray, setImage] = useState<imageInfo>({
    url: [],
    files: [],
    fileName: [],
  });

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

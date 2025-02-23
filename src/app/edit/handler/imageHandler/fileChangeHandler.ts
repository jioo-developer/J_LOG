import { popuprHandler } from "@/utils/popupHandler";
import { ChangeEvent } from "react";

export function fileNameHandler(files: File[]) {
  return files.map((value: File) => value.name).filter((item) => item !== "");
}

export const LoadImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files || [];
  if (files.length > 0) {
    const files = Array.from(e.target.files as FileList);
    try {
      return await onFileChange(files);
    } catch (error) {
      popuprHandler({ message: (error as Error).message });
    }
  }
};

export async function onFileChange(files: File[]) {
  if (files.length > 0) {
    const result = await Promise.all(
      files.map((item: File) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          // load
          reader.readAsDataURL(item);
          // create
          reader.onloadend = (e) => {
            // end
            const resultItem = e.target as FileReader;
            if (resultItem) {
              const dataURL = resultItem.result as string;
              resolve(dataURL);
            } else {
              reject(false);
            }
          };
        });
      })
    );
    return { result, files };
  } else {
    throw new Error("유효한 파일이 없습니다.");
  }
}

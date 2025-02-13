import { storageService } from "@/lib/firebase";
import { popuprHandler } from "@/utils/popupHandler";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type PropsType = {
  user: string;
  image: string[];
  file: File[];
};

export async function CreateImgUrl({ user, image, file }: PropsType) {
  const isMatch = image.filter((item) => {
    return item.match(/data:image\/(png|jpg|jpeg|gif|bmp);base64/);
  });

  try {
    const imageResult = await storageUploader(user, isMatch, file);
    const newUrl = imageResult.filter((item) => item !== undefined);
    const oldUrl = image.filter((item) => item.includes("firebase"));
    const result = [...oldUrl, ...newUrl];
    return result;
  } catch (error) {
    // 오류 처리
    popuprHandler({ message: (error as Error).message });
  }
}

export async function storageUploader(
  user: string,
  imageurl: string | string[],
  fileData: File[]
) {
  try {
    if (fileData.length > 0) {
      return await Promise.all(
        fileData.map(async (item, index) => {
          const fileRef = ref(storageService, `${user}/${item.name}`);
          const response = await uploadString(
            fileRef,
            imageurl[index],
            "data_url"
          );
          return await getDownloadURL(response.ref);
        })
      );
    } else {
      return [];
    }
  } catch (error) {
    // 오류 처리
    throw new Error("파일 업로드 중 오류가 발생했습니다. 다시 시도해보세요");
  }
}

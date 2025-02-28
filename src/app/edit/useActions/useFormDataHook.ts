import { User } from "firebase/auth";
import { imageInfo, InputType } from "../Client";
import { CreateImgUrl } from "../handler/imageHandler/storageUploadHandler";
import createHandler from "../handler/postHandler/useCreateHandler";

export const useFormDataHandler = (
  imageInfoArray: imageInfo,
  user: User | null,
  pageId: string,
  checkRef: React.RefObject<HTMLInputElement>
) => {
  const getFormDataHandler = async (data: InputType) => {
    const newData = { title: data.titleRequired, text: data.contentRequired };
    const PriortyChecked = !!checkRef.current?.checked;

    const returnImageUrl = await CreateImgUrl({
      user: (user as User).uid,
      image: imageInfoArray.url,
      file: imageInfoArray.files,
    });

    const content = createHandler({
      formData: newData,
      imageInfo: returnImageUrl,
      refValue: PriortyChecked,
      fileName: imageInfoArray.fileName,
      pageId,
    });

    return content;
  };

  return { getFormDataHandler };
};

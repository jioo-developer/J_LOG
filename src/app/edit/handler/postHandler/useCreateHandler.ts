import useCreateMutation from "@/apis/edit/useMutationHandler";
import { usePageInfoStore } from "@/store/pageInfoStore";
import { QueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { CreateImgUrl } from "../imageHandler/storageUploadHandler";
import { contentDataHandler } from "./useSetDataHandler";
import { imageInfo } from "../../Client";

type propsType = {
  formData: { title: string; text: string };
  imageInfoArray: imageInfo;
  refValue: boolean;
};

export default async function useCreateHandler({
  formData,
  imageInfoArray,
  refValue,
}: propsType) {
  const queryClient = new QueryClient();
  const user = queryClient.getQueryData<User>(["getuser"]) || null;

  const { mutate } = useCreateMutation();
  const { pgId: pageId } = usePageInfoStore();

  const lastImageUrl = await CreateImgUrl({
    user: user?.uid as string,
    image: imageInfoArray.url,
    file: imageInfoArray.files,
  });
  if (lastImageUrl) {
    const data = contentDataHandler({
      formData,
      pageId,
      checked: refValue,
      imageInfo: lastImageUrl as string[],
      fileName: imageInfoArray.fileName,
      user: user as User,
    });

    mutate({ data, pageId });
  }
}

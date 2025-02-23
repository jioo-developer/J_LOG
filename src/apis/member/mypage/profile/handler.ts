import { storageUploader } from "@/app/edit/handler/imageHandler/storageUploadHandler";

type propsType = {
  user: string;
  url: string[];
  files: File[];
};

export async function profileHandler({ user, url, files }: propsType) {
  const uploadUrl = await storageUploader(user, url, files);
  return uploadUrl[0];
}

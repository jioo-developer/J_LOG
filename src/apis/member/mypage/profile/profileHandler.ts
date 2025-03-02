import { storageUploader } from "@/app/edit/handler/imageHandler/storageUploadHandler";
import { authService } from "@/lib/firebase";
import { updateProfile, User } from "firebase/auth";

type propsType = {
  user: User;
  url: string[];
  files: File[];
};

export default async function profileHandler({ user, url, files }: propsType) {
  const currentUser = authService.currentUser as User;
  const response = await storageUploader(user.uid, url, files);
  const responseUrl = response[0]; // profile은 단일 array이기 때문에 [0]를 써줌
  await updateProfile(currentUser, {
    photoURL: responseUrl,
  });
  return responseUrl;
}

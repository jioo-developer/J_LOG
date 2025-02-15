import usePageDeleteMutation from "@/apis/detail/action/delete/useMutation";
import { storageService } from "@/lib/firebase";
import { FirebaseData } from "@/static/types/common";
import { popuprHandler } from "@/utils/popupHandler";
import { deleteObject, ref } from "firebase/storage";

export function usePageDeleteHandler(pageData: FirebaseData) {
  popuprHandler({
    message: "정말로 해당 글을 삭제하시겠습니까?",
    type: "confirm",
    callback: () => useNextDeleteLogic(pageData),
  });
}

async function useNextDeleteLogic(pageData: FirebaseData) {
  const { mutate } = usePageDeleteMutation();

  const files = pageData.fileName;
  const writer = pageData.writer;

  if (files.length > 0) {
    await Promise.all(
      files.map(async (item: string) => {
        const imageRef = ref(storageService, `${writer}/${item}`);
        await deleteObject(imageRef);
      })
    );
    mutate(pageData.writer);
  }
}

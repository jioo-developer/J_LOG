import { storageService } from "@/lib/firebase";
import { popuprHandler } from "@/utils/popupHandler";
import { UseMutateFunction } from "@tanstack/react-query";
import { deleteObject, ref } from "firebase/storage";

type propsType = {
  data: { writer: string; fileName: string[]; pageId: string };
  mutate: UseMutateFunction<Response, Error, string, unknown>;
};

export function askDeleteHandler({ data, mutate }: propsType) {
  popuprHandler({
    message: "정말로 해당 글을 삭제하시겠습니까?",
    type: "confirm",
    callback: () => nextDeleteLogic({ data, mutate }),
  });
}

async function nextDeleteLogic({ data, mutate }: propsType) {
  const files = data.fileName;
  const writer = data.writer;
  const pageId = data.pageId;

  if (files.length > 0) {
    await Promise.all(
      files.map(async (item: string) => {
        const imageRef = ref(storageService, `${writer}/${item}`);
        await deleteObject(imageRef);
      })
    );
  }
  mutate(pageId);
}

/** @jsxImportSource @emotion/react */
"use client";
import "./Style.scss";
import InputForm from "./components/InputForm/InputForm";
import Uploader from "./components/uploader/Uploader";
import PriortyChecker from "./components/PriortyChecker/PriortyChecker";
import { useEffect, useRef, useState } from "react";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEditDetailStore } from "../updateEditor/store";
import useCreateMutation from "@/apis/edit/useMutationHandler";
import { usePageInfoStore } from "@/store/pageInfoStore";
import { CreateImgUrl } from "./handler/imageHandler/storageUploadHandler";
import { User } from "firebase/auth";
import createHandler from "./handler/postHandler/useCreateHandler";
import useUserQueryHook from "@/apis/login/query/useGetUserQuery";

export type InputType = {
  titleRequired: string;
  contentRequired: string;
};

export type imageInfo = {
  url: string[];
  fileName: string[];
  files: File[];
};

export interface uploaderType extends imageInfo {
  isDelete?: boolean;
}

function EditPage() {
  const pathName = usePathname();
  const checkRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [imageInfoArray, setImage] = useState<imageInfo>({
    url: [],
    files: [],
    fileName: [],
  });
  const { data: user } = useUserQueryHook();
  const { pgId: pageId } = usePageInfoStore();
  const { checked, imageInfo } = useEditDetailStore();
  const { mutate } = useCreateMutation();

  useEffect(() => {
    if (pathName !== "/edit") {
      if (checked && checkRef.current) {
        checkRef.current.checked = true;
      }
      setImage(imageInfo);
    }
  }, [pathName, checked, imageInfo, setImage]);

  function getUploadDataHandler({
    url,
    files,
    fileName,
    isDelete = false,
  }: uploaderType) {
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
  }

  async function getFormDataHander(data: InputType) {
    const newData = { title: data.titleRequired, text: data.contentRequired };
    const PriortyChecked = !!checkRef.current?.checked;

    const returnImageUrl = await CreateImgUrl({
      user: (user as User).uid,
      image: imageInfoArray.url,
      file: imageInfoArray.files,
    });

    // image url 최종 return 함수수

    const content = createHandler({
      formData: newData,
      imageInfo: returnImageUrl,
      refValue: PriortyChecked,
      fileName: imageInfoArray.fileName,
      pageId,
    });
    if (content) {
      mutate({ data: content, pageId });
    }
  }

  return (
    <div className="upload">
      <InputForm formHandler={getFormDataHander} ref={formRef} />
      <PriortyChecker ref={checkRef} />
      <Uploader data={imageInfoArray} setImageHandler={getUploadDataHandler} />
      <div className="bottom_wrap flex-Set">
        <div className="box_wrap">
          <CommonButton theme="none" size="rg">
            <Link href="/">← &nbsp;나가기</Link>
          </CommonButton>
        </div>
        <div className="box_wrap">
          <CommonButton
            theme="success"
            type="submit"
            size="rg"
            onClick={() => {
              if (formRef && formRef.current) {
                formRef.current.requestSubmit();
              }
            }}
          >
            글작성
          </CommonButton>
        </div>
      </div>
    </div>
  );
}

export default EditPage;

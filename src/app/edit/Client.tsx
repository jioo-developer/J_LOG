"use client";
import "./Style.scss";
import { useRef } from "react";
import InputForm from "./components/InputForm/InputForm";
import Uploader from "./components/uploader/Uploader";
import PriortyChecker from "./components/PriortyChecker/PriortyChecker";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Link from "next/link";
import { usePageInfoStore } from "@/store/pageInfoStore";
import useCreateMutation from "@/apis/edit/useMutationHandler";
import useUserQueryHook from "@/apis/login/query/useGetUserQuery";
import { useUploadDataHandler } from "./useActions/useUploadDataHook";
import { useFormDataHandler } from "./useActions/useFormDataHook";
import { usePageEffect } from "./useActions/usePageEffect";
import CommonLinkButton from "@/components/atoms/CommonLinkButton/CommonLinkButton";

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
  const checkRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { data: user } = useUserQueryHook();
  const { pgId: pageId } = usePageInfoStore();
  const { mutate } = useCreateMutation();

  const { imageInfoArray, getUploadDataHandler } = useUploadDataHandler();

  const { getFormDataHandler } = useFormDataHandler(
    imageInfoArray,
    user,
    pageId,
    checkRef
  );
  usePageEffect(checkRef);

  const handleSubmitForm = async (data: InputType) => {
    const content = await getFormDataHandler(data);
    if (content) {
      mutate({ data: content, pageId });
    }
  };

  return (
    <div className="upload">
      <InputForm formHandler={handleSubmitForm} ref={formRef} />
      <PriortyChecker ref={checkRef} />
      <Uploader data={imageInfoArray} setImageHandler={getUploadDataHandler} />
      <div className="bottom_wrap flex-Set">
        <div className="box_wrap">
          <CommonLinkButton size="rg">
            <Link href="/">← &nbsp;나가기</Link>
          </CommonLinkButton>
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

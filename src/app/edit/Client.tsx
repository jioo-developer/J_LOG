/** @jsxImportSource @emotion/react */
"use client";
import "./Style.scss";
import InputForm from "./components/InputForm/InputForm";
import Uploader from "./components/uploader/Uploader";
import PriortyChecker from "./components/PriortyChecker/PriortyChecker";
import { useEffect, useRef, useState } from "react";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Link from "next/link";
import useCreateHandler from "./handler/postHandler/useCreateHandler";
import { usePathname } from "next/navigation";
import { useEditDetailStore } from "../detail/updateEdit/store";

export type InputType = {
  titleRequired: string;
  contentRequired: string;
};

export type imageInfo = {
  url: string[];
  fileName: string[];
  files: File[];
};

function EditPage() {
  const pathName = usePathname();
  const checkRef = useRef<HTMLInputElement | null>(null);
  const [imageInfoArray, setImage] = useState<imageInfo>({
    url: [],
    files: [],
    fileName: [],
  });

  const { checked, imageInfo } = useEditDetailStore();

  useEffect(() => {
    if (pathName !== "/edit") {
      if (checked && checkRef.current) {
        checkRef.current.checked = true;
      }
      setImage(imageInfo);
    }
  }, [pathName]);

  function getUploadDataHandler({ url, files, fileName }: imageInfo) {
    setImage((prev) => ({
      url: [...prev.url, ...url],
      files: [...prev.files, ...files],
      fileName: [...prev.fileName, ...fileName],
    }));
  }

  function getFormDataHander(data: InputType) {
    const newData = { title: data.titleRequired, text: data.contentRequired };
    const PriortyChecked = !!checkRef.current?.checked;

    useCreateHandler({
      formData: newData,
      imageInfoArray,
      refValue: PriortyChecked,
    });
  }

  return (
    <div className="upload">
      <InputForm
        imageUrl={imageInfoArray.url}
        formHandler={getFormDataHander}
      />
      <PriortyChecker ref={checkRef} />
      <Uploader data={imageInfoArray} setImageHandler={getUploadDataHandler} />
      <div className="bottom_wrap flex-Set">
        <div className="box_wrap">
          <CommonButton theme="none" size="rg">
            <Link href="/">← &nbsp;나가기</Link>
          </CommonButton>
        </div>
        <div className="box_wrap">
          <CommonButton theme="success" type="submit" size="rg">
            글작성
          </CommonButton>
        </div>
      </div>
    </div>
  );
}

export default EditPage;

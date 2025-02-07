/** @jsxImportSource @emotion/react */
"use client";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import "./Style.scss";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import ReactTextareaAutosize from "react-textarea-autosize";
import { inputStyle } from "@/components/atoms/CommonInput/CommonInputStyle";
type formType = {
  titleRequired: string;
  contentRequired: string;
};

function EditorPage() {
  const [checked, setChecked] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>();
  return (
    <div className="upload flex-Set">
      <form role="form">
        <CommonInput
          id="titleRequired"
          placeholder="제목을 입력해주세요"
          register={register}
          validation={{
            required: "제목을 입력해주세요",
          }}
          error={errors.titleRequired}
        />
        <div className="textarea">
          <ReactTextareaAutosize
            cacheMeasurements
            onHeightChange={(height) => {}}
            css={inputStyle}
            className="text"
            autoComplete="off"
            minRows={1}
            id="contentRequired"
            placeholder="내용을 입력해주세요"
          />
          <figure>
            {/* {previewImg.length > 0 &&
            previewImg.map((url, index) => (
              <div key={index}>
                <button
                  type="button"
                  className="preview_delete"
                  data-testid="delete-button"
                  // onClick={() => {
                  //   const array = { image: previewImg, file: fileName };
                  //   const result = ImageDeleteHandler({
                  //     array,
                  //     fileIndex: index,
                  //   });
                  //   setPreview(result.image);
                  //   setName(result.files);
                  // }}
                >
                  <img src="/img/close.png" alt="" />
                </button>
                <img src={url} alt="" className="att" key={index} />
              </div>
            ))} */}
          </figure>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="file-form"
          id="image"
          // onChange={async (e) => {
          //   const { result, files } = await LoadImageHandler(e);
          //   if (result) {
          //     setPreview(result);
          //     setFile(files);
          //   }
          // }}
        />
        <label htmlFor="image" className="Attachment flex-Set image-att">
          이미지를 담아주세요
        </label>
        <div className="use__item flex-Set">
          <CommonCheckbox
            stateValue={checked}
            setStateHandler={setChecked}
            // onChange={(e) => {
            //   isCheckHandler(e);
            // }}
          />
          <label htmlFor="use__Check" className="check">
            <p>노출 우선권 사용하기</p>
          </label>
        </div>
        <div className="bottom_wrap flex-Set">
          <button className="exit">
            {/* onClick={() => router.back()} */}← &nbsp;나가기
          </button>
          <div className="cancel_wrap">
            <CommonButton type="submit" theme="success">
              글작성
            </CommonButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditorPage;

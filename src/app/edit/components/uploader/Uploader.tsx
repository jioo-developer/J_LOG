import { css } from "@emotion/react";
import Image from "next/image";
import { ChangeEvent } from "react";
import { imageInfo } from "../../Client";
import {
  LoadImageHandler,
  fileNameHandler,
} from "../../handler/imageHandler/fileChangeHandler";
import ImageDeleteHandler from "../../handler/imageHandler/uploadImageDeleteHandler";

// propsType 타입 정의
type propsType = {
  data: imageInfo;
  setImageHandler: ({ url, files, fileName }: imageInfo) => void;
};

function Uploader({ data, setImageHandler }: propsType) {
  // change event;
  async function ChangeFileHandler(e: ChangeEvent<HTMLInputElement>) {
    const response = await LoadImageHandler(e);
    if (response) {
      const fileName = fileNameHandler(response.files);
      setImageHandler({
        url: response.result,
        files: response.files,
        fileName,
      });
    }
  }
  // change event;

  // image delete event;
  function DeleteImageHanlder(index: number) {
    const result = ImageDeleteHandler({
      array: data,
      fileIndex: index,
    });
    setImageHandler({
      url: result.url,
      files: result.files,
      fileName: result.fileName,
    });
  }
  // image delete event;

  return (
    <>
      {data.url.length > 0 && (
        <div className="uploaded-Image">
          {data.url.map((item, index) => {
            return (
              <>
                {/* <button
                type="button"
                className="preview_delete"
                data-testid="delete-button"
                onClick={() => DeleteImageHanlder(index)}
              >
                <img src="/images/close.png" alt="" />
              </button> */}
                <div className="image_wrap">
                  <Image
                    src={item}
                    layout="fill"
                    objectFit="cover"
                    key={index}
                    alt="업로드 된 이미지"
                  />
                </div>
              </>
            );
          })}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        className="file-form"
        id="image"
        onChange={(e: ChangeEvent<HTMLInputElement>) => ChangeFileHandler(e)}
      />
      <label htmlFor="image" className="Attachment flex-Set" css={Attachment}>
        이미지를 담아주세요
      </label>
    </>
  );
}

export default Uploader;

export const Attachment = css`
  width: 100%;
  height: 170px;
  border: 4px dotted #ddd;
  box-sizing: border-box;
  color: gray;
  border-radius: 5px;
  margin-bottom: 30px;
  cursor: pointer;

  @media #{$breakpoint-mobile} {
    height: 100px;
  }
`;

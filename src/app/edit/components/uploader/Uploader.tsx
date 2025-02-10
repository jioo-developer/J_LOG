import { css } from "@emotion/react";

function Uploader() {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        className="file-form"
        id="image"
      />
      <label htmlFor="image" className="image-att flex-Set" css={Attachment}>
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

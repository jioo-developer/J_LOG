/** @jsxImportSource @emotion/react */
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { css } from "@emotion/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";

export type textAreaType = {
  textAreaRequired: string;
};

type propsType = {
  submitHandler: (data: any) => void;
  defaultValue?: any;
};

export default function TextAreaComponent({
  submitHandler,
  defaultValue,
}: propsType) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<textAreaType>();

  useEffect(() => {
    if (defaultValue) {
      setValue("textAreaRequired", defaultValue);
    }
  }, [defaultValue]);
  return (
    <form
      role="form"
      css={formWrap}
      onSubmit={handleSubmit((data) => {
        submitHandler(data);
      })}
    >
      <Controller
        control={control}
        name="textAreaRequired"
        rules={{
          required: "내용을 입력해주세요.",
        }} // Validation 규칙
        render={({ field }) => (
          <ReactTextareaAutosize
            css={TextArea}
            {...field}
            id="contentRequired"
            placeholder="내용을 입력해주세요."
            cacheMeasurements
            minRows={1}
            className="text"
          />
        )}
      />
      <div css={buttonWrap}>
        <CommonButton theme="success">댓글 작성</CommonButton>
      </div>
    </form>
  );
}

const formWrap = css`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  gap: 16px;
  margin-top: 20px;
`;

export const TextArea = css`
  width: 100%;
  outline: 0;
  border: 0;
  text-indent: 7px;
  font-size: 18px;
  border: 1px solid #eee;
  box-sizing: border-box;
  min-height: 100px;
  position: relative;
  cursor: inherit;
  resize: none;
  overflow: hidden;
  background: transparent;
  padding: var(--gap-medium) 0 0 Calc(var(--gap-small) * 0.5);
`;

const buttonWrap = css`
  width: 120px;
  margin-left: auto;
`;

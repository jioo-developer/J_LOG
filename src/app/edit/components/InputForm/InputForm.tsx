/** @jsxImportSource @emotion/react */
import { Controller, useForm } from "react-hook-form";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useEffect } from "react";
import { useCreateId } from "@/app/edit/handler/postHandler/usePageId";
import Image from "next/image";
import { usePageInfoStore } from "@/store/pageInfoStore";
import { Form, TextArea } from "./Style";
import { InputType } from "../../Client";

type propsType = {
  imageUrl: string[];
  formHandler: (data: InputType) => void;
};

function InputForm({ imageUrl, formHandler }: propsType) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InputType>();

  const { setPgId } = usePageInfoStore();
  const createId = useCreateId();

  useEffect(() => {
    setPgId(createId);
  }, []);

  return (
    <form role="form" css={Form} onSubmit={handleSubmit(formHandler)}>
      <CommonInput
        id="titleRequired"
        placeholder="제목을 입력해주세요"
        register={register}
        validation={{
          required: "제목을 입력해주세요.",
        }}
        error={errors.titleRequired}
      />
      <div className="textarea">
        <Controller
          control={control}
          name="contentRequired"
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
        {imageUrl.length > 0 &&
          imageUrl.map((url, index) => (
            <Image
              src={url}
              alt="업로드 이미지"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              key={index}
            />
          ))}
      </div>
    </form>
  );
}

export default InputForm;

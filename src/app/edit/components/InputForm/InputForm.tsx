/** @jsxImportSource @emotion/react */
import { Controller, useForm } from "react-hook-form";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import ReactTextareaAutosize from "react-textarea-autosize";
import { forwardRef, useEffect } from "react";
import { useCreateId } from "@/app/edit/handler/postHandler/usePageId";
import { usePageInfoStore } from "@/store/pageInfoStore";
import { Form, TextArea } from "./Style";
import { InputType } from "../../Client";
import { usePathname } from "next/navigation";
import { useEditDetailStore } from "@/app/updateEditor/store";

type propsType = {
  formHandler: (data: InputType) => void;
};

const InputForm = forwardRef<HTMLFormElement, propsType>(
  ({ formHandler }, ref) => {
    const {
      register,
      handleSubmit,
      control,
      setValue,
      formState: { errors },
    } = useForm<InputType>();

    const pathName = usePathname();

    const createId = useCreateId();

    const { formData } = useEditDetailStore();

    const { setPgId } = usePageInfoStore();

    useEffect(() => {
      if (pathName === "/edit") {
        setPgId(createId);
      } else {
        setValue("titleRequired", formData.title);
        setValue("contentRequired", formData.text);
      }
    }, [pathName, formData.title, formData.text, setValue]);

    return (
      <form
        role="form"
        ref={ref}
        css={Form}
        onSubmit={handleSubmit(formHandler)}
      >
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
        </div>
      </form>
    );
  }
);

export default InputForm;

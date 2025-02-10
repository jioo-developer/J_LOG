import { Controller, useForm } from "react-hook-form";
import CommonInput from "@/components/atoms/CommonInput/CommonInput";
import ReactTextareaAutosize from "react-textarea-autosize";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePageInfoStore } from "@/store/common";
import { useCreateId } from "@/apis/edit/useCreatePageId";
import useDetailQueryHook from "@/app/api/detail/useDetailQuery";
import { getDetailHandler } from "@/app/api/detail/getDetailHandler";
import { FirebaseData } from "@/components/type";

type InputType = {
  titleRequired: string;
  contentRequired: string;
};
function InputForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputType>();

  const createId = useCreateId();
  const { editMode, setPgId } = usePageInfoStore();
  const [previewImg, setPreview] = useState<string[]>([]);

  async function getPrevDataHandler() {
    return await getDetailHandler(createId);
    // 그래서 거짓의 값이 없을 경우 타입 단언 적용
  }

  // function ImageDeleteHandler(index: number) {
  //   handler
  //   const array = { image: previewImg };
  //   const result = ImageDeleteHandler({
  //     array,
  //     fileIndex: index,
  //   });
  //   setPreview(result.image);
  //   setName(result.files);
  // }

  useEffect(() => {
    const fetchData = async () => {
      if (!editMode) {
        // editMode가 false이면 새로운 pageId 생성
        setPgId(createId);
      } else {
        const prevData = (await getPrevDataHandler()) as FirebaseData;
        setValue("titleRequired", prevData.title);
        setValue("contentRequired", prevData.text);
        setPreview(prevData.url);
      }
    };

    fetchData();
  }, [editMode]);

  return (
    <form role="form">
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
          name="contentRequired"
          rules={{
            required: "내용을 입력해주세요.",
          }} // Validation 규칙
          render={({ field }) => (
            <ReactTextareaAutosize
              {...field}
              id="contentRequired"
              placeholder="내용을 입력해주세요."
              cacheMeasurements
              minRows={1}
              className="text"
            />
          )}
        />
        <figure>
          {previewImg.map((url, index) => (
            <div key={index}>
              <button
                type="button"
                className="preview_delete"
                data-testid="delete-button"
                // onClick={() => ImageDeleteHandler(index)}
              >
                <img src="/img/close.png" alt="" />
              </button>
              <img src={url} alt="" className="att" key={index} />
            </div>
          ))}
        </figure>
      </div>

      <div className="bottom_wrap flex-Set">
        <CommonButton theme="none" size="rg">
          <Link href="/">← &nbsp;나가기</Link>
        </CommonButton>
        <CommonButton theme="success" type="submit" size="rg">
          글작성
        </CommonButton>
      </div>
    </form>
  );
}

export default InputForm;

import "./Style.scss";
import { FirebaseData } from "@/components/type";
import {
  CreateImgUrl,
  ImageDeleteHandler,
  LoadImageHandler,
} from "@/service/api-hooks/detail/crud/imageCrudHandler";
import setDataHandler from "@/service/api-hooks/detail/crud/setDataHandler";
import useCreateMutation from "@/service/api-hooks/detail/crud/useMutationHandler";
import { useCreateId } from "@/service/api-hooks/detail/pageInfoHandler";
import { usePageInfoStore } from "@/store/common";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const EditorPage = () => {
  const user = useQueryClient().getQueryData<User>(["getuser"]);
  const { pgId: pageInfo, editMode } = usePageInfoStore();

  const { pageData } = useDetailQueryHook(editMode ? pageInfo : "");

  const { CashData } = useCashQueryHook();
  const getData = CashData[0];

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [previewImg, setPreview] = useState<string[]>([]);
  const [file, setFile] = useState<File[]>([]);
  const [fileName, setName] = useState<string[]>([]);
  const [priorty, setPriorty] = useState(false);

  const router = useRouter();
  const createId = useCreateId();
  const postMutate = useCreateMutation();

  const { setPgId } = usePageInfoStore();

  useEffect(() => {
    if (!editMode) {
      setPgId(createId);
      //edit mode가 false이기 때문에 pageid를 새로 구성 = pageData가 없음
    } else {
      // edit mode가 true이기 때문에 이미 pageData가 있음
      const oldData = pageData as FirebaseData;
      // 그래서 거짓의 값이 없을 경우 타입 단언 적용
      setTitle(oldData.title);
      // 이전에 있는 제목
      setText(oldData.text);
      // 이전에 있는 내용
      const imageUrl = oldData.url;
      setPreview(imageUrl);

      setName(oldData.fileName);
      // 이전에 있는 이미지
    }
  }, [editMode, pageData]);

  async function imageUrl() {
    const oldData = editMode ? (pageData as FirebaseData) : { url: [] };
    if (previewImg === oldData.url || file.length === 0) {
      return previewImg;
    } else {
      return await CreateImgUrl({
        image: previewImg,
        file,
        isEdit: editMode,
      });
    }
  }

  const fileNameHandler = () => {
    if (editMode) {
      return fileName;
    } else {
      return file
        .map((value: File) => value.name)
        .filter((item) => item !== "");
    }
  };

  // image url 생성 함수

  // 게시글 생성 및 수정 함수
  async function CreateHandler() {
    const content = {
      title,
      text,
      fileName: fileNameHandler(),
      pageId: pageInfo,
      url: previewImg.length === 0 ? previewImg : await imageUrl(),
      priority: priorty,
    };
    // 게시글 수정 일 때
    if (editMode) {
      const obj = { ...(pageData as FirebaseData) };
      const resultObj = Object.assign(obj, content);
      await postMutate.mutateAsync({ data: resultObj, pageId: pageInfo });
    } else {
      // 게시글 생성 일 때
      const addContent = setDataHandler(content);
      await postMutate.mutateAsync({ data: addContent, pageId: pageInfo });
    }
  }

  const isCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (getData.item > 0) {
      setPriorty(e.target.checked);
    } else {
      popuprHandler({
        message: "아이템을 보유 하고 있지 않습니다, 구매하러 가시겠습니까?",
        type: "confirm",
      });
      e.target.checked = false;
    }
  };

  return (
    <div className="upload">
      <form
        role="form"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          if (title !== "" && text !== "" && user) {
            CreateHandler();
          }
        }}
      >
        <Input type="text" value={title} setstate={setTitle} />
        <div className="textarea">
          <ReactTextareaAutosize
            cacheMeasurements
            onHeightChange={(height) => {}}
            className="text"
            autoComplete="off"
            minRows={1}
            defaultValue={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setText(e.target.value);
            }}
          />
          <figure>
            {previewImg.length > 0 &&
              previewImg.map((url, index) => (
                <div key={index}>
                  <button
                    type="button"
                    className="preview_delete"
                    data-testid="delete-button"
                    onClick={() => {
                      const array = { image: previewImg, file: fileName };
                      const result = ImageDeleteHandler({
                        array,
                        fileIndex: index,
                      });
                      setPreview(result.image);
                      setName(result.files);
                    }}
                  >
                    <img src="/img/close.png" alt="" />
                  </button>
                  <img src={url} alt="" className="att" key={index} />
                </div>
              ))}
          </figure>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="file-form"
          id="image"
          onChange={async (e) => {
            const { result, files } = await LoadImageHandler(e);
            if (result) {
              setPreview(result);
              setFile(files);
            }
          }}
        />
        <label htmlFor="image" className="Attachment flex-Set image-att">
          이미지를 담아주세요
        </label>
        <div className="use__item">
          <input
            type="checkbox"
            className="eachCheckbox"
            id="use__Check"
            onChange={(e) => {
              isCheckHandler(e);
            }}
          />
          <label htmlFor="use__Check" className="check">
            <p>노출 우선권 사용하기</p>
          </label>
        </div>
        <div className="bottom_wrap flex-Set">
          <button className="exit" onClick={() => router.back()}>
            ← &nbsp;나가기
          </button>
          <div className="cancel_wrap">
            <button type="submit" className="post">
              글작성
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditorPage;

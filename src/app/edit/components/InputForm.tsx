function InputForm() {
  const postMutate = useCreateMutation();

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

  return (
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
      <label htmlFor="image" className="Attachment image-att">
        이미지를 담아주세요
      </label>
    </form>
  );
}

export default InputForm;

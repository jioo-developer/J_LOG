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
    formReset();
  } else {
    // 게시글 생성 일 때
    const addContent = setDataHandler(content);
    await postMutate.mutateAsync({ data: addContent, pageId: pageInfo });
    formReset();
  }
}

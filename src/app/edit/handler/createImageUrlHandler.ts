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

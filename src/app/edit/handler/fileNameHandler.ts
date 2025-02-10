const fileNameHandler = () => {
  if (editMode) {
    return fileName;
  } else {
    return file.map((value: File) => value.name).filter((item) => item !== "");
  }
};

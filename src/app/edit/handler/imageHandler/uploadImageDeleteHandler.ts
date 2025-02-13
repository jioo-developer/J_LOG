type propsType = {
  array: { url: string[]; files: File[]; fileName: string[] };
  fileIndex: number;
};

export default function ImageDeleteHandler({ array, fileIndex }: propsType): {
  url: string[];
  files: File[];
  fileName: string[];
} {
  const { url, files, fileName } = array;

  const filterArray = (arr: any[]) =>
    arr.filter((_, index) => index !== fileIndex);

  return {
    url: filterArray(url),
    files: filterArray(files),
    fileName: filterArray(fileName),
  };
}

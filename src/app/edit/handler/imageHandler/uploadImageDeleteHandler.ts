type propsType = {
  array: { url: string[]; fileName: string[] };
  fileIndex: number;
};

export default function ImageDeleteHandler({ array, fileIndex }: propsType): {
  url: string[];
  fileName: string[];
} {
  const { url, fileName } = array;

  const filterArray = (arr: any[]) =>
    arr.filter((_, index) => index !== fileIndex);

  return {
    url: filterArray(url),
    fileName: filterArray(fileName),
  };
}

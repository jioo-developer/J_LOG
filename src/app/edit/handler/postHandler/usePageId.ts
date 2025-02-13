export const useCreateId = () => {
  let newPageId = createId(20);
  if (newPageId) {
    newPageId = createId(20);
    return newPageId;
  } else {
    return newPageId;
  }
};

const createId = (num: number) => {
  const words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (var i = 0; i < num; i++)
    result += words.charAt(Math.floor(Math.random() * words.length));
  return result;
};

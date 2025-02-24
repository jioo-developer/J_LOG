type ResponseData = {
  isToken: boolean; // 응답 객체에 isToken 프로퍼티가 있다
};

export async function getTokenHandler() {
  const response = await fetch(`/api/common/token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { isToken }: ResponseData = await response.json();

  return isToken;
}

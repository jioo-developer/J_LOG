import { apiUrl } from "@/static/constants/common";

type propsType = {
  user: string;
  pageId: string;
};

export async function getIsFavoriteHandler({ user, pageId }: propsType) {
  const response = await fetch(`${apiUrl}/api/detail/favorite`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, pageId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response;
}

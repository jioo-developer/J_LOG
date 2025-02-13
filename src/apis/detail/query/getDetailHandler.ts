import { apiUrl } from "@/static/constants/common";

export const getDetailHandler = async (pageId: string) => {
  const response = await fetch(`${apiUrl}/api/detail`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pageId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { data } = await response.json();
  return data;
};

import { apiUrl } from "@/static/constants/common";

type propsType = {
  value: number;
  id: string;
  user: string;
};

export async function HandleFavorite({ value, id, user }: propsType) {
  const response = await fetch(`${apiUrl}/api/detail/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value, id, user }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response;
}

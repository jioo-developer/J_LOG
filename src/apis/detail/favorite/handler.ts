import { apiUrl } from "@/static/constants/common";

type propsType = {
  value: number;
  id: string;
};

export async function HandleFavorite({ value, id }: propsType) {
  const response = await fetch(`${apiUrl}/api/detail/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value, id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response;
}

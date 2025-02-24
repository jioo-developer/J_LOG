type propsType = {
  value: number;
  id: string;
  user: string;
};

export async function HandleFavorite({ value, id, user }: propsType) {
  const response = await fetch(`/api/detail/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value, id, user }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response;
}

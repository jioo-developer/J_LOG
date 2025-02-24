export async function getPostHandler() {
  const response = await fetch(`/api/main`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { postdata } = await response.json();
  return postdata;
}

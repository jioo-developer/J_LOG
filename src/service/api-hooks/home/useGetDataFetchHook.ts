import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { FirebaseData } from "@/components/type";

import { apiUrl } from "@/static/common";

export async function getPostData() {
  const response = await fetch(`${apiUrl}/api/home`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response.json() + "response 결과");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}

const usePostQueryHook = () => {
  const { data, isLoading, error }: QueryObserverResult<FirebaseData[], Error> =
    useQuery({
      queryKey: ["getPost"],
      queryFn: getPostData,
      staleTime: 1 * 60 * 1000, // 1분
    });

  let postData = data ? data : [];

  console.log("hook 콘솔" + data);

  // if (postData.length > 0) {
  //   const filterPriority = postData.filter((item) => item.priority);
  //   const nonePriority = postData.filter((item) => !item.priority);
  //   const result = [...filterPriority, ...nonePriority];
  //   postData = result;
  // } else {
  //   postData = [];
  // }
  return { postData, isLoading, error };
};

export default usePostQueryHook;

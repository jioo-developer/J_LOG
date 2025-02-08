import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { FirebaseData } from "@/components/type";
import { getPostHandler } from "./getPostHanlder";

const usePostQueryHook = () => {
  const { data, isLoading, error }: QueryObserverResult<FirebaseData[], Error> =
    useQuery({
      queryKey: ["getPost"],
      queryFn: getPostHandler,
      staleTime: 1 * 60 * 1000, // 1분
    });

  let postData = data ? data : [];

  if (postData.length > 0) {
    const filterPriority = postData.filter((item) => item.priority);
    const nonePriority = postData.filter((item) => !item.priority);
    const result = [...filterPriority, ...nonePriority];
    postData = result;
  } else {
    postData = [];
  }
  return { postData, isLoading, error };
};

export default usePostQueryHook;

import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Header from "./Header/Header";
import { getuser } from "@/service/apis/login/hook/getuserHook";

// 비동기 함수에서 데이터 로딩
const HydratedCarDetails = async () => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["getUser"],
      queryFn: getuser,
    });
  } catch (error) {
    window.alert((error as Error).message);
  }

  const dehydratedState = queryClient.getQueryData(["getUser"]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Header />
    </HydrationBoundary>
  );
};

export default HydratedCarDetails;

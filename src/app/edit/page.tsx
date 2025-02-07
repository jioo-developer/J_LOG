import ClientComponent from "./Client";

// import { getDetailHandler } from "@/service/detail/hook/useGetDetaillHook";
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
// import { NextRequest } from "next/server";
// export default async function MarketServerComponent() {
//   const queryClient = new QueryClient();
//   const id = request.nextUrl.pathname.split("/").pop();

//   await queryClient.prefetchQuery({
//     queryKey: ["getDetail"],
//     queryFn: () => getDetailHandler(id as string),
//   });

//   const dehydratedState = dehydrate(queryClient);
//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <ClientComponent />
//     </HydrationBoundary>
//   );
// }

export default function () {
  return <ClientComponent />;
}

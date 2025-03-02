import { mockMyData } from "./util";
import useMyDataQueryHook from "@/apis/member/myboard/query/useGetMyPostQuery";
import MyBoardPage from "@/app/member/myboard/Client";
import { popuprHandler } from "@/utils/popupHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, act } from "@testing-library/react";

jest.mock("@/apis/login/query/useGetUserQuery", () => ({
  __esModule: true, // ES 모듈로 인식
  default: jest.fn().mockReturnValue({
    data: { uid: "테스터" }, // 기본 테스트 데이터
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/apis/member/myboard/query/useGetMyPostQuery", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    myData: undefined, // 빈 데이터
    isLoading: false,
    error: null,
  }),
}));

describe("My Board 페이지가 정상적으로 랜더링 되는 지 테스트 합니다. ", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("작성한 글이 존재하지 않을 때 팝업이 정상적으로 출력 되는지 테스트 합니다", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MyBoardPage />
      </QueryClientProvider>
    );
    expect(popuprHandler).toHaveBeenCalledWith({
      message: "작성한 게시글이 없습니다.",
    });
  });

  test("페이지 데이터가 있을 때 데이터가 랜더링 되는 지 테스트 합니다", async () => {
    (useMyDataQueryHook as jest.Mock).mockReturnValue({
      myData: mockMyData,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MyBoardPage />
        </QueryClientProvider>
      );
    });

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });
});

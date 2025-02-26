import { act, render, screen, waitFor } from "@testing-library/react";
import { useSearchStore } from "@/store/searchStore";
import { popuprHandler } from "@/utils/popupHandler";
import mockPostData from "./utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "@/app/main/Client";

jest.mock("@/apis/main/query/useGetQuery", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    postData: mockPostData,
  }),
}));

jest.mock("@/utils/popupHandler", () => ({
  popuprHandler: jest.fn(),
}));

const queryClient = new QueryClient();

describe("", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await act(() => {
      render(
        <QueryClientProvider client={queryClient}>
          <MainPage />
        </QueryClientProvider>
      );
    });
  });

  test("MainPage가 정상적으로 렌더링되는 지 테스트 합니다", () => {
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Another test post.")).toBeInTheDocument();
  });

  test("검색 결과가 있을 때 결과를 정상 적으로 출력 하는 지 테스트 합니다", async () => {
    await act(async () => {
      useSearchStore.setState({ searchText: "This is a test post." });
    });

    // 상태가 ""로 변경되었을 때 router.push가 호출되는지 확인
    await waitFor(() => {
      const currentState = useSearchStore.getState();
      expect(currentState.searchText).toBe("This is a test post.");
    });

    expect(screen.getByText("This is a test post.")).toBeInTheDocument();
    expect(screen.queryByText("Another test post.")).not.toBeInTheDocument();
  });

  test("검색 결과가 없을 때 팝업 메시지가 표시되는 지 테스트 합니다", async () => {
    await act(async () => {
      useSearchStore.setState({ searchText: "xxx" });
    });

    // 상태가 ""로 변경되었을 때 router.push가 호출되는지 확인
    await waitFor(() => {
      const currentState = useSearchStore.getState();
      expect(currentState.searchText).toBe("xxx");
    });
    expect(popuprHandler).toHaveBeenCalledWith({
      message: "검색 결과가 존재 하지 않습니다.",
    });
  });
});

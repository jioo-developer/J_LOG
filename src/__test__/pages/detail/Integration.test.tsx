import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { getUserQueryMock, mockPageData } from "./utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailPage from "@/app/detail/[id]/(page)/Client";
import useDetailQueryHook from "@/apis/detail/query/useDetailQuery";
import useFavoriteMutation from "@/apis/detail/action/favorite/useMutation";
import { popuprHandler } from "@/utils/popupHandler";

// Mock 정의

jest.mock("@/utils/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/apis/detail/query/useDetailQuery", () => ({
  __esModule: true, // ES 모듈로 인식되도록 설정
  default: jest.fn().mockReturnValue({
    pageData: mockPageData({
      user: getUserQueryMock.uid,
      name: getUserQueryMock.displayName,
    }),
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/apis/login/query/useGetUserQuery", () => ({
  __esModule: true, // ES 모듈로 인식
  default: jest.fn().mockReturnValue({
    data: { uid: "테스터" }, // 기본 테스트 데이터
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/apis/detail/action/delete/useMutation", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
}));

jest.mock("@/apis/detail/action/favorite/useMutation", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
}));

const queryClient = new QueryClient();

describe("Detail 페이지의 기능을 테스트 합니다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("게시글 수정 버튼을 누르면 /updateEditor 페이지로 이동 하는 지 테스트 합니다", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DetailPage pageId="test" />
      </QueryClientProvider>
    );

    const link = screen
      .getByTestId("updateButton")
      .querySelector("a") as HTMLAnchorElement;

    fireEvent.click(link);

    window.history.pushState({}, "", "/updateEditor");

    expect(window.location.pathname).toBe("/updateEditor");
  });

  test("게시글 삭제 버튼 클릭 시 함수가 실행 되는 지 테스트 합니다", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DetailPage pageId="" />
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByText("삭제"));

    expect(popuprHandler).toHaveBeenCalledWith({
      message: "정말로 해당 글을 삭제하시겠습니까?",
      type: "confirm",
      callback: expect.any(Function),
    });
  });

  test("추천 버튼 클릭 시 mutation 함수를 호출 하는 지 테스트 합니다.", async () => {
    (useDetailQueryHook as jest.Mock).mockReturnValue({
      pageData: mockPageData({
        user: getUserQueryMock.uid,
        name: getUserQueryMock.displayName,
      }),
      isLoading: false,
    });

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <DetailPage pageId="test" />
        </QueryClientProvider>
      );
    });

    fireEvent.click(screen.getByText(/추천/));

    const { mutate } = useFavoriteMutation();

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledWith({
        user: "테스터",
        value: 0,
        id: "",
      });
    });
  });
});

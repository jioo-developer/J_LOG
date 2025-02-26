import { act, render, screen } from "@testing-library/react";
import { mockPageData } from "./utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailPage from "@/app/detail/[id]/(page)/Client";
import useDetailQueryHook from "@/apis/detail/query/useDetailQuery";
import { popuprHandler } from "@/utils/popupHandler";

// Mock 정의

jest.mock("@/utils/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/apis/detail/query/useDetailQuery", () => ({
  __esModule: true, // ES 모듈로 인식되도록 설정
  default: jest.fn().mockReturnValue({
    pageData: null,
    error: null,
    isLoading: false,
  }),
}));

const getUserQueryMock = { uid: "테스터", displayName: "테스터" };

jest.mock("@/apis/login/hook/useGetUserQuery", () => ({
  __esModule: true, // ES 모듈로 인식
  default: jest.fn().mockReturnValue({
    data: { uid: "테스터", displayName: "테스터" }, // 기본 테스트 데이터
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

describe("Detail 페이지가 정상적으로 랜더링 되는 지 테스트 합니다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("페이지 데이터가 없을 때 팝업이 정상적으로 출력되는 지 테스트 합니다.", async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <DetailPage pageId="test" />
        </QueryClientProvider>
      );
    });

    expect(popuprHandler).toHaveBeenCalledWith({
      message: "페이지 정보가 조회 되지 않습니다.",
    });
  });

  test("페이지 데이터가 있을 때 게시글 제목, 본문 및 이미지가 정상적으로 렌더링 되는 지 테스트 합니다", async () => {
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

    expect(screen.getByText("테스트 제목")).toBeInTheDocument();
    expect(screen.getByText("테스트 본문")).toBeInTheDocument();

    // 이미지가 2개 이상 렌더링 되어야 한다면:
    const images = screen.getAllByAltText("업로드 이미지");
    images.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
  });
});

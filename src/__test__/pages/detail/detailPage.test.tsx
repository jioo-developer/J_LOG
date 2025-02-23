import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailPage from "@/app/detail/[id]/(page)/Client";
import useDetailQueryHook from "@/apis/detail/query/useDetailQuery";
import { mockPageData } from "./utils";
import useFavoriteMutation from "@/apis/detail/favorite/useMutation";
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

jest.mock("@/apis/detail/favorite/useMutation", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
}));

jest.mock("@/app/detail/[id]/(page)/handler/pageDeleteHandler", () => ({
  askDeleteHandler: jest.fn(),
}));

describe("Detail 페이지의 기능을 테스트 합니다.", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("페이지 데이터가 없을 때 팝업이 정상적으로 출력되는 지 테스트 합니다.", async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <DetailPage pageId="" />
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
          <DetailPage pageId="" />
        </QueryClientProvider>
      );
    });

    expect(screen.getByText("테스트 제목")).toBeInTheDocument();
    expect(screen.getByText("테스트 본문")).toBeInTheDocument();

    // 이미지가 2개 이상 렌더링 되어야 한다면:
    const images = screen.getAllByAltText("업로드 이미지");
    expect(images).toHaveLength(1); // 기대하는 이미지 수에 맞게 수정
    images.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
  });

  test("삭제 버튼 클릭 시 함수가 실행 되는 지 테스트 합니다", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DetailPage pageId="" />
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByText("삭제"));
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
          <DetailPage pageId="" />
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

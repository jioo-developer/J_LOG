import { render, screen, fireEvent, act } from "@testing-library/react";
import Header from "@/components/modules/Header/Component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import useLogoutHook from "@/apis/login/logout/useLogoutHook";

// Mocking necessary hooks

jest.mock("@/store/searchStore", () => ({
  useSearchStore: jest.fn().mockReturnValue({
    searchText: "",
    setSearch: jest.fn(),
  }),
}));

jest.mock("@/apis/common/getTokenHandler", () => ({
  getTokenHandler: jest.fn().mockReturnValue(true),
}));

jest.mock("@/apis/login/query/useGetUserQuery", () => ({
  __esModule: true, // ES 모듈로 인식
  default: jest.fn().mockReturnValue({
    data: { uid: "테스터" }, // 기본 테스트 데이터
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/apis/login/logout/useLogoutHook", () => ({
  __esModule: true, // ES 모듈로 인식
  default: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
}));

const queryClient = new QueryClient();

const path = "/member/mypage";

describe("헤더가 정상적으로 작동 하는 지 테스트 합니다", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("허용된 경로에서 Header가 렌더링 되는 지 테스트 합니다.", async () => {
    (usePathname as jest.Mock).mockReturnValue(path);

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Header />
        </QueryClientProvider>
      );
    });

    const header = screen.getByTestId("header-test");
    expect(header).toBeInTheDocument();
  });

  test("검색 버튼 클릭 시 setSearch가 호출되는지 테스트 합니다", async () => {
    (usePathname as jest.Mock).mockReturnValue(path);

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Header />
        </QueryClientProvider>
      );
    });

    const link = screen
      .getByTestId("search-test")
      .querySelector("a") as HTMLAnchorElement;

    fireEvent.click(link);

    window.history.pushState({}, "", "/search");

    expect(window.location.pathname).toBe("/search");
  });

  test("로그아웃 버튼 클릭 시 logout이 호출되는지 테스트 합니다", async () => {
    (usePathname as jest.Mock).mockReturnValue(path);

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Header />
        </QueryClientProvider>
      );
    });

    const logoutButton = screen.getByText("로그아웃");
    fireEvent.click(logoutButton);

    const { mutate } = useLogoutHook();

    expect(mutate).toHaveBeenCalled();
  });
});

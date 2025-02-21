import useCashMutation from "@/apis/market/useMutation";
import MarketPage from "@/app/market/Client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/apis/login/hook/useGetUserQuery", () => ({
  __esModule: true, // ES 모듈로 인식되도록 설정
  default: jest.fn().mockReturnValue({
    data: { uid: "테스터" }, // 모의 데이터 반환
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/apis/market/query/useGetCashQuery", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    cashData: {
      cash: 10000,
      item: 5,
    },
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/apis/market/useMutation", () => ({
  __esModule: true, // 이 부분은 모듈을 ES 모듈로 취급하게 합니다.
  default: jest.fn().mockReturnValue({
    mutateAsync: jest.fn(),
  }),
}));

describe("ItemStore 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MarketPage />
      </QueryClientProvider>
    );
  });

  test("아이템 선택 시 value 변경", () => {
    // '우선권 1회권' 선택
    const itemButton = screen.getByText("우선권 1회권");
    fireEvent.click(itemButton);

    // 구매 버튼 클릭
    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);

    const mutation = useCashMutation();

    expect(mutation.mutateAsync).toHaveBeenCalledWith({
      cash: 7500,
      item: 6,
    });
  });

  test("구매 버튼 클릭 시 포인트 차감 및 아이템 증가", async () => {
    // '우선권 1회권' 선택
    const itemButton = screen.getByText("우선권 1회권");
    fireEvent.click(itemButton);

    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);

    const mutation = useCashMutation();

    expect(mutation.mutateAsync).toHaveBeenCalledWith({
      cash: 7500, // 10000 - 2500
      item: 6, // 기존 2 + 1
    });
  });
});

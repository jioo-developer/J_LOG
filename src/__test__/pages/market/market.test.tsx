import { MockCashData } from "./util";
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
    cashData: MockCashData,
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

describe("market 페이지 기능을 테스트 합니다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MarketPage />
      </QueryClientProvider>
    );
  });

  test("아이템 컴포넌트가 정상적으로 랜더링 하는 지 테스트 합니다.", () => {
    const items = ["우선권 1회권", "우선권 5회권", "우선권 10회권"];

    items.forEach((item) => {
      const element = screen.getByText(item);
      expect(element).toBeInTheDocument();
    });
  });

  test("아이템 선택 시 선택 된 갯수에 맞게 갯수가 변경 되는 지 테스트 합니다.", () => {
    // '우선권 회권' 선택
    const itemLength = 1;
    const itemButton = screen.getByText(`우선권 ${itemLength}회권`);
    fireEvent.click(itemButton);

    // 구매 버튼 클릭
    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);

    const mutation = useCashMutation();
    expect(mutation.mutateAsync).toHaveBeenCalledWith({
      cash: MockCashData.cash - itemLength * 2500,
      item: 1,
    });
  });
});

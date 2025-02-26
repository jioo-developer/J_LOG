import { MockCashData } from "../../market/util";
import { render, screen, fireEvent } from "@testing-library/react";
import { popuprHandler } from "@/utils/popupHandler";
import PriortyChecker from "@/app/edit/components/PriortyChecker/PriortyChecker";

jest.mock("@/apis/market/query/useGetCashQuery", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    cashData: MockCashData,
    error: null,
    isLoading: false,
  }),
}));

test("노출 우선권 아이템의 기능을 테스트 합니다.", () => {
  render(<PriortyChecker ref={jest.fn()} />);

  expect(screen.getByText("노출 우선권 사용하기")).toBeInTheDocument();
  expect(screen.getByRole("checkbox")).toBeInTheDocument();
  // 체크박스를 클릭하고, item이 없을 때 경고 메시지 확인
  fireEvent.click(screen.getByRole("checkbox"));
  expect(popuprHandler).toHaveBeenCalledWith({
    message: "아이템을 보유하고 있지 않습니다, 구매하러 가시겠습니까?",
    type: "confirm",
  });
});

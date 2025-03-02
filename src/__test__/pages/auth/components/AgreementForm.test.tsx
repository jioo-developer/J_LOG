import AgreementForm from "@/app/auth/component/AgreementList/AgreementList";
import { fireEvent, render, screen } from "@testing-library/react";

type CheckItemType = {
  id: string;
  text: string;
  important: boolean;
};

export const items: CheckItemType[] = [
  { id: "auth", text: "회원가입 및 운영약관 동의", important: true },
  { id: "data", text: "개인정보 수집 및 동의", important: true },
  { id: "location", text: "위치정보 이용약관 동의", important: false },
];

describe("agreementForm 컴포넌트의 기능을 테스트 합니다", () => {
  const disableHandler = jest.fn();
  beforeEach(() => {
    render(<AgreementForm disableHandler={disableHandler} />);
  });

  test("전체 약관 동의 버튼을 눌렀을 시 모든 버튼이 상태가 변경 됩니다.", () => {
    const allButton = screen.getByTestId("allCheck_button");

    // 첫 번째 클릭 후 모든 버튼이 on 상태인지 확인
    fireEvent.click(allButton);
    let result = items.every((item) => {
      const target = screen.getByText(item.text)
        .previousElementSibling as HTMLButtonElement;

      return target.getAttribute("data-testid") === `${item.id}-on`;
    });
    expect(result).toBe(true);

    // 두 번째 클릭 후 모든 버튼이 off 상태인지 확인
    fireEvent.click(allButton);
    result = items.every((item) => {
      const target = screen.getByText(item.text)
        .previousElementSibling as HTMLButtonElement;

      return target.getAttribute("data-testid") === `${item.id}-off`;
    });
    expect(result).toBe(true);
  });

  test("개별 약관 동의 버튼을 눌렀을 시 해당 버튼 상태가 활성화 됩니다", () => {
    const allButton = screen.getByTestId("allCheck_button") as HTMLInputElement;

    // 버튼 상태가 on일때 테스트 코드
    items.forEach(({ id }) => {
      const button = screen.getByTestId(`${id}-off`);
      fireEvent.click(button);
      expect(button.getAttribute("data-testid")).toBe(`${id}-on`);
    });

    expect(allButton.checked).toBe(true);
    // 버튼 상태가 on일때 테스트 코드

    // 버튼 상태가 off일때 테스트 코드

    items.forEach(({ id }) => {
      const button = screen.getByTestId(`${id}-on`);
      fireEvent.click(button);
      expect(button.getAttribute("data-testid")).toBe(`${id}-off`);
    });

    expect(allButton.checked).toBe(false);
    // 버튼 상태가 off일때 테스트 코드
  });

  test("약관 활성화 시 disableHandler 실행 여부를 테스트 합니다", () => {
    items.forEach(({ id }) => {
      const button = screen.getByTestId(`${id}-off`);
      fireEvent.click(button);
      expect(button.getAttribute("data-testid")).toBe(`${id}-on`);
    });
    expect(disableHandler).toHaveBeenCalledWith(false);
    // important 버튼이 모두 활성화 되면 disableHandler가 disable를 끄는 처리를 함

    // important 버튼 중 하나를 끄면 disableHandler가 disable 처리를 함
    const firstImportantButton = screen.getByTestId("auth-on");
    fireEvent.click(firstImportantButton);
    expect(disableHandler).toHaveBeenCalledWith(true);
  });
});

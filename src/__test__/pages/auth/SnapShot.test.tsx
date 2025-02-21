import { render, screen } from "@testing-library/react";
import { items } from "./components/AgreementForm.test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFormElementHandler } from "../login/utils";
import AuthPage from "@/app/auth/Client";

jest.mock("@/apis/auth/useMutation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

jest.mock("@/apis/member/mypage/query/useGetNicknameQuery", () => ({
  __esModule: true, // ES 모듈로 인식되도록 설정
  default: jest.fn().mockReturnValue({
    nicknameData: ["사용중인닉네임"], // 모의 데이터 반환
    error: null,
    isLoading: false,
  }),
}));

describe("회원가입 페이지 초반 랜더링이 정상적으로 출력 되었는지 테스트 합니다", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AuthPage />
      </QueryClientProvider>
    );
  });

  test("초기 랜더링 시 회원가입 버튼 및 체크 박스가 비 활성화 되어 있는 지 테스트", () => {
    const result = items.every((item) => {
      const target = screen.getByText(item.text)
        .previousElementSibling as HTMLButtonElement;
      return target.getAttribute("data-testid") === `${item.id}-off`;
    });
    expect(result).toBe(true);
  });

  test("FORM과 관련된 컴포넌트들이 정상적으로 랜더링 되었는 지 테스트 합니다.", () => {
    const { emailInput, pwInput, submitButton } =
      getFormElementHandler("회원가입");

    const nickNameInput = screen.getByTestId(
      "nickNameRequired"
    ) as HTMLInputElement;

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(nickNameInput);
    expect(submitButton).toBeInTheDocument();
  });
});

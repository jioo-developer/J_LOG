import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import CommonInput from "./CommonInput";

type InputTypes = {
  idRequired: string;
  passwordRequired: string;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<InputTypes>();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("CommonInput", () => {
  test("입력 필드가 랜더링 되는 지 테스트 합니다", () => {
    render(
      <Wrapper>
        <CommonInput
          id="idRequired"
          type="text"
          placeholder="아이디를 입력하세요"
        />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText("아이디를 입력하세요");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  test("입력 필드에 입력시 올바르게 변경 되는 지 테스트 합니다", () => {
    render(
      <Wrapper>
        <CommonInput
          id="idRequired"
          type="text"
          placeholder="아이디를 입력하세요"
        />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText(
      "아이디를 입력하세요"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(input.value).toBe("test@example.com");
  });

  test("유효성 검사 실패 시 오류 메시지가 표시되어야 합니다.", async () => {
    const methods = useForm<InputTypes>();
    render(
      <Wrapper>
        <CommonInput
          id="idRequired"
          type="text"
          placeholder="아이디를 입력하세요"
          error={methods.formState.errors.idRequired}
        />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText("아이디를 입력하세요");
    fireEvent.blur(input); // 입력 필드에서 벗어날 때 유효성 검사 실행

    const errorMessage = await screen.findByText("이메일을 입력해 주세요.");
    expect(errorMessage).toBeInTheDocument();
  });
});

import { MockCashData } from "../../market/util";
import useCreateMutation from "@/apis/edit/useMutationHandler";
import EditPage from "@/app/edit/Client";
import InputForm from "@/app/edit/components/InputForm/InputForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: () => {
    let formData: Record<string, any> = {};

    return {
      control: {
        setValue: jest.fn(),
        // register와 field 객체의 onChange와 value 추가
        register: (name: string) => ({
          onChange: (e: any) => {
            formData = { ...formData, [name]: e.target.value };
          },
          value: formData[name],
          name,
        }),
      },
      handleSubmit: (callback: any) => () => {
        callback(formData);
      },
      setValue: (name: string, value: any) => {
        formData = { ...formData, [name]: value };
      },
      reset: () => {
        formData = {};
      },
      formState: {
        errors: {
          titleRequired: { message: "제목을 입력해주세요" },
          textAreaRequired: { message: "내용을 입력해주세요." }, // custom error for testing
        },
      },
    };
  },
  Controller: ({ render, name }: any) => {
    return render({
      field: {
        name,
        value: "",
        onChange: jest.fn(),
      },
    });
  },
}));

jest.mock("@/apis/edit/useMutationHandler", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    mutate: jest.fn(),
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

test("글 작성 버튼을 눌렀을 때 mutation을 정상적으로 호출 하는 지 테스트 합니다.", async () => {
  // Mock input values

  const formHandler = jest.fn();

  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <InputForm formHandler={formHandler} />
    </QueryClientProvider>
  );

  const form = screen.getByTestId("form-test");
  const titleInput = screen.getByTestId("title-test");
  const contentInput = screen.getByTestId("textarea-test");

  // 입력 시뮬레이션
  fireEvent.change(titleInput, { target: { value: "테스트 제목" } });
  fireEvent.change(contentInput, { target: { value: "테스트 내용" } });

  // 제출 버튼 클릭
  fireEvent.submit(form);

  await waitFor(() => {
    expect(formHandler).toHaveBeenCalled(); // mutate 호출 여부 확인
  });
});

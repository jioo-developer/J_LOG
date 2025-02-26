import { MockCashData } from "../market/util";
import useCreateMutation from "@/apis/edit/useMutationHandler";
import EditPage from "@/app/edit/Client";
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

describe("글 작성 페이지의 기능을 테스트 합니다.", () => {
  test("글 작성 페이지가 정상적으로 랜더링 되는 지 확인합니다.", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <EditPage />
      </QueryClientProvider>
    );
    // 컴포넌트들이 렌더링되는지 확인
    expect(
      screen.getByPlaceholderText("제목을 입력해주세요")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("내용을 입력해주세요.")
    ).toBeInTheDocument();
    expect(screen.getByText("노출 우선권 사용하기")).toBeInTheDocument();
    expect(screen.getByText("이미지를 담아주세요")).toBeInTheDocument();
  });
});

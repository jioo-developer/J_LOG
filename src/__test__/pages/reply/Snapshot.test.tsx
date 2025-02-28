import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { mockReplyData } from "./util";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Reply from "@/app/detail/[id]/@reply/Client";

// 모킹
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
          textAreaRequired: { message: "내용을 입력해주세요." }, // custom error for testing
        },
      },
    };
  },
  Controller: ({ render, control, name }: any) => {
    const field = control.register(name); // mock register
    return render({ field });
  },
}));

jest.mock("@/apis/login/hook/useGetUserQuery", () => ({
  __esModule: true, // ES 모듈로 인식
  default: jest.fn().mockReturnValue({
    data: { uid: "테스터", displayName: "테스터" }, // 기본 테스트 데이터
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/apis/detail/query/useDetailQuery", () => ({
  __esModule: true, // ES 모듈로 인식되도록 설정
  default: jest.fn().mockReturnValue({
    pageData: null,
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/apis/detail/reply/query/getReplyDataQuery", () => ({
  __esModule: true, // ES 모듈로 인식
  useReplyQueryHook: jest.fn().mockReturnValue({
    replyData: mockReplyData,
    error: null,
    isLoading: false,
  }),
}));

// QueryClientProvider로 감싸서 쿼리 클라이언트 제공
const queryClient = new QueryClient();

test("댓글 목록이 랜더링 되는 지 테스트 합니다.", () => {
  // 댓글 내용이 화면에 나타나는지 확인
  render(
    <QueryClientProvider client={queryClient}>
      <Reply pageId="aaa" />
    </QueryClientProvider>
  );
  expect(screen.getByText("This is a test comment")).toBeInTheDocument();
});

test("댓글 수정 버튼 클릭 시 인풋이 정상적으로 출력 되는 지 테스트 합니다", async () => {
  // '수정' 버튼 클릭
  render(
    <QueryClientProvider client={queryClient}>
      <Reply pageId="aaa" />
    </QueryClientProvider>
  );
  fireEvent.click(screen.getByText("수정"));

  await act(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Reply pageId="aaa" />
      </QueryClientProvider>
    );
  });
  await waitFor(() => {
    // 댓글 수정 폼이 렌더링되는지 확인
    const inputWrap = screen
      .getByTestId("currentTextArea")
      .querySelector("#textAreaRequired") as HTMLTextAreaElement;

    expect(inputWrap).toBeInTheDocument();

    fireEvent.change(inputWrap, { target: { value: "aaa" } });

    expect(inputWrap.value).toBe("aaa");
    // value 검증 이후로 cypress로 테스트 해야함
  });
});

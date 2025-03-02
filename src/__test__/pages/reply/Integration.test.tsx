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
import { popuprHandler } from "@/utils/popupHandler";
import TextAreaComponent from "@/app/detail/[id]/@reply/components/TextAreaComponent";

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

jest.mock("@/apis/login/query/useGetUserQuery", () => ({
  __esModule: true, // ES 모듈로 인식
  default: jest.fn().mockReturnValue({
    data: { uid: "테스터" }, // 기본 테스트 데이터
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

jest.mock("@/apis/detail/reply/hook/create/useMutation", () => ({
  useReplyMutation: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

jest.mock("@/apis/detail/reply/hook/update/useMutation", () => ({
  useUpdateMutation: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

jest.mock("@/apis/detail/reply/hook/delete/useMutation", () => ({
  useDeleteMutation: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

// QueryClientProvider로 감싸서 쿼리 클라이언트 제공
const queryClient = new QueryClient();

const onsubmitHandler = jest.fn();

describe("Reply 페이지에 대한 기능을 테스트 합니다", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("댓글 작성 폼 제출 시 함수가 정상적으로 호출 되는 지 테스트 합니다", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TextAreaComponent submitHandler={onsubmitHandler} />
      </QueryClientProvider>
    );
    const form = screen.getByTestId("form-test");
    const input = screen.getByPlaceholderText("내용을 입력해주세요.");
    fireEvent.change(input, {
      target: { value: "New reply" },
    });

    fireEvent.submit(form);

    // mutate 함수가 호출되는지 확인
    await waitFor(() => {
      expect(onsubmitHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          textAreaRequired: "New reply",
        }),
        expect.any(Function)
      );
    });
  });

  test("댓글 삭제 버튼 클릭 시 삭제 팝업이 호출된다", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Reply pageId="aaa" />
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByText("삭제"));

    // 삭제 팝업이 호출되었는지 확인
    await waitFor(() => {
      expect(popuprHandler).toHaveBeenCalledWith({
        message: "댓글을 정말로 삭제하시겠습니까?",
        type: "confirm",
        callback: expect.any(Function),
      });
    });
  });
});

import { mockIcons } from "@/__mocks__/react-icons";
import { authService } from "@/lib/firebase";
import "@testing-library/jest-dom";

jest.mock("react-icons/io5", () => ({
  IoEyeOutline: mockIcons.IoEyeOutline,
  IoEyeOffOutline: mockIcons.IoEyeOffOutline,
}));

jest.mock("react-icons/fa", () => ({
  FaChevronLeft: mockIcons.FaChevronLeft,
  FaRegCheckSquare: mockIcons.FaRegCheckSquare,
  FaRegSquare: mockIcons.FaRegSquare,
  FaChevronDown: mockIcons.FaChevronDown,
}));

jest.mock("react-icons/io", () => ({
  IoIosSearch: mockIcons.IoIosSearch,
}));

jest.mock("@/lib/firebase", () => ({
  authService: {
    signOut: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("@/apis/login/hook/useLogoutHook", () => {
  return jest.fn(() => ({
    mutate: jest.fn(async () => {
      await authService.signOut();
    }),
  }));
});

jest.mock("@/utils/popupHandler", () => ({
  popuprHandler: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: () => {
    let formData = {};
    return {
      control: {},
      register: (name: string) => ({
        onChange: (e: any) => {
          formData = { ...formData, [name]: e.target.value };
        },
      }),
      handleSubmit: (callback: any) => () => {
        callback(formData);
      },
      formState: {
        errors: {
          emailRequired: { message: "올바른 이메일 형식이 아닙니다." },
          passwordRequired: { message: "비밀번호가 짧습니다." },
          nickNameRequired: { message: "이미 사용중인 닉네임입니다." },
        },
      },
    };
  },
}));

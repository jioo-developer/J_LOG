import { MockCashData } from "../../market/util";
import Uploader from "@/app/edit/components/uploader/Uploader";
import { LoadImageHandler } from "@/app/edit/handler/imageHandler/fileChangeHandler";
import ImageDeleteHandler from "@/app/edit/handler/imageHandler/uploadImageDeleteHandler";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/app/edit/handler/imageHandler/fileChangeHandler", () => ({
  LoadImageHandler: jest.fn().mockResolvedValue({ result: [], files: [] }),
  fileNameHandler: jest.fn().mockReturnValue({ fileName: [] }),
}));

jest.mock("@/app/edit/handler/imageHandler/uploadImageDeleteHandler", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ url: [], fileName: [] }),
}));

jest.mock("@/apis/market/query/useGetCashQuery", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    cashData: MockCashData,
    error: null,
    isLoading: false,
  }),
}));

describe("업로드 컴포넌트의 기능을 테스트 합니다", () => {
  test("파일 선택 후 업로드된 이미지가 화면에 표시 되는 지 테스트 합니다", async () => {
    render(
      <Uploader
        data={{ url: [], files: [], fileName: [] }}
        setImageHandler={jest.fn()}
      />
    );

    const fileInput = screen.getByLabelText("이미지를 담아주세요");
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });

    // 파일 선택 이벤트 발생

    fireEvent.change(fileInput, { target: { files: [file] } });

    // 이미지가 업로드되면 "업로드 된 이미지" 텍스트가 나타나는지 확인
    expect(LoadImageHandler).toHaveBeenCalled();
  });

  test("이미지 삭제 버튼을 클릭하면 이미지가 UI에서 제거되는 지 테스트 합니다", async () => {
    render(
      <Uploader
        data={{ url: ["/test.jpg"], files: [], fileName: [] }} // "/" 추가
        setImageHandler={jest.fn()}
      />
    );

    const deleteButton = screen.getByTestId("delete-button");
    // 이미지 삭제 버튼 클릭
    fireEvent.click(deleteButton);

    // 이미지가 삭제되었는지 확인
    expect(ImageDeleteHandler).toHaveBeenCalled();
  });
});

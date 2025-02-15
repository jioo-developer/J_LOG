import { create } from "zustand";

// 상태 타입 정의
type ImageInfo = {
  url: string[];
  fileName: string[];
  files: File[];
};

type FormData = {
  title: string;
  text: string;
};

type EditDetailStore = {
  checked: boolean;
  imageInfo: ImageInfo;
  formData: FormData;
  // 상태 업데이트 함수들
  setChecked: (checked: boolean) => void;
  setImageInfo: (url: string[], fileName: string[], files?: File[]) => void; // files는 optional
  setFormData: (title: string, text: string) => void;
};

// zustand store 생성
export const useEditDetailStore = create<EditDetailStore>((set) => ({
  checked: false,
  imageInfo: {
    url: [],
    files: [],
    fileName: [],
  },
  formData: {
    title: "",
    text: "",
  },
  // 상태 업데이트 함수들
  setChecked: (checked) => {
    set({ checked });
  },
  setImageInfo: (url, fileName, files = []) => {
    // files가 주어지지 않으면 빈 배열로 처리
    set({ imageInfo: { url, fileName, files } });
  },
  setFormData: (title, text) => {
    set({ formData: { title, text } });
  },
}));

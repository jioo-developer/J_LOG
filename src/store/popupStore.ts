import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

// PopupMessageStore 상태 타입 정의
type PopupMessageStoreState = {
  message: string;
  type: "alert" | "confirm" | "prompt";
  isClick: boolean;
  state?: Dispatch<SetStateAction<string>>; // Prompt에 사용할 setState 함수
  setMessage: (message: string) => void;
  setType: (type: "alert" | "confirm" | "prompt") => void;
  setIsClick: (isClick: boolean) => void;
  setState: (state: Dispatch<SetStateAction<string>> | undefined) => void;
};

// Zustand store 생성
export const usePopupStore = create<PopupMessageStoreState>((set) => ({
  message: "",
  type: "alert", // 기본값 설정
  isClick: false,
  state: undefined, // Prompt 팝업에서 사용할 setState를 설정하기 위한 상태

  // 메시지 설정 함수
  setMessage: (message: string) => {
    set((state) => {
      if (state.message !== message) {
        return { message };
      }
      return state;
    });
  },

  // 타입 설정 함수
  setType: (type: "alert" | "confirm" | "prompt") => {
    set((state) => {
      if (state.type !== type) {
        return { type };
      }
      return state;
    });
  },

  // 클릭 상태 설정 함수
  setIsClick: (isClick: boolean) => {
    set((state) => {
      if (state.isClick !== isClick) {
        return { isClick };
      }
      return state;
    });
  },

  // 상태 업데이트 함수 (Prompt 팝업에 필요한 state 설정)
  setState: (state: Dispatch<SetStateAction<string>> | undefined) => {
    set({ state }); // setState에 값을 저장
  },
}));

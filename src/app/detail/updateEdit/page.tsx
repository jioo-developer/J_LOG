"use client";

import EditPage from "@/app/edit/Client";
import { FirebaseData } from "@/static/types/common";
import { QueryClient } from "@tanstack/react-query";
import { useEditDetailStore } from "./store";
import { useEffect } from "react";

function UpdateEdit() {
  const queryClient = new QueryClient();
  const cachedData = queryClient.getQueryData<FirebaseData>([
    "getPage",
  ]) as FirebaseData;

  const { setChecked, setImageInfo, setFormData } = useEditDetailStore();

  useEffect(() => {
    if (cachedData) {
      setChecked(!!cachedData.priority);
      setImageInfo(cachedData.url, cachedData.fileName);
      setFormData(cachedData.title, cachedData.text); // title과 text만 넘겨줘야 합니다.
    }
  }, [cachedData, setChecked, setImageInfo, setFormData]);

  return <EditPage />;
}

export default UpdateEdit;

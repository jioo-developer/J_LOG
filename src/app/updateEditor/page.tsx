"use client";
import EditPage from "@/app/edit/Client";
import { useEditDetailStore } from "./store";
import { useEffect } from "react";
import { usePageInfoStore } from "@/store/pageInfoStore";
import useDetailQueryHook from "@/apis/detail/query/useDetailQuery";

function UpdateEdit() {
  console.log("페이지 진입");
  const { pgId } = usePageInfoStore();
  const { pageData } = useDetailQueryHook(pgId);
  const { setChecked, setImageInfo, setFormData } = useEditDetailStore();

  useEffect(() => {
    if (pageData) {
      setChecked(!!pageData.priority);
      setImageInfo(pageData.url, pageData.fileName);
      setFormData(pageData.title, pageData.text); // title과 text만 넘겨줘야 합니다.
    }
  }, [pageData, setChecked, setImageInfo, setFormData]);

  return <EditPage />;
}

export default UpdateEdit;

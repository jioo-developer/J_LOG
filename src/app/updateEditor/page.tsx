"use client";
import EditPage from "@/app/edit/Client";
import { useEditDetailStore } from "./store";
import { useEffect } from "react";
import { usePageInfoStore } from "@/store/pageInfoStore";
import useDetailQueryHook from "@/apis/detail/query/useDetailQuery";

function UpdateEdit() {
  const { pgId } = usePageInfoStore();
  const { pageData, isLoading } = useDetailQueryHook(pgId);
  const { setChecked, setImageInfo, setFormData } = useEditDetailStore();

  useEffect(() => {
    if (pgId !== "" && !isLoading) {
      if (pageData) {
        setChecked(!!pageData.priority);
        setImageInfo(pageData.url, pageData.fileName);
        setFormData(pageData.title, pageData.text); // title과 text만 넘겨줘야 합니다.
      }
    }
  }, [pageData, isLoading, pgId, setChecked, setImageInfo, setFormData]);

  return <EditPage />;
}

export default UpdateEdit;

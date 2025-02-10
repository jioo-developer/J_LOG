/** @jsxImportSource @emotion/react */
"use client";
import "./Style.scss";
import InputForm from "./components/InputForm/InputForm";
import Uploader from "./components/uploader/Uploader";
import PriortyChecker from "./components/PriortyChecker/PriortyChecker";

function EditPage() {
  return (
    <div className="upload">
      <InputForm />
      <Uploader />
      <PriortyChecker />
    </div>
  );
}

export default EditPage;

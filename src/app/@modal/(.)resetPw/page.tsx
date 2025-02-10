/** @jsxImportSource @emotion/react */
"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ResetPwPage from "../../resetPw/page";

function InterseptResetPwPage() {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById("modal-root");
    if (root) {
      setModalRoot(root);
    }
  }, []);

  if (!modalRoot) return null; // modal-root가 없으면 포털을 렌더링하지 않음

  return createPortal(<ResetPwPage />, modalRoot);
}

export default InterseptResetPwPage;

/** @jsxImportSource @emotion/react */
"use client";
import Market from "@/app/market/Client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function InterseptResetPwPage() {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById("modal-root");
    if (root) {
      setModalRoot(root);
    }
  }, []);

  if (!modalRoot) return null; // modal-root가 없으면 포털을 렌더링하지 않음

  return createPortal(<Market />, modalRoot);
}

export default InterseptResetPwPage;

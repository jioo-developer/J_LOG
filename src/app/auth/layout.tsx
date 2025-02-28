"use client";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { ReactNode } from "react";
import "./style.scss";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth__Wrap">
      <div className="title__Area flex-Set">
        <button type="button" className="flex-Set">
          <Link href="/login" className="close">
            <FaChevronLeft size={16} />
          </Link>
          회원가입
        </button>
      </div>
      {children}
    </div>
  );
}

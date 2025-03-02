"use client";
import "./style.scss";
import SocialLoginPage from "./components/snsLogin/snsButtonWrap";
import LoginForm from "./components/LoginForm";
import AssistanceLinks from "./components/AssistanceLinks";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <SocialLoginPage />
      <AssistanceLinks />
    </>
  );
}

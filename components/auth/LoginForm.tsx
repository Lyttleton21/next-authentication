"use client";

import AuthCard from "./AuthCard";

export default function LoginForm() {
  return (
    <AuthCard
      cardTitle={"Welcome Back"}
      backButtonhref={"/auth/register"}
      backButtonLabel={"Create a New Account"}
      showSocial
    >
      <h1>hello</h1>
    </AuthCard>
  );
}

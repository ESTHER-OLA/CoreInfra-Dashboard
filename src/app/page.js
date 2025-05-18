"use client";

import React, { useEffect, useState } from "react";
import { LoginForm } from "@/components/login-form";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
      router.push("/dashboard"); // Optional: Redirect if already logged in
    }
  }, []);

  const handleLogin = (user, password) => {
    if (user && password) {
      sessionStorage.setItem("username", user);
      setIsLoggedIn(true);
      router.push("/dashboard");
    }
  };

  if (isLoggedIn) return null;

  return <LoginForm onLogin={handleLogin} />;
}

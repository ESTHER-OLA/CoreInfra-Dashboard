"use client";

import React, { useEffect, useState } from "react";
import { LoginForm } from "@/app/login/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const username = sessionStorage.getItem("username");

    if (username) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return null;
}
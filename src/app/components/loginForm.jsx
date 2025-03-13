import React from "react";
import { Form } from "@heroui/react";
import LoginButton from "./loginButton";
export default function LoginForm() {
  return (
    <Form className="w-full max-w-xs flex flex-col gap-4">
      <LoginButton />
    </Form>
  );
}

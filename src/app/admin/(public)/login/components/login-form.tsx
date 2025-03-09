"use client";

import { Form } from "@/components/admin/form";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import {
  EyeClosedIcon,
  EyeIcon,
  KeyRoundIcon,
  LogInIcon,
  MailIcon,
} from "lucide-react";

const messages = config.messages.validation;

const LoginForm = React.forwardRef<
  HTMLFormElement,
  Omit<
    React.ComponentProps<typeof Form.Context>,
    "zodSchema" | "onSubmit" | "children"
  >
>((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputType, setInputType] = React.useState<"password" | "text">(
    "password"
  );

  function togglePasswordVisibility() {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
    setShowPassword((prev) => !prev);
  }

  return (
    <Form.Context
      ref={ref}
      {...props}
      zodSchema={z.object({
        email: z
          .string({ required_error: messages.required_error })
          .email({ message: messages.email_error }),
        password: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.nonempty_error }),
        rememberMe: z.boolean().default(false),
      })}
      onSubmit={(data) => console.log(data)}
    >
      <Form.Input
        label="E-mail"
        name="email"
        autoFocus
        leftIcon={<MailIcon size={18} />}
      />

      <Form.Input
        label="Senha"
        name="password"
        type={inputType}
        leftIcon={<KeyRoundIcon size={18} />}
        rightIcon={
          showPassword ? <EyeIcon size={18} /> : <EyeClosedIcon size={18} />
        }
        onRightIconClick={togglePasswordVisibility}
      />

      <Form.Switch label="Lembrar-me" name="rememberMe" />

      <Button type="submit" className="w-full">
        <LogInIcon />
        Acessar
      </Button>
    </Form.Context>
  );
});
LoginForm.displayName = "BannerForm";

export { LoginForm };

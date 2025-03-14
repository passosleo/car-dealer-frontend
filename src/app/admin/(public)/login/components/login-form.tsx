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
import { redirect } from "next/navigation";
import { useClientSession } from "@/hooks/use-client-session";
import { apiClientConnection } from "@/services/api-client-connection";

const messages = config.messages.validation;

const createSessionSchema = z.object({
  email: z
    .string({ required_error: messages.required_error })
    .email({ message: messages.email_error }),
  password: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  rememberMe: z.boolean(),
});

type CreateSessionSchema = z.infer<typeof createSessionSchema>;

const LoginForm = React.forwardRef<
  HTMLDivElement,
  Omit<
    React.ComponentProps<typeof Form.Context>,
    "zodSchema" | "onSubmit" | "children"
  >
>((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputType, setInputType] = React.useState<"password" | "text">(
    "password"
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const session = useClientSession();

  function togglePasswordVisibility() {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
    setShowPassword((prev) => !prev);
  }

  async function onSubmit(data: CreateSessionSchema) {
    setIsSubmitting(true);

    await apiClientConnection.admin.auth.createSession(data, {
      onSuccess: (data) => {
        setIsSubmitting(false);
        session.register(data);
        redirect("/admin/dashboard");
      },
      onError: (error) => {
        console.log(error);
        setIsSubmitting(false);
      },
    });
  }

  return (
    <div ref={ref}>
      <Form.Context
        {...props}
        zodSchema={createSessionSchema}
        onSubmit={onSubmit}
      >
        <Form.Input
          label="E-mail"
          name="email"
          disabled={isSubmitting}
          autoFocus
          leftIcon={<MailIcon size={18} />}
        />

        <Form.Input
          label="Senha"
          name="password"
          type={inputType}
          disabled={isSubmitting}
          leftIcon={<KeyRoundIcon size={18} />}
          rightIcon={
            showPassword ? <EyeIcon size={18} /> : <EyeClosedIcon size={18} />
          }
          onRightIconClick={togglePasswordVisibility}
        />

        <Form.Switch label="Lembrar-me" name="rememberMe" />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <LogInIcon />
          Acessar
        </Button>
      </Form.Context>
    </div>
  );
});
LoginForm.displayName = "BannerForm";

export { LoginForm };

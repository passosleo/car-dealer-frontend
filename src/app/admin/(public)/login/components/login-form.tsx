"use client";
import { Form } from "@/components/admin/form";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { z } from "zod";
import { config } from "@/config";
import {
  EyeClosedIcon,
  EyeIcon,
  KeyRoundIcon,
  LogInIcon,
  MailIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { CreateSessionDTO, SessionDTO } from "@/services/types";

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

export function LoginForm(
  props: Omit<
    React.ComponentProps<typeof Form.Context>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState<"password" | "text">("password");

  const router = useRouter();
  const session = useSession();
  const { mutate: login, isPending } = useCustomMutate<
    CreateSessionDTO,
    SessionDTO
  >({
    routeName: "createSession",
    setQueryKeys: ["session"],
  });

  function togglePasswordVisibility() {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
    setShowPassword((prev) => !prev);
  }

  async function onSubmit(data: CreateSessionSchema) {
    login(
      { payload: data },
      {
        onSuccess: (res) => {
          session.register(res.data);
          router.replace("/admin/dashboard");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }

  return (
    <Form.Context
      {...props}
      zodSchema={createSessionSchema}
      onSubmit={onSubmit}
    >
      <Form.Input
        label="E-mail"
        name="email"
        disabled={isPending}
        autoFocus
        leftIcon={<MailIcon size={18} />}
      />

      <Form.Input
        label="Senha"
        name="password"
        type={inputType}
        disabled={isPending}
        leftIcon={<KeyRoundIcon size={18} />}
        rightIcon={
          showPassword ? <EyeIcon size={18} /> : <EyeClosedIcon size={18} />
        }
        onRightIconClick={togglePasswordVisibility}
      />

      <Form.Switch label="Lembrar-me" name="rememberMe" />

      <Button type="submit" className="w-full" disabled={isPending}>
        <LogInIcon />
        Acessar
      </Button>
    </Form.Context>
  );
}

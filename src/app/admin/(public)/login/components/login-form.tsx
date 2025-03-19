"use client";
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
import { FormContext } from "@/components/admin/form/form-context";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { useCreateSessionService } from "../services/use-create-session-service";

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
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState<"password" | "text">("password");

  const router = useRouter();
  const session = useSession();
  const { mutate: login, isPending } = useCreateSessionService();

  function togglePasswordVisibility() {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
    setShowPassword((prev) => !prev);
  }

  function onSubmit(data: CreateSessionSchema) {
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
    <FormContext {...props} zodSchema={createSessionSchema} onSubmit={onSubmit}>
      <FormInput
        label="E-mail"
        name="email"
        disabled={isPending}
        autoFocus
        leftIcon={<MailIcon size={18} />}
      />

      <FormInput
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

      <FormSwitch label="Lembrar-me" name="rememberMe" />

      <Button type="submit" className="w-full" disabled={isPending}>
        <LogInIcon />
        Acessar
      </Button>
    </FormContext>
  );
}

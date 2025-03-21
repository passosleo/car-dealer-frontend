"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { config } from "@/config";
import {
  EyeClosedIcon,
  EyeIcon,
  KeyRoundIcon,
  LogInIcon,
  MailIcon,
} from "lucide-react";
import { FormContext } from "@/components/admin/form/form-context";
import { FormInput } from "@/components/admin/form/form-input";
import { useCreateSessionService } from "../services/use-create-session-service";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { FormCheckbox } from "@/components/admin/form/form-checkbox";
import { useCookies } from "@/hooks/use-cookies";

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
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [savedEmail, setSavedEmail] = useState<string>();
  const { createSession, isPending } = useCreateSessionService();
  const { getCookie, setCookie, invalidateCookie } = useCookies();

  useEffect(() => {
    const rememberMeValue = getCookie("rememberMe");
    if (rememberMeValue) {
      setSavedEmail(rememberMeValue);
    }
  }, [getCookie]);

  function togglePasswordVisibility() {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  }

  function onSubmit(data: CreateSessionSchema) {
    createSession(
      {
        payload: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: () => {
          if (data.rememberMe) {
            setCookie("rememberMe", data.email, {
              expires: new Date(
                Date.now() + 1000 * 60 * 60 * 24 * 30
              ) /* 30 days */,
              path: "/admin/login",
              sameSite: "strict",
              secure: true,
              httpOnly: false,
            });
          } else {
            invalidateCookie("rememberMe", {
              path: "/admin/login",
            });
          }
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }

  return (
    <FormContext
      {...props}
      zodSchema={createSessionSchema}
      onSubmit={onSubmit}
      useFormProps={{
        values: {
          email: savedEmail,
          rememberMe: !!savedEmail,
        },
      }}
    >
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
          inputType === "text" ? (
            <EyeIcon size={18} />
          ) : (
            <EyeClosedIcon size={18} />
          )
        }
        onRightIconClick={togglePasswordVisibility}
      />

      <FormCheckbox label="Lembrar-me" name="rememberMe" />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <LoaderCircle color="secondary" /> : <LogInIcon />}
        Acessar
      </Button>
    </FormContext>
  );
}

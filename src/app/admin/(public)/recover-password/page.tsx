"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecoverPasswordForm } from "./components/recover-password-form";
import Link from "next/link";
import { useState } from "react";
import { TextNormal } from "@/components/admin/text/text-normal";

export default function RecoverPasswordPage() {
  const [isSent, setIsSent] = useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-0">
        <CardTitle className="self-center">Esqueci a senha</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 py-3">
        {!isSent ? (
          <RecoverPasswordForm onSent={() => setIsSent(true)} />
        ) : (
          <TextNormal className="text-center">
            Se o e-mail informado estiver correto, você receberá um e-mail com
            instruções para redefinir sua senha.
          </TextNormal>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Link
          href="/admin/login"
          className="text-xs text-muted-foreground underline"
        >
          Voltar
        </Link>
      </CardFooter>
    </Card>
  );
}

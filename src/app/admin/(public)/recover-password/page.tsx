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
import Image from "next/image";

export default function RecoverPasswordPage() {
  const [isSent, setIsSent] = useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-0">
        <CardTitle className="self-center">Esqueci a senha</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 py-3">
        {!isSent ? (
          <>
            <TextNormal className="text-center text-sm my-4">
              Informe seu e-mail para recuperar a senha.
            </TextNormal>
            <RecoverPasswordForm onSent={() => setIsSent(true)} />
          </>
        ) : (
          <>
            <Image
              src="/images/forgot-password.svg"
              alt="Ilustração de recuperação de senha"
              width={200}
              height={200}
              className="mx-auto my-4"
            />
            <TextNormal className="text-center text-sm pb-4">
              Se o e-mail informado estiver correto, enviaremos um link para
              redefinição de senha. Verifique sua caixa de entrada e siga as
              instruções.
            </TextNormal>
          </>
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

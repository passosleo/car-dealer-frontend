import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./components/login-form";
import Link from "next/link";

export default function LoginAdminPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-0">
        <CardTitle className="self-center">Admin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 py-3">
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Link
          href="/admin/forgot-password"
          className="text-xs text-muted-foreground underline"
        >
          Esqueci minha senha
        </Link>
      </CardFooter>
    </Card>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { useCookies } from "@/hooks/use-cookies";

export function LoginButton() {
  const { setCookie } = useCookies();
  return (
    <a
      href="/admin/dashboard"
      onClick={() => {
        setCookie(
          "auth_token",
          true,
          new Date(Date.now() + 1000 * 60 * 60 * 24),
          "/admin"
        );
      }}
      className="flex w-full"
    >
      <Button className="w-full">Login</Button>
    </a>
  );
}

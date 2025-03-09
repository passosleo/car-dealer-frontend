"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      className="text-sm mb-4 h-8 p-1 font-normal select-none"
      variant="ghost"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon size={18} className="text-primary" />
      Voltar
    </Button>
  );
}

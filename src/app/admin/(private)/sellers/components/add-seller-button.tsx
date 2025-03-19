import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";

export function AddSellerButton(props: React.ComponentPropsWithoutRef<"a">) {
  return (
    <Link href="/admin/sellers/new" {...props}>
      <Button className="flex gap-1 items-center justify-center">
        <CirclePlusIcon />
        Adicionar
      </Button>
    </Link>
  );
}

import { Button } from "@/components/ui/button";
import { ListRestartIcon, ShuffleIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { LayoutComponentList } from "../components/layout-component-list";

export default async function LayoutPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader title="Layout" description="Gerencie o layout da sua loja.">
        <div className="flex items-center gap-4">
          <Button className="flex gap-1 items-center justify-center">
            <ShuffleIcon />
            Reordenar
          </Button>
          <Button
            className="flex gap-1 items-center justify-center"
            variant="outline"
          >
            <ListRestartIcon />
            Restaurar Padrão
          </Button>
        </div>
      </PageHeader>
      <LayoutComponentList />
    </PageLayout>
  );
}

import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageContentList } from "@/components/admin/page/page-content-list";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { DEFAULT_COMPONENT_PAGES } from "../constants/pages";

const sharedElements = DEFAULT_COMPONENT_PAGES.filter((p) => p.shared);
const scopedElements = DEFAULT_COMPONENT_PAGES.filter((p) => !p.shared);

export default function AppearancePage() {
  const renderItem = (page: (typeof DEFAULT_COMPONENT_PAGES)[number]) => (
    <Link href={page.url} key={page.id}>
      <Card className="flex items-center p-4 gap-4 hover:bg-primary-foreground cursor-pointer transition-all">
        {page.icon}
        <div>
          <h3 className="font-medium">{page.label}</h3>
          <p className="text-sm text-muted-foreground">{page.description}</p>
        </div>
        <ChevronRight className="ml-auto" />
      </Card>
    </Link>
  );

  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Aparência"
        description="Gerencie a aparência do site."
      />

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">Elementos compartilhados</h2>
          <Badge variant="secondary">Escopo global</Badge>
        </div>
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4 mt-0.5" />
          <p>
            Alterações feitas em elementos compartilhados refletem em todo o
            site.
          </p>
        </div>
      </div>
      <PageContentList
        items={sharedElements}
        renderItem={renderItem}
        className="flex-grow-0"
      />

      <div className="mt-8 mb-4 space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">Elementos não compartilhados</h2>
          <Badge variant="outline">Escopo por página</Badge>
        </div>
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4 mt-0.5" />
          <p>
            Alterações feitas em elementos não compartilhados refletem apenas na
            página na qual estão vinculados.
          </p>
        </div>
      </div>
      <PageContentList items={scopedElements} renderItem={renderItem} />
    </PageLayout>
  );
}

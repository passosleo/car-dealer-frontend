"use client";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { TopBarConfigForm } from "../../../components/top-bar-config-form";
import { PageContentCard } from "@/components/admin/page/page-content-card";

export default function LayoutComponentPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Top Bar"
        description="Gerencie a aparência das mensagens rotativas no topo do site."
      />
      <PageContentCard>
        <TopBarConfigForm isLoading={false} />
      </PageContentCard>
    </PageLayout>
  );
}

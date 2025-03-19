import { PageContentCard } from "@/components/admin/page/page-content-card";
import { BrandForm } from "../components/brand-form";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";

export default async function EditBrandPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Editar marca"
        description="Altere as informações da marca."
      />
      <PageContentCard>
        <BrandForm />
      </PageContentCard>
    </PageLayout>
  );
}

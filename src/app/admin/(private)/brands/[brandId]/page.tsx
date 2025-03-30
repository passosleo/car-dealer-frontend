import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";
import { UpdateBrandForm } from "../components/update-brand-form";

export default async function EditBrandPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Editar marca"
        description="Altere as informações da marca."
      />
      <PageContentCard>
        <UpdateBrandForm />
      </PageContentCard>
    </PageLayout>
  );
}

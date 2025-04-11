import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";
import { UpdateCategoryForm } from "../components/update-category-form";

export default async function EditBrandPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Editar categoria"
        description="Altere as informações da categoria de veículos."
      />
      <PageContentCard>
        <UpdateCategoryForm />
      </PageContentCard>
    </PageLayout>
  );
}

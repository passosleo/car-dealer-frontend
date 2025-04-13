import { PageLayout } from "@/components/admin/page/page-layout";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";
import { CreateCategoryForm } from "../../components/create-category-form";

export default async function NewCategoryPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Nova categoria"
        description="Crie uma nova categoria de veículos para a sua loja."
      />
      <PageContentCard>
        <CreateCategoryForm />
      </PageContentCard>
    </PageLayout>
  );
}

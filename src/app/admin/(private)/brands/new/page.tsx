import { PageLayout } from "@/components/admin/page/page-layout";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";
import { CreateBrandForm } from "../components/create-brand-form";

export default async function NewBrandPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Nova marca"
        description="Crie uma nova marca para a sua loja."
      />
      <PageContentCard>
        <CreateBrandForm />
      </PageContentCard>
    </PageLayout>
  );
}

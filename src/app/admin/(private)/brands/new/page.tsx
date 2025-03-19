import { BrandForm } from "../components/brand-form";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";

export default async function NewBrandPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Nova marca"
        description="Crie uma nova marca para a sua loja."
      />
      <PageContentCard>
        <BrandForm />
      </PageContentCard>
    </PageLayout>
  );
}

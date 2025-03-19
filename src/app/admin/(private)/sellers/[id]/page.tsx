import { PageLayout } from "@/components/admin/page/page-layout";
import { SellerForm } from "../components/seller-form";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";

export default async function EditSellerPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Editar vendedor"
        description="Altere as informações do vendedor."
      />
      <PageContentCard>
        <SellerForm />
      </PageContentCard>
    </PageLayout>
  );
}

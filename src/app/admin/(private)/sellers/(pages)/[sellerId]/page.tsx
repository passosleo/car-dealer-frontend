import { PageLayout } from "@/components/admin/page/page-layout";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";
import { UpdateSellerForm } from "../../components/update-seller-form";

export default async function EditSellerPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Editar vendedor"
        description="Altere as informações do vendedor."
      />
      <PageContentCard>
        <UpdateSellerForm />
      </PageContentCard>
    </PageLayout>
  );
}

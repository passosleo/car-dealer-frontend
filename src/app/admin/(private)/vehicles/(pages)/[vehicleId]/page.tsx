import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";

export default async function EditVehiclePage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Editar veículo"
        description="Altere as informações do veículo."
      />
      <PageContentCard>{/* <UpdateBrandForm /> */}</PageContentCard>
    </PageLayout>
  );
}

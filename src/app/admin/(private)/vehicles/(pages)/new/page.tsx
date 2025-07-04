import { PageLayout } from "@/components/admin/page/page-layout";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";
import { CreateVehicleForm } from "../../components/create-vehicle-form";

export default async function NewVehiclePage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Novo veículo"
        description="Adicione um novo veículo à sua loja."
      />
      <PageContentCard>
        <CreateVehicleForm />
      </PageContentCard>
    </PageLayout>
  );
}

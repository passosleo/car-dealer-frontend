import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { DEFAULT_COMPONENT_PAGES } from "../../constants/pages";

const vehiclePage = DEFAULT_COMPONENT_PAGES.find(
  (page) => page.id === "vehicle"
)!;

export default function VehiclePage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title={vehiclePage.label}
        description={vehiclePage.description}
      />
      <h1 className="text-2xl font-bold mb-4">Página de Veículo</h1>
    </PageLayout>
  );
}

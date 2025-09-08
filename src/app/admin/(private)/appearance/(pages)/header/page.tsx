import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { DEFAULT_COMPONENT_PAGES } from "../../constants/pages";

const headerPage = DEFAULT_COMPONENT_PAGES.find(
  (page) => page.id === "header"
)!;

export default function FooterPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title={headerPage.label}
        description={headerPage.description}
      />
      <h1 className="text-2xl font-bold mb-4">Página de Cabeçalho</h1>
    </PageLayout>
  );
}

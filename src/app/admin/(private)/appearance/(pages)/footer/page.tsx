import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { DEFAULT_COMPONENT_PAGES } from "../../constants/pages";

const footerPage = DEFAULT_COMPONENT_PAGES.find(
  (page) => page.id === "footer"
)!;

export default function FooterPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title={footerPage.label}
        description={footerPage.description}
      />
      <h1 className="text-2xl font-bold mb-4">Página de Rodapé</h1>
    </PageLayout>
  );
}

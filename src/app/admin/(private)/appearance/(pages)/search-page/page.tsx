import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { DEFAULT_COMPONENT_PAGES } from "../../constants/pages";

const searchPage = DEFAULT_COMPONENT_PAGES.find(
  (page) => page.id === "search"
)!;

export default function SearchPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title={searchPage.label}
        description={searchPage.description}
      />
      <h1 className="text-2xl font-bold mb-4">Página de Busca</h1>
    </PageLayout>
  );
}

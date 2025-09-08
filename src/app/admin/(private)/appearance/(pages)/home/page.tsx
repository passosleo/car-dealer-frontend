import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { DEFAULT_COMPONENT_PAGES } from "../../constants/pages";

const homePage = DEFAULT_COMPONENT_PAGES.find((page) => page.id === "home")!;

export default function SearchPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader title={homePage.label} description={homePage.description} />
      <h1 className="text-2xl font-bold mb-4">Página Inicial</h1>
    </PageLayout>
  );
}

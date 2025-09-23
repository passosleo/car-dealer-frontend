import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { LayoutScopeList } from "../components/layout-scope-list";

export default function LayoutScopesPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Layout"
        description="Gerencie a aparência e disposição dos componentes do site."
      />
      <LayoutScopeList />
    </PageLayout>
  );
}

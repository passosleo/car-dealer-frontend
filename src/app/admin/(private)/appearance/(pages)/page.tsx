import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { LayoutScopeList } from "../components/layout-scope-list";

export default function AppearancePage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Aparência"
        description="Gerencie a aparência do site."
      />
      <LayoutScopeList />
    </PageLayout>
  );
}

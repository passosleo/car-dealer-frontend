import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { UpdateBannerForm } from "../../components/update-banner-form";

export default async function EditBannerPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Editar banner"
        description="Altere as informações do banner."
      />

      <PageContentCard>
        <UpdateBannerForm />
      </PageContentCard>
    </PageLayout>
  );
}

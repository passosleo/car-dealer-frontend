import { PageLayout } from "@/components/admin/page/page-layout";
import { BannerForm } from "../components/banner-form";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageContentCard } from "@/components/admin/page/page-content-card";

export default async function EditBannerPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Editar banner"
        description="Altere as informações do banner."
      />

      <PageContentCard>
        <BannerForm />
      </PageContentCard>
    </PageLayout>
  );
}

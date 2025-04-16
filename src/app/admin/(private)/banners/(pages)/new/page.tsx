import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { CreateBannerForm } from "../../components/create-banner-form";

export default async function NewBannerPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Novo banner"
        description="Crie um novo banner para a sua loja."
      />
      <PageContentCard>
        <CreateBannerForm />
      </PageContentCard>
    </PageLayout>
  );
}

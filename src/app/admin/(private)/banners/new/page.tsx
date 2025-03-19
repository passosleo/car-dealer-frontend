import { PageContentCard } from "@/components/admin/page/page-content-card";
import { BannerForm } from "../components/banner-form";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";

export default async function NewBannerPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Novo banner"
        description="Crie um novo banner para a sua loja."
      />
      <PageContentCard>
        <BannerForm />
      </PageContentCard>
    </PageLayout>
  );
}

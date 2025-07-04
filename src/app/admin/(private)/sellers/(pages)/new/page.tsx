import { PageLayout } from "@/components/admin/page/page-layout";
import { CreateSellerForm } from "../../components/create-seller-form";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";

export default function NewSellerPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Cadastro de vendedor"
        description="Adicione um novo vendedor à sua loja."
      />
      <PageContentCard>
        <CreateSellerForm />
      </PageContentCard>
    </PageLayout>
  );
}

import { PageLayout } from "@/components/admin/page/page-layout";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";
import { CreateProfileForm } from "../components/create-profile-form";

export default async function NewProfilePage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Novo perfil de acesso"
        description="Crie um novo perfil de acesso para o seu sistema."
      />
      <PageContentCard>
        <CreateProfileForm />
      </PageContentCard>
    </PageLayout>
  );
}

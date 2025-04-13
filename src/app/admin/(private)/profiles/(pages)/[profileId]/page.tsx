import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";
import { UpdateProfileForm } from "../../components/update-profile-form";

export default async function EditProfilePage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Editar perfil de acesso"
        description="Altere as permissões do perfil de acesso."
      />
      <PageContentCard>
        <UpdateProfileForm />
      </PageContentCard>
    </PageLayout>
  );
}

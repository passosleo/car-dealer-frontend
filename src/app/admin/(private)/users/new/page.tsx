import { PageLayout } from "@/components/admin/page/page-layout";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";
import { CreateUserForm } from "../components/create-user-form";

export default function NewUserPage() {
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Cadastro de usuário"
        description="Adicione um novo usuário ao seu sistema."
      />
      <PageContentCard>
        <CreateUserForm />
      </PageContentCard>
    </PageLayout>
  );
}

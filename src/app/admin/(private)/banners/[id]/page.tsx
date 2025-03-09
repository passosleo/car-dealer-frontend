import { BannerForm } from "../components/banner-form";
import { Page } from "@/components/admin/page";

export default async function EditBannerPage() {
  return (
    <Page.Layout
      withBackButton
      header={
        <Page.Header.Layout>
          <Page.Header.Title>Editar banner</Page.Header.Title>
          <Page.Header.Description>
            Altere as informações do banner.
          </Page.Header.Description>
        </Page.Header.Layout>
      }
      content={
        <Page.Content.Card>
          <BannerForm />
        </Page.Content.Card>
      }
    />
  );
}

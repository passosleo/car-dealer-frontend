import { BannerForm } from "../components/banner-form";
import { Page } from "@/components/admin/page";

export default async function NewBannerPage() {
  return (
    <Page.Layout
      withBackButton
      header={
        <Page.Header.Layout>
          <Page.Header.Title>Novo banner</Page.Header.Title>
          <Page.Header.Description>
            Crie um novo banner para a sua loja.
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

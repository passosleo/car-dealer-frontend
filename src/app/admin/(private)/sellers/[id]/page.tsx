import { SellerForm } from "../components/seller-form";
import { Page } from "@/components/admin/page";

export default async function EditSellerPage() {
  return (
    <Page.Layout
      withBackButton
      header={
        <Page.Header.Layout>
          <Page.Header.Title>Editar vendedor</Page.Header.Title>
          <Page.Header.Description>
            Altere as informações do vendedor.
          </Page.Header.Description>
        </Page.Header.Layout>
      }
      content={
        <Page.Content.Card>
          <SellerForm />
        </Page.Content.Card>
      }
    />
  );
}

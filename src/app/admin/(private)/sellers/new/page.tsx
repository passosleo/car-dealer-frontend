import { SellerForm } from "../components/seller-form";
import { Page } from "@/components/admin/page";

export default function NewSellerPage() {
  return (
    <Page.Layout
      withBackButton
      header={
        <Page.Header.Layout>
          <Page.Header.Title>Cadastro de vendedor</Page.Header.Title>
          <Page.Header.Description>
            Adicione um novo vendedor à sua loja.
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

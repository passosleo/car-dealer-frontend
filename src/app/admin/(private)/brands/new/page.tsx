import { Page } from "@/components/admin/page";
import { BrandForm } from "../components/brand-form";

export default async function NewBrandPage() {
  return (
    <Page.Layout
      withBackButton
      header={
        <Page.Header.Layout>
          <Page.Header.Title>Nova marca</Page.Header.Title>
          <Page.Header.Description>
            Crie uma nova marca para a sua loja.
          </Page.Header.Description>
        </Page.Header.Layout>
      }
      content={
        <Page.Content.Card>
          <BrandForm />
        </Page.Content.Card>
      }
    />
  );
}

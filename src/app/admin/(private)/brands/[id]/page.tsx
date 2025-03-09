import { BrandForm } from "../components/brand-form";
import { Page } from "@/components/admin/page";

export default async function EditBrandPage() {
  return (
    <Page.Layout
      withBackButton
      header={
        <Page.Header.Layout>
          <Page.Header.Title>Editar marca</Page.Header.Title>
          <Page.Header.Description>
            Altere as informações da marca.
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

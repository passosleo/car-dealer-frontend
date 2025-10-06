"use client";
import { PageContentCard } from "@/components/admin/page/page-content-card";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { LayoutComponentName } from "@/types/layout-component";
import { useParams } from "next/navigation";
import { FeaturedBrandsConfigForm } from "../../../components/featured-brands/featured-brands-config-form";
import { FeaturedCategoriesConfigForm } from "../../../components/featured-categories/featured-categories-config-form";
import { LayoutInfoBarConfigForm } from "../../../components/info-bar/layout-info-bar-config-form";
import { LayoutTopBarConfigForm } from "../../../components/top-bar/layout-top-bar-config-form";

const PAGE_CONTENT_MAP: Record<
  LayoutComponentName,
  { title: string; description: string; component: React.ReactNode }
> = {
  "top-bar": {
    title: "Top Bar",
    description:
      "Gerencie a aparência das mensagens rotativas no topo do site.",
    component: <LayoutTopBarConfigForm />,
  },
  "info-bar": {
    title: "Info Bar",
    description:
      "Gerencie a aparência da barra de informações da página principal.",
    component: <LayoutInfoBarConfigForm />,
  },
  "featured-categories": {
    title: "Categorias em Destaque",
    description:
      "Gerencie a aparência das categorias em destaque na página principal.",
    component: <FeaturedCategoriesConfigForm />,
  },
  "featured-brands": {
    title: "Marcas em Destaque",
    description:
      "Gerencie a aparência das marcas em destaque na página principal.",
    component: <FeaturedBrandsConfigForm />,
  },
} as Record<
  LayoutComponentName,
  { title: string; description: string; component: React.ReactNode }
>;

export default function LayoutComponentConfigPage() {
  const { layoutComponent } = useParams<{
    layoutComponent: LayoutComponentName;
  }>();
  const pageContent = PAGE_CONTENT_MAP[layoutComponent];
  return (
    <PageLayout withBackButton>
      <PageHeader
        title={pageContent.title}
        description={pageContent.description}
      />
      <PageContentCard>{pageContent.component}</PageContentCard>
    </PageLayout>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ChevronRightIcon } from "lucide-react";

import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import { PageContentList } from "@/components/admin/page/page-content-list";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useListGroupedLayoutComponentsService } from "@/services/private/layout/user-list-grouped-layout-components-service";
import { LayoutScopeListHeader } from "./layout-scope-list-header";
import {
  ICON_MAP,
  RESPONSE_TO_SCOPE,
  SCOPE_DESCRIPTION,
  SCOPE_LABEL,
} from "../constants";

type ScopeSlug = keyof typeof ICON_MAP;

type ScopeCard = {
  slug: ScopeSlug;
  label: string;
  description: string;
  totalComponents: number;
};

export function LayoutScopeList() {
  const { groupedLayoutComponents, isPending, isEmpty } =
    useListGroupedLayoutComponentsService();

  const { globalScopes, pageScopes } = useMemo(() => {
    const counts: Record<ScopeSlug, number> = {
      header: 0,
      footer: 0,
      "home-page": 0,
      "search-page": 0,
      "vehicle-page": 0,
    };

    if (groupedLayoutComponents) {
      Object.entries(groupedLayoutComponents).forEach(([rawKey, items]) => {
        const slug = RESPONSE_TO_SCOPE[rawKey] as ScopeSlug | undefined;
        if (!slug) return;
        counts[slug] = items?.length ?? 0;
      });
    }

    const makeCard = (slug: ScopeSlug): ScopeCard => ({
      slug,
      label: SCOPE_LABEL[slug],
      description: SCOPE_DESCRIPTION[slug],
      totalComponents: counts[slug] || 0,
    });

    const globalScopes: ScopeCard[] = [makeCard("header"), makeCard("footer")];
    const pageScopes: ScopeCard[] = [
      makeCard("home-page"),
      makeCard("search-page"),
      makeCard("vehicle-page"),
    ];

    return { globalScopes, pageScopes };
  }, [groupedLayoutComponents]);

  const renderScopeCard = (scope: ScopeCard) => (
    <Link href={`/admin/layout/${scope.slug}`} key={scope.slug}>
      <Card className="flex items-center p-4 gap-4 hover:bg-primary-foreground cursor-pointer transition-all">
        {ICON_MAP[scope.slug]}
        <div className="min-w-0">
          <h3 className="font-medium">{scope.label}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {scope.description}
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">
          {scope.totalComponents}{" "}
          {scope.totalComponents === 1 ? "componente" : "componentes"}
        </Badge>
        <ChevronRightIcon className="shrink-0" />
      </Card>
    </Link>
  );

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderCustom />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center my-auto">
        <Image
          src="/images/people-search.svg"
          alt="Ilustração de página sem dados"
          width={180}
          height={180}
        />
        <TextNormal className="my-4">Nenhum item encontrado</TextNormal>
      </div>
    );
  }

  return (
    <>
      <LayoutScopeListHeader
        title="Elementos compartilhados"
        badgeLabel="Escopo global"
        description="Alterações feitas em elementos compartilhados refletem em todo o
            site."
      />
      <PageContentList
        items={globalScopes}
        renderItem={renderScopeCard}
        className="flex-grow-0"
      />
      <LayoutScopeListHeader
        title="Elementos não compartilhados"
        badgeLabel="Escopo por página"
        description="Alterações feitas em elementos não compartilhados refletem apenas na
            página na qual estão vinculados."
      />
      <PageContentList items={pageScopes} renderItem={renderScopeCard} />
    </>
  );
}

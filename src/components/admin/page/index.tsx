import { PageContentCard } from "./content/page-content-card";
import { PageContentGrid } from "./content/page-content-grid";
import { PageContentList } from "./content/page-content-list";
import { PageFooter } from "./footer/page-footer";
import { PageHeaderContent } from "./header/page-header-content";
import { PageHeaderDescription } from "./header/page-header-description";
import { PageHeaderLayout } from "./header/page-header-layout";
import { PageHeaderTitle } from "./header/page-header-title";
import { PageLayout } from "./layout/page-layout";

export const Page = {
  Layout: PageLayout,
  Header: {
    Layout: PageHeaderLayout,
    Title: PageHeaderTitle,
    Description: PageHeaderDescription,
    Content: PageHeaderContent,
  },
  Content: {
    List: PageContentList,
    Grid: PageContentGrid,
    Card: PageContentCard,
  },
  Footer: PageFooter,
};

"use client";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export type PaginationProps = {
  totalPages: number;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
} & React.ComponentPropsWithoutRef<"nav">;

export function Pagination({
  totalPages,
  currentPage = 1,
  onPageChange,
  itemsPerPage = 5,
  ...props
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const page = searchParams.get("page");
  currentPage = page ? parseInt(page) : currentPage;

  if (totalPages <= 1) return <></>;

  function createPageUrl(pageNumber: number) {
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  function renderPageLinks() {
    const links = [];
    let start = Math.max(currentPage - Math.floor(itemsPerPage / 2), 1);
    const end = Math.min(start + itemsPerPage - 1, totalPages);

    if (end - start < itemsPerPage - 1) {
      start = Math.max(end - itemsPerPage + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={createPageUrl(i)}
            isActive={i === currentPage}
            onClick={() => onPageChange && onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return links;
  }

  return (
    <ShadcnPagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
            onClick={() =>
              currentPage > 1 && onPageChange && onPageChange(currentPage - 1)
            }
            text="Anterior"
          />
        </PaginationItem>

        {renderPageLinks()}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"
            }
            onClick={() =>
              currentPage < totalPages &&
              onPageChange &&
              onPageChange(currentPage + 1)
            }
            text="Próxima"
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}

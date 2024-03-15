"use client";

import { FC, useCallback, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { GeneralResponse } from "@/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const ListPagination: FC<{ info: GeneralResponse["info"] }> = ({
  info: { pages, next, prev },
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  // const search = new URLSearchParams(searchParams);
  const search = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const currentPage = useMemo(() => {
    const page = search.get("page");
    return page ?? "1";
  }, [search]);

  const prevPage = useMemo(
    () => (prev ? new URL(prev).searchParams.get("page") : null),
    [prev]
  );

  const nextPage = useMemo(
    () => (next ? new URL(next).searchParams.get("page") : null),
    [next]
  );

  const pageClick = useCallback(
    (page: string | null) => {
      if (!page) {
        return;
      }
      search.set("page", page);
      router.replace(pathName + `?${search.toString()}`, { scroll: false });
      router.refresh();
    },
    [search, pathName, router]
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={!prevPage}
            onClick={() => {
              pageClick(prevPage);
            }}
          />
        </PaginationItem>

        {/* first page */}
        <PaginationItem>
          <PaginationLink
            isActive={currentPage === "1"}
            onClick={() => {
              pageClick("1");
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* second page if pages>2 */}
        {pages.toString() !== "2" && (
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === "2"}
              onClick={() => {
                pageClick("2");
              }}
            >
              2
            </PaginationLink>
          </PaginationItem>
        )}

        {Number(currentPage) > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage !== "1" &&
          currentPage !== "2" &&
          currentPage !== pages.toString() && (
            <PaginationItem>
              <PaginationLink
                isActive
                onClick={() => {
                  pageClick(currentPage.toString());
                }}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )}
        {currentPage !== (pages - 1).toString() &&
          currentPage !== pages.toString() && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              pageClick(pages.toString());
            }}
            isActive={currentPage === pages.toString()}
          >
            {pages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              pageClick(nextPage);
            }}
            disabled={!nextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

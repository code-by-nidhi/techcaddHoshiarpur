"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Reads and writes the blog's URL state (`?category=`, `?search=`).
 *
 * The URL is the single source of truth for what the page shows, which is what
 * makes a filtered or searched view shareable and survivable across a reload.
 * Components never hold a duplicate copy of it in state.
 */
export function useBlogQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (!value) params.delete(key);
        else params.set(key, value);
      }

      // any filter change puts the reader back on the first page
      params.delete("page");

      const query = params.toString();
      /* `replace`, not `push`: typing six characters into the search box should
         leave one history entry, not six for the reader to back out through. */
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return {
    category: searchParams.get("category") ?? "all",
    search: searchParams.get("search") ?? "",
    setParams,
  };
}

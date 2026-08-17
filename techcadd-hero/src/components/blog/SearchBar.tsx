"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useBlogQuery } from "@/hooks/useBlogQuery";

/** Long enough to skip most keystrokes, short enough to feel immediate. */
const DEBOUNCE_MS = 350;

/**
 * The blog's search field.
 *
 * Local state drives the input so typing stays instant, and the URL is only
 * rewritten once the reader pauses — otherwise every keystroke would trigger a
 * server round trip for a query they have not finished typing.
 */
export default function SearchBar() {
  const { search, setParams } = useBlogQuery();
  const [value, setValue] = useState(search);

  // keep in step when the URL changes from elsewhere (a cleared search, the back button)
  useEffect(() => setValue(search), [search]);

  useEffect(() => {
    if (value === search) return;

    const timer = setTimeout(() => setParams({ search: value.trim() || undefined }), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [value, search, setParams]);

  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="group relative mx-auto w-full max-w-xl"
    >
      <label htmlFor="blog-search" className="sr-only">
        Search articles
      </label>

      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-5 size-4.5 -translate-y-1/2 text-ink-dim transition-colors duration-300 group-focus-within:text-brand-bright"
      />

      <input
        id="blog-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search articles, courses, careers..."
        className="chip-border w-full rounded-full bg-white/10 py-4 pr-12 pl-13 text-[15px] text-ink placeholder:text-ink-dim backdrop-blur-md transition-shadow duration-300 focus:shadow-[0_0_0_3px_rgb(37_99_235/0.35)] focus:outline-none"
      />

      {value ? (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-4 grid size-7 -translate-y-1/2 place-content-center rounded-full text-ink-dim transition-colors hover:bg-white/10 hover:text-ink"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </form>
  );
}

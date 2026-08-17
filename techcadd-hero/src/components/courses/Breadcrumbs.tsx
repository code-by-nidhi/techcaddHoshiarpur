import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail. The last crumb is the current page, so it is plain text
 * with aria-current rather than a link back to itself.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-white/45">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="transition-colors hover:text-[#93C5FD]">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-white/80">
                  {crumb.label}
                </span>
              )}
              {!last && <FiChevronRight aria-hidden className="size-3.5 text-white/25" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

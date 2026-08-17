import Image from "next/image";

import { initialsOf } from "@/lib/blog/format";
import type { AuthorSummary } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

interface AuthorAvatarProps {
  author: Pick<AuthorSummary, "name" | "avatar">;
  size?: 28 | 36 | 56;
  className?: string;
}

/**
 * An author's photograph, or their initials on a brand disc when there isn't
 * one. The fallback is the normal case rather than an error state — authors
 * are added long before anyone uploads a portrait.
 */
export default function AuthorAvatar({ author, size = 28, className }: AuthorAvatarProps) {
  const shared = cn("shrink-0 overflow-hidden rounded-full", className);

  if (!author.avatar) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size, fontSize: size / 2.6 }}
        className={cn(
          shared,
          "grid place-content-center bg-linear-to-br from-brand to-accent font-semibold text-white",
        )}
      >
        {initialsOf(author.name)}
      </span>
    );
  }

  return (
    <Image
      src={author.avatar}
      alt=""
      width={size}
      height={size}
      className={cn(shared, "object-cover")}
    />
  );
}

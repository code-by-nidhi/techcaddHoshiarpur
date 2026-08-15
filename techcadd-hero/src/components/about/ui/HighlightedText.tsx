import { Fragment } from "react";

interface HighlightedTextProps {
  text: string;
  /** Exact phrases to lift out of `text`. Anything absent is ignored. */
  highlights: string[];
}

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Marks the given phrases inside a paragraph.
 *
 * A single pass over one combined pattern, rather than a highlight at a time:
 * splitting repeatedly would let a later phrase match inside markup produced by
 * an earlier one.
 */
export default function HighlightedText({ text, highlights }: HighlightedTextProps) {
  const phrases = highlights.filter((phrase) => text.includes(phrase));

  if (phrases.length === 0) return <>{text}</>;

  // longest first, so an overlapping shorter phrase cannot win the match
  const pattern = new RegExp(
    `(${[...phrases].sort((a, b) => b.length - a.length).map(escape).join("|")})`,
    "g",
  );

  return (
    <>
      {text.split(pattern).map((part, index) =>
        phrases.includes(part) ? (
          <strong key={`${part}-${index}`} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={`${part.slice(0, 12)}-${index}`}>{part}</Fragment>
        ),
      )}
    </>
  );
}

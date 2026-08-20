/**
 * Emits one `application/ld+json` block.
 *
 * `dangerouslySetInnerHTML` is the only way to put raw JSON inside a script
 * tag from JSX — React would otherwise escape it into something no crawler can
 * parse. It is safe here because every value comes from our own constants and
 * catalogue, never from user input.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

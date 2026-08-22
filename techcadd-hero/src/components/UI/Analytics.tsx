import Script from "next/script";

/**
 * Google Analytics 4, when Settings holds a measurement id.
 *
 * Renders nothing at all without one — no id means no third-party script, no
 * extra connection and no cookie banner obligation, rather than a tag firing
 * into an account that does not exist. The id is validated before it reaches
 * here (see `validAnalyticsId`), so a placeholder left in the CMS does not put
 * a broken script on every page.
 *
 * `afterInteractive` rather than `beforeInteractive`: analytics must never sit
 * on the critical path of a marketing page.
 */
export default function Analytics({ id }: { id?: string }) {
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}
      </Script>
    </>
  );
}

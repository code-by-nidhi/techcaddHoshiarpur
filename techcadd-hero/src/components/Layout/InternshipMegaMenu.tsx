"use client";

import { INTERNSHIP_MENU } from "@/lib/internshipMenu";
import ColumnsMegaMenu, { ColumnsMegaMenuMobile } from "./ColumnsMegaMenu";

/* Thin binding so the panel registry keeps a static import path per menu. */

export default function InternshipMegaMenu(props: { arrow: number; onNavigate: () => void }) {
  return <ColumnsMegaMenu menu={INTERNSHIP_MENU} {...props} />;
}

export function InternshipMegaMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  return <ColumnsMegaMenuMobile menu={INTERNSHIP_MENU} onNavigate={onNavigate} />;
}

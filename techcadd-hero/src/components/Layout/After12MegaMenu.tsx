"use client";

import { AFTER12_MENU } from "@/lib/after12Menu";
import ColumnsMegaMenu, { ColumnsMegaMenuMobile } from "./ColumnsMegaMenu";

/* Thin binding so the panel registry keeps a static import path per menu. */

export default function After12MegaMenu(props: { arrow: number; onNavigate: () => void }) {
  return <ColumnsMegaMenu menu={AFTER12_MENU} {...props} />;
}

export function After12MegaMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  return <ColumnsMegaMenuMobile menu={AFTER12_MENU} onNavigate={onNavigate} />;
}

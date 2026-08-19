"use client";

import { COURSES_COLUMNS_MENU } from "@/lib/coursesColumnsMenu";
import ColumnsMegaMenu from "./ColumnsMegaMenu";

/* Thin binding so the panel registry keeps a static import path per menu.
   No preview panel here: this menu is categories and links only. */

export default function CoursesColumnsMenu(props: { arrow: number; onNavigate: () => void }) {
  return <ColumnsMegaMenu menu={COURSES_COLUMNS_MENU} {...props} />;
}

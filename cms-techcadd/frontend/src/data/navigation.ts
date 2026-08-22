import {
  Folder,
  Images,
  LayoutDashboard,
  Mail,
  MailOpen,
  Newspaper,
  CircleHelp,
  Settings,
  Star,
} from 'lucide-react'

import type { NavSection } from '../types'

/**
 * Single source of truth for the sidebar, the routes and the header title.
 * Adding a module here wires it into all three.
 *
 * Scope note: this lists what the TechCADD Hoshiarpur website actually reads
 * from the CMS, and nothing else. The modules the original Jalandhar CMS
 * carried but this site never calls — pages, banners, gallery, testimonials,
 * faculty, branches, redirects — were removed rather than left in the sidebar
 * as menu items that manage content no visitor will ever see. Reviews is the
 * student wall; testimonials was the Jalandhar spelling of the same idea and
 * keeping both was the duplication that made this feel like someone else's CMS.
 *
 * Courses went the same way. The website builds its course pages from its own
 * catalogue in `src/lib/courses`, so a course entered here reached no visitor —
 * a form that looked like it published a page and did not.
 */
export const navSections: NavSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard }],
  },
  {
    id: 'content',
    title: 'Content',
    items: [
      { id: 'blogs', label: 'Blogs', path: '/blogs', icon: Newspaper },
      { id: 'categories', label: 'Categories', path: '/categories', icon: Folder },
      { id: 'faqs', label: 'FAQ', path: '/faqs', icon: CircleHelp },
      { id: 'reviews', label: 'Reviews', path: '/reviews', icon: Star },
    ],
  },
  {
    id: 'engagement',
    title: 'Engagement',
    items: [
      { id: 'enquiries', label: 'Enquiries', path: '/enquiries', icon: Mail },
      { id: 'newsletter', label: 'Newsletter', path: '/newsletter', icon: MailOpen },
    ],
  },
  {
    id: 'system',
    title: 'System',
    items: [
      { id: 'media', label: 'Media Library', path: '/media', icon: Images },
      { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
    ],
  },
]

/** Flattened nav items — handy for route generation and title lookups. */
export const navItems = navSections.flatMap((section) => section.items)

/** Resolves the page title shown in the header for a given pathname. */
export function getPageTitle(pathname: string): string {
  const exact = navItems.find((item) => item.path === pathname)
  if (exact) return exact.label

  // Nested routes (/courses/new, /courses/:id/edit) inherit their module title.
  // Longest match wins so a future /courses/archive/x picks the deeper entry.
  const parent = navItems
    .filter((item) => item.path !== '/' && pathname.startsWith(`${item.path}/`))
    .sort((a, b) => b.path.length - a.path.length)[0]

  return parent?.label ?? 'Not Found'
}

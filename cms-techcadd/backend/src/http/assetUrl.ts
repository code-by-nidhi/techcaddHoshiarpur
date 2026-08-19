import type { Request } from 'express'

import { config } from '../config.js'

/**
 * Turns a stored media path into an address another origin can load.
 *
 * Media is stored as a site-relative path (`/uploads/<name>`) so the database
 * survives a change of domain. That works for the CMS, which is told where the
 * API is — but the public website renders these into `<img src>` on a
 * different origin, where `/uploads/…` resolves against the website and yields
 * a broken image.
 *
 * The origin is taken from the request rather than hard-coded, so the same
 * build serves localhost and production without configuration. Set
 * `PUBLIC_ASSET_BASE_URL` to override it — needed when the API sits behind a
 * proxy that rewrites the host, or when uploads are fronted by a CDN.
 */
export function assetUrl(req: Request, path: unknown): string {
  if (typeof path !== 'string' || !path) return ''
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path

  const base = (config.PUBLIC_ASSET_BASE_URL ?? `${req.protocol}://${req.get('host') ?? ''}`).replace(
    /\/$/,
    '',
  )
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`
}

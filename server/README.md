# TechCADD blog API — retired

**This service is no longer part of the running system. Do not start it.**

The blog it served now lives in the CMS at `../cms-techcadd/backend`, and the
website reads from there. Its articles, authors, categories, tags, cover images
and newsletter list were copied across by:

```bash
cd ../cms-techcadd/backend
npm run db:import:blog
```

That import is read-only against `prisma/dev.db`, so everything this service
held is still here, untouched, and can be re-imported at any time.

## Why it was retired

- **No admin interface.** Articles could only be written by posting JSON at the
  API, which is why this repository has a CMS at all.
- **`POST`, `PATCH` and `DELETE` on `/api/blog/posts` have no authentication.**
  Anyone who could reach this service could publish or delete an article. The
  controller comment says an auth guard "is the only thing that needs adding";
  it was never added. This alone is reason enough not to run it.
- **It listens on port 4000**, the same port as the CMS API. Starting both means
  one of them fails to bind, or the website silently talks to the wrong one.
- **Two databases for one blog.** Articles were in SQLite here; everything else
  the website shows is in the CMS's MySQL.

## What is still here

Nothing running depends on this directory. It is kept for one reason: it is the
only copy of the original article data outside the CMS, and `prisma/dev.db` is
the file the import reads.

Once you are satisfied the blog reads correctly from the CMS — check
`/blog`, an article page, and an author page on the website — this whole
directory can be deleted.

`bookings/` wrote to the MySQL `demo_bookings` table. Demo requests are now
recorded as enquiries in the CMS, so nothing writes that table any more; the
rows already in it are unaffected and can still be read directly.

## If you need to look at the old data

```bash
cd prisma
DATABASE_URL="file:./dev.db" npx prisma studio --schema schema.prisma
```

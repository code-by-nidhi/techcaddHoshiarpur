/**
 * The swap point.
 *
 * Every resource below is backed by the Express API through `./http/resource`,
 * which builds the five `Resource<T>` methods from a base path. Nothing outside
 * this directory knows where the data comes from — the contract in `./types` is
 * what the features are written against.
 */
export { blogsApi } from './resources/blogs'
export { categoriesApi } from './resources/categories'
export { coursesApi } from './resources/courses'
export { enquiriesApi } from './resources/enquiries'
export { mediaApi } from './resources/media'
export { newsletterApi } from './resources/newsletter'
export { faqsApi } from './resources/faqs'
export { reviewsApi } from './resources/reviews'
export { usersApi } from './resources/users'
export { settingsApi } from './resources/settings'

export { ApiError, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from './types'
export type { ListParams, ListResult, Resource, SortDirection } from './types'

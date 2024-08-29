export function createSlug(text: string): string {
  // Convert text to lowercase
  let slug = text.toLowerCase()

  // Remove accents and diacritics using normalize and regex
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Replace spaces and non-alphanumeric characters with hyphens
  slug = slug
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen

  // Trim hyphens from the start and end of the slug
  slug = slug.replace(/^-+|-+$/g, '')

  return slug
}

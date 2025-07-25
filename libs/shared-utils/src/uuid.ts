/**
 * UUID v4 formatı kontrol eder
 * @param id - doğrulanacak UUID
 * @returns boolean
 */
export function isValidUUID(id: string): boolean {
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidV4Regex.test(id)
}

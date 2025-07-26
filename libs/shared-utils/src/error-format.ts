/**
 * Hata nesnesini standart { status, message } formatına çevirir
 * @param err - fırlatılan hata
 */
export function formatError(err: unknown): { status: number; message: string } {
  if (err instanceof Error) {
    return { status: 500, message: err.message }
  }
  return { status: 500, message: 'Bilinmeyen bir hata oluştu' }
}

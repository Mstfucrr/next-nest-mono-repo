/**
 * Tarihi 'YYYY-MM-DD HH:mm:ss' formatında döner
 * @param date - Date nesnesi
 */
export function formatDateTime(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return [
    date.getFullYear(),
    '-',
    pad(date.getMonth() + 1),
    '-',
    pad(date.getDate()),
    ' ',
    pad(date.getHours()),
    ':',
    pad(date.getMinutes()),
    ':',
    pad(date.getSeconds())
  ].join('')
}

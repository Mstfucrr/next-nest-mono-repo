export type SearchKind = 'string' | 'number' | 'boolean' | 'date' | 'eq' | 'uuid'

type SearchClause =
  | { [key: string]: { contains: string; mode?: 'insensitive' } }
  | { [key: string]: string }
  | { [key: string]: number }
  | { [key: string]: boolean }
  | { [key: string]: { gte: Date; lte: Date } }

/**
 * Hangi alanlarda arama yapılabileceğini ve nasıl yapılacağını tanımla.
 * Örn: { name: 'string', createdAt: 'date', isActive: 'boolean', status: 'eq' }
 */
export type SearchableMap<T> = Partial<Record<keyof T & string, SearchKind>>

export type BuildQueryOptions<T, Where extends object, OrderBy extends object> = {
  payload: {
    limit?: number
    offset?: number
    sortKey?: keyof T & string
    sortValue?: 'asc' | 'desc'
    search?: Array<{ key: keyof T & string; value: string }>
  }
  searchable?: SearchableMap<T>
  /** Birden çok search kriteri geldiğinde birleştirme yöntemi */
  searchMode?: 'AND' | 'OR'
  /** sort yoksa kullanılacak varsayılan */
  defaultSort?: { key: keyof T & string; value: 'asc' | 'desc' }
  /** string contains aramalarında case-insensitive uygula */
  caseInsensitive?: boolean
  /** sayı alanları için otomatik Number dönüşümü */
  coerceNumeric?: boolean
  /** sabit where koşulları eklemek için */
  extraWhere?: Where
  /** alan adını başka bir path’e map’lemek istersen (ilişkisel alanlar için) */
  mapKey?: (k: string) => string
}

export function buildPrismaQuery<T, Where extends object, OrderBy extends object>(
  opts: BuildQueryOptions<T, Where, OrderBy>
) {
  const {
    payload,
    searchable = {},
    searchMode = 'AND',
    defaultSort,
    caseInsensitive = true,
    coerceNumeric = true,
    extraWhere,
    mapKey
  } = opts

  const take = Number(payload.limit ?? 10)
  const skip = Number(payload.offset ?? 0)

  // sort güvenliği: sadece whitelist içindeki alanlara izin ver (veya defaultSort)
  const sortKey = (payload.sortKey && (payload.sortKey as string)) ?? (defaultSort?.key as string | undefined)

  const sortValue = payload.sortValue ?? defaultSort?.value
  const safeSort = sortKey && sortValue ? ({ [sortKey]: sortValue } as OrderBy) : undefined

  // search güvenliği: sadece searchable map içinde olan alanlar
  const clauses =
    payload.search?.flatMap(({ key, value }): SearchClause[] => {
      const k = String(key)
      const mappedKey = (mapKey ? mapKey(k) : k) as string
      const kind = (searchable as Record<string, SearchKind>)[k]
      if (!kind || value == null) return []

      switch (kind) {
        case 'string':
          return [
            {
              [mappedKey]: {
                contains: value,
                ...(caseInsensitive ? { mode: 'insensitive' as const } : {})
              }
            }
          ]
        case 'eq':
        case 'uuid':
          return [{ [mappedKey]: value }]
        case 'number': {
          const n = coerceNumeric ? Number(value) : NaN
          if (!Number.isNaN(n)) return [{ [mappedKey]: n }]
          return []
        }
        case 'boolean':
          if (value === 'true' || value === 'false') return [{ [mappedKey]: value === 'true' }]
          return []
        case 'date': {
          const d = new Date(value)
          if (isNaN(d.getTime())) return []
          const start = new Date(d)
          start.setHours(0, 0, 0, 0)
          const end = new Date(d)
          end.setHours(23, 59, 59, 999)
          return [{ [mappedKey]: { gte: start, lte: end } }]
        }
        default:
          return []
      }
    }) ?? []

  const where = {
    ...(extraWhere as Where),
    ...(clauses.length ? { [searchMode]: clauses } : {})
  } as Where

  return {
    where,
    orderBy: safeSort as OrderBy | undefined,
    skip,
    take
  }
}

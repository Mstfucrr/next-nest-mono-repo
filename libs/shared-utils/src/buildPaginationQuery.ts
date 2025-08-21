import { PaginationInput } from '@dailyshop/shared-types'

/**
 * Sayfalama parametrelerini URL sorgu dizesine dönüştürür.
 *
 * @param params - Sayfalama, sıralama ve arama parametrelerini içeren nesne
 * @returns URL sorgu dizesi (örn: "?limit=10&offset=0&sort=asc&sortKey=name")
 *
 * @example
 * // Temel kullanım
 * const query = buildPaginationQuery({
 *   limit: 10,
 *   offset: 0,
 *   sort: { key: 'name', value: 'asc' },
 *   search: [{ key: 'name', value: 'John' },{ key: 'lastname', value: 'wick' }]
 * });
 * // Sonuç: "?limit=10&offset=0&sort=asc&sortKey=name&name=John&lastname=wick"
 */
export default function buildPaginationQuery<T, E>(params: PaginationInput<T, E>): string {
  const searchParams = new URLSearchParams()

  // Temel sayfalama parametreleri
  searchParams.append('limit', params.limit.toString())
  searchParams.append('offset', params.offset.toString())

  // Sıralama parametreleri
  if (params.sortKey && params.sortValue) {
    searchParams.append('sort', params.sortValue)
    searchParams.append('sortKey', params.sortKey.toString())
  }

  // Arama/filtreleme parametreleri
  if (params.search) {
    params.search.forEach(({ key, value }) => {
      searchParams.append(String(key), value)
    })
  }

  return `?${searchParams.toString()}`
}

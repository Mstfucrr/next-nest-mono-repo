export type PaginationInput<T, E = unknown> = {
  /**
   * Sayfa başına gösterilecek veri sayısı.
   * Backend tarafında varsayılan bir değer atanabilir (örneğin 10, 20).
   * Pagination kontrollerinde kullanılır.
   */
  limit: number
  /**
   * Verinin başlangıç indeksi.
   * Sayfalama için kullanılır. Örneğin:
   * - İlk sayfa: offset = 0
   * - İkinci sayfa: offset = limit
   * - Üçüncü sayfa: offset = limit * 2
   */
  offset: number
  /**
   * Opsiyonel sıralama parametresi.
   * @property key - Sıralanacak veri alanı (T tipindeki bir özellik)
   * @property value - Sıralama yönü ('asc' = artan, 'desc' = azalan)
   */
  sortKey?: keyof T
  sortValue?: 'asc' | 'desc'
  /**
   * Opsiyonel arama/filtreleme parametreleri.
   * Birden fazla arama kriteri eklenebilir.
   * T veya E tipindeki özelliklere göre filtreleme yapılabilir.
   * E tipi, ana veri tipine (T) ek olarak kullanılabilecek ekstra filtreleme
   * özelliklerini tanımlar. Örneğin, T bir kullanıcı listesi ise,
   * E kullanıcıların yaş aralığı gibi türetilmiş özellikleri içerebilir.
   * @property key - Aranacak/filtrelenecek alan adı
   * @property value - Arama/filtreleme değeri
   */
  search?: Array<{ key: keyof T | keyof E; value: string }>
}

export type PaginationOutput<T> = {
  rows: T[]
  total: number
}

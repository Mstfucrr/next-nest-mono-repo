// libs/shared-utils/src/logger.ts

import { Injectable, Logger, LoggerService, Scope } from '@nestjs/common'

/**
 * AppLogger: NestJS Logger’ı extend eden ve LoggerService’i implement eden
 * ortak loglama sınıfı. Her serviste bağımsız context ile kullanabilirsin.
 *
 * Kaynak: https://docs.nestjs.com/techniques/logger
 */
@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger implements LoggerService {
  /**
   * @param context - log mesajlarında gösterilecek sınıf/modül adı
   */
  constructor(context?: string) {
    super(context ?? 'AppLogger') // NestJS Logger’ın base constructor’ı
  }

  /**
   * Bilgilendirme (info) mesajı
   */
  log(message: string) {
    super.log(message)
  }

  /**
   * Uyarı (warn) mesajı
   */
  warn(message: string) {
    super.warn(message)
  }

  /**
   * Hata (error) mesajı
   * @param trace - stack trace bilgisi
   */
  error(message: string, trace?: string) {
    super.error(message, trace)
  }

  /**
   * Debug mesajı (geliştirme aşamasında)
   */
  debug(message: string) {
    super.debug(message)
  }

  /**
   * Verbose seviyesi detaylı log
   */
  verbose(message: string) {
    super.verbose(message)
  }
}

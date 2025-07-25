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
  log(message: string, context?: string) {
    super.log(message, context)
  }

  /**
   * Uyarı (warn) mesajı
   */
  warn(message: string, context?: string) {
    super.warn(message, context)
  }

  /**
   * Hata (error) mesajı
   * @param trace - stack trace bilgisi
   */
  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context)
  }

  /**
   * Debug mesajı (geliştirme aşamasında)
   */
  debug(message: string, context?: string) {
    super.debug(message, context)
  }

  /**
   * Verbose seviyesi detaylı log
   */
  verbose(message: string, context?: string) {
    super.verbose(message, context)
  }
}

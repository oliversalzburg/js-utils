/**
 * Describes the most simple logger.
 */
export interface BareLogger {
  /**
   * Logs a message.
   * @param message - The message to log.
   * @param args - Additional arguments to log.
   */
  log(message: string, ...args: Array<unknown>): void;
}

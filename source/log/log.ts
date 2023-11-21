/**
 * Describes the most simple logger.
 * @group Logging
 */
export interface BareLogger {
  /**
   * Logs a message.
   * @param message - The message to log.
   * @param args - Additional arguments to log.
   */
  log(message: string, ...args: Array<unknown>): void;
}

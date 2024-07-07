/**
 * General error-related tooling that fits no other module.
 * @module
 */

/**
 * Throws the provided error.
 * @param error - The error that will be thrown.
 * @throws The provided error.
 * @group Errors
 */
export const rethrow = (error: unknown) => {
  throw error;
};

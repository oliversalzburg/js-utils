import { hashCyrb53, indent } from "../data/string.js";
import { TreeNode } from "../data/tree.js";
import { InvalidOperationError } from "../errors/InvalidOperationError.js";
import { BareLogger } from "./log.js";

/**
 * An entry of a {@linkcode Report}.
 */
export interface ReportEntry {
  /**
   * The message in the entry.
   */
  message: string;

  /**
   * An optional key-value hash, that might have been
   * provided with the entry.
   */
  context: Record<string, unknown> | undefined;
}

/**
 * Ensures an origin stays within reasonable display size.
 * @param origin - The original log origin.
 * @returns A shortened origin for display.
 */
export const makeLogOrigin = (origin: string): string =>
  origin.includes("\n") ? hashCyrb53(origin) : origin;

/**
 * A hierarchical background report/log.
 */
export class Report extends TreeNode<Report> {
  /**
   * The ID of this report.
   */
  readonly origin: string;
  /**
   * Our storage for all logged messages.
   */
  #store = new Map<string, Array<ReportEntry>>();

  /**
   * Retrieve the message store.
   * @returns The message store.
   */
  get store(): Map<string, Array<ReportEntry>> {
    return this.parent?.store ?? this.#store;
  }

  /**
   * Constructs a new report.
   * @param origin - The ID of this report.
   * @param parent - The paren report for this report.
   * @throws {@linkcode InvalidOperationError} When the origin was already
   * used by another report in this hierarchy.
   */
  constructor(origin: string, parent?: Report) {
    super(parent);
    if (this.store.has(origin)) {
      throw new InvalidOperationError(`The origin '${origin}' was already used in this report.`);
    }
    this.origin = origin;
  }

  /**
   * Retrieves an entry of the store for the given origin.
   * @param origin - The origin of the entry.
   * @returns The store entry with that origin.
   */
  #getStoreEntry(origin: string) {
    if (!this.#store.has(origin)) {
      this.#store.set(origin, new Array<ReportEntry>());
    }
    return this.#store.get(origin);
  }

  /**
   * Put an entry into the report.
   * @param message - The message to add.
   * @param context - An arbitrary key-value object to store with the message.
   */
  log(message: string, context?: Record<string, unknown>) {
    this.#getStoreEntry(makeLogOrigin(this.origin))?.push({ context, message });
  }

  /**
   * Prints the contents of the report.
   * @param logger - A logger to use to print the report.
   * @param depth - How deep to indent this part of the report.
   */
  aggregate(logger: BareLogger, depth = 0): void {
    for (const [origin, records] of this.#store.entries()) {
      if (origin !== this.origin) {
        continue;
      }

      logger.log(indent(origin, depth));
      for (const entry of records) {
        logger.log(indent(` - ${entry.message}`, depth));
        if (entry.context) {
          logger.log(indent(JSON.stringify(entry.context, undefined, depth + 4), depth));
        }
      }
    }

    if (this.children.size === 0) {
      return;
    }

    for (const child of this.children) {
      child.aggregate(logger, depth + 1);
    }
  }
}

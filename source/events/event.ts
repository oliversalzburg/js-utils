/**
 * Creates a {@linkcode !CustomEvent} instance with the given arguments.
 * @param type - The name of the type of the event.
 * @param detail - The event details.
 * @returns The requested event object.
 */
export const createEvent = <TEventType extends string, TDetail>(
  type: TEventType,
  detail: TDetail,
): CustomEvent<TDetail> & { type: TEventType } => {
  return new CustomEvent(type, { detail }) as CustomEvent<TDetail> & { type: TEventType };
};

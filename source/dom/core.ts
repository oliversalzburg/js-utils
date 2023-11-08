import { ConstructorOf } from "../core.js";
import { InvalidOperationError } from "../errors/InvalidOperationError.js";
import { UnexpectedNilError } from "../nil.js";

/**
 * Retrieves an element from the document and returns it if it has the
 * expected type. Otherwise an error is thrown.
 * @param document The document from which to look up the element.
 * @param id The ID of the element.
 * @param Type The type you expect the element to have.
 * @returns The requested element, if it has the expected type.
 * @throws {InvalidOperationError} When the document element has an unexpected type.
 * @throws {UnexpectedNilError} When the the document element is `null`.
 */
export const getDocumentElementTypeById = <T extends HTMLElement>(
  document: Document,
  id: string,
  Type: ConstructorOf<T>,
): T => {
  const element = document.getElementById(id);

  if (element === null) {
    throw new UnexpectedNilError(`The document element '${id}' does not exist.`);
  }

  if (!(element instanceof Type)) {
    throw new InvalidOperationError(`The document element '${id}' has an unexpected type.`);
  }

  return element;
};

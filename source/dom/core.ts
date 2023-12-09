import { ConstructorOf } from "../core.js";
import { InvalidOperationError } from "../error/InvalidOperationError.js";
import { UnexpectedNilError } from "../nil.js";

/**
 * Retrieves an element from the document and returns it if it is
 * non-null and has the expected type. Otherwise an error is thrown.
 * @param document - The document from which to look up the element.
 * @param id - The ID of the element.
 * @param Type - The type you expect the element to have.
 * @returns The requested element, if it has the expected type.
 * @throws {@linkcode InvalidOperationError} When the document element has an unexpected type.
 * @throws {@linkcode  UnexpectedNilError} When the the document element is `null`.
 * @group DOM
 */
export const getDocumentElementTypeByIdStrict = <T extends HTMLElement>(
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

/**
 * Retrieves an element from the document and returns it if it has the
 * expected type.
 * @param document - The document from which to look up the element.
 * @param id - The ID of the element.
 * @param Type - The type you expect the element to have.
 * @returns The requested element, if it has the expected type; `null` otherwise.
 * @group DOM
 */
export const getDocumentElementTypeById = <T extends HTMLElement>(
  document: Document,
  id: string,
  Type: ConstructorOf<T>,
): T | null => {
  const element = document.getElementById(id);

  if (element === null) {
    return null;
  }

  if (!(element instanceof Type)) {
    return null;
  }

  return element;
};

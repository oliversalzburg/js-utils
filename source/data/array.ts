import { ConstructorOf } from "../core.js";
import { is } from "./nil.js";

/**
 * Places the items in the array in random order.
 * The array is shuffled in-place, no copy is created. The returned array is exactly the passed array.
 * @param array - The array to shuffle.
 * @typeParam TElements - The type of the elements in the array.
 * @returns The passed array in random order.
 */
export const shuffleArray = <TElements>(array: Array<TElements>) => {
  for (let index = array.length - 1; index > 0; index--) {
    const targetIndex = Math.trunc(Math.random() * (index + 1));
    const temp = array[index];
    array[index] = array[targetIndex];
    array[targetIndex] = temp;
  }
  return array;
};

/**
 * Returns an array that holds all items that appear in both
 * passed arrays.
 * @param a - The first array.
 * @param b - The second array.
 * @typeParam TElements - The type of the elements in the array.
 * @returns A new array which holds the items that appear in
 * both passed arrays.
 */
export const intersect = <TElements>(a: Array<TElements>, b: Array<TElements>) => {
  return a.filter(x => b.includes(x));
};

/**
 * Returns an array that holds all items that only appear in `a`.
 * @param a - The first array.
 * @param b - The second array.
 * @typeParam TElements - The type of the elements in the array.
 * @returns A new array which holds the items that ony appear in `a`.
 */
export const difference = <TElements>(a: Array<TElements>, b: Array<TElements>) => {
  return a.filter(x => !b.includes(x));
};

/**
 * From an array with unknown contents, retrieve all the elements
 * that are of a certain type and return them as a new array.
 * @param array - The array to filter.
 * @param InstanceType - The type to search for.
 * @typeParam TElements - The type of the elements in the array.
 * @returns A new array with the filtered items.
 */
export const filterType = <TElements>(
  array: Array<unknown>,
  InstanceType: ConstructorOf<TElements>,
) => array.filter(element => is(element, InstanceType)) as Array<TElements>;

/**
 * From an iterable with unknown contents, yield arrays that contain items from
 * the iterable up to a given limit.
 * @param iterable - The iterable to retrieve items from.
 * @param limit - The amount of items in each chunk.
 * @typeParam TElements - The type of the elements in the iterable.
 * @yields Chunks from the provided iterable.
 */
export const chunkify = function* <TElements>(iterable: Iterable<TElements>, limit: number) {
  let chunk = [];
  for (const element of iterable) {
    chunk.push(element);
    if (chunk.length === limit) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length) {
    yield chunk;
  }
};

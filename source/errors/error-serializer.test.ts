import assert from "node:assert";
import { it } from "node:test";
import {
  errorToJSON,
  errorToRecord,
  errorToSimpleSerializable,
  isError,
  unknownToError,
} from "./error-serializer.js";
import { InternalError } from "./InternalError.js";
import { InvalidArgumentError } from "./InvalidArgumentError.js";

function generateDefaultError() {
  try {
    throw new Error("oops");
  } catch (error) {
    return error as Error;
  }
}

it("unknown to Error: AbstractError", () => {
  const subjectError = new InvalidArgumentError("oops");
  const serialized = unknownToError(subjectError);
  assert.strictEqual(serialized.code, "ERR_OS_INVALID_ARGUMENT");
  assert.strictEqual(serialized.message, "oops");
  assert.strictEqual(serialized.name, "InvalidArgumentError");
  assert.strictEqual(typeof serialized.stack, "string");
});

it("unknown to Error: Error", () => {
  const subjectError = new Error("oops");
  const serialized = unknownToError(subjectError);
  assert.strictEqual(serialized.code, "ERR_OS_INTERNAL");
  assert.strictEqual(serialized.message, "oops");
  assert.strictEqual(serialized.name, "InternalError");
  assert.strictEqual(typeof serialized.stack, "string");
});

it("unknown to Error: string", () => {
  const subjectError = "oops";
  const serialized = unknownToError(subjectError);
  assert.strictEqual(serialized.code, "ERR_OS_UNKNOWN");
  assert.strictEqual(serialized.message, "oops");
  assert.strictEqual(serialized.name, "UnknownError");
  assert.strictEqual(typeof serialized.stack, "string");
});

it("unknown to Error: null", () => {
  const subjectError = null;
  const serialized = unknownToError(subjectError);
  assert.strictEqual(serialized.code, "ERR_OS_UNKNOWN");
  assert.strictEqual(serialized.message, "null");
  assert.strictEqual(serialized.name, "UnknownError");
  assert.strictEqual(typeof serialized.stack, "string");
});

it("serializes an error to JSON", () => {
  const subjectError = new Error("oops");
  const plain = JSON.stringify(subjectError);
  const serialized = errorToJSON(subjectError);
  // We assert.strictEqual more properties to have been serialized into the string.
  assert.notStrictEqual(serialized, plain);
  assert.strictEqual(plain.length < serialized.length, true);
});

it("serializes an error to a record: Error", () => {
  const subjectError = new Error("oops");
  const serialized = errorToRecord(subjectError);
  assert.strictEqual(isError(subjectError), true);
  assert.strictEqual(isError(serialized), false);

  assert.strictEqual(serialized.message, "oops");
  assert.strictEqual(typeof serialized.stack, "string");
});

it("serializes an error to a record: Default Error", () => {
  const subjectError = generateDefaultError();
  const serialized = errorToRecord(subjectError);
  assert.strictEqual(isError(subjectError), true);
  assert.strictEqual(isError(serialized), false);

  assert.strictEqual(serialized.code, undefined);
  assert.strictEqual(serialized.message, "oops");
  assert.strictEqual(serialized.name, undefined);
  assert.strictEqual(typeof serialized.stack, "string");
});

it("serializes an error to a record: Node Error", async function () {
  let error: Error;
  try {
    assert(false, "oops");
  } catch (thrownError) {
    error = thrownError as Error;
  }

  const subjectError = error;
  const serialized = errorToRecord(subjectError);
  assert.strictEqual(isError(subjectError), true);
  assert.strictEqual(isError(serialized), false);

  assert.strictEqual(serialized.code, "ERR_ASSERTION");
  assert.strictEqual(serialized.message, "oops");
  assert.strictEqual(serialized.name, "AssertionError");
  assert.strictEqual(typeof serialized.stack, "string");
});

it("serializes an error to a simple object for persistence: Error", () => {
  const subjectError = InternalError.fromError(new Error("oops"));
  const serialized = errorToSimpleSerializable(subjectError);
  assert.strictEqual(isError(subjectError), true);
  assert.strictEqual(isError(serialized), false);

  assert.strictEqual(serialized.code, "ERR_OS_INTERNAL");
  assert.strictEqual(serialized.message, "oops");
  assert.strictEqual(serialized.name, "InternalError");
  assert.strictEqual(typeof serialized.stack, "string");
});

it("serializes an error to a simple object for persistence: Node Error", () => {
  const subjectError = InternalError.fromError(generateDefaultError());
  const serialized = errorToSimpleSerializable(subjectError);
  assert.strictEqual(isError(subjectError), true);
  assert.strictEqual(isError(serialized), false);

  assert.strictEqual(serialized.code, "ERR_OS_INTERNAL");
  assert.strictEqual(serialized.message, "oops");
  assert.strictEqual(serialized.name, "InternalError");
  assert.strictEqual(typeof serialized.stack, "string");
});

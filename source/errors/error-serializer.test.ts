/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { it } from "mocha";
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
  expect(serialized.code).to.equal("ERR_OS_INVALID_ARGUMENT");
  expect(serialized.message).to.equal("oops");
  expect(serialized.name).to.equal("InvalidArgumentError");
  expect(serialized.stack).to.be.a("string");
});

it("unknown to Error: Error", () => {
  const subjectError = new Error("oops");
  const serialized = unknownToError(subjectError);
  expect(serialized.code).to.equal("ERR_OS_INTERNAL");
  expect(serialized.message).to.equal("oops");
  expect(serialized.name).to.equal("InternalError");
  expect(serialized.stack).to.be.a("string");
});

it("unknown to Error: string", () => {
  const subjectError = "oops";
  const serialized = unknownToError(subjectError);
  expect(serialized.code).to.equal("ERR_OS_UNKNOWN");
  expect(serialized.message).to.equal("oops");
  expect(serialized.name).to.equal("UnknownError");
  expect(serialized.stack).to.be.a("string");
});

it("unknown to Error: null", () => {
  const subjectError = null;
  const serialized = unknownToError(subjectError);
  expect(serialized.code).to.equal("ERR_OS_UNKNOWN");
  expect(serialized.message).to.equal("null");
  expect(serialized.name).to.equal("UnknownError");
  expect(serialized.stack).to.be.a("string");
});

it("serializes an error to JSON", () => {
  const subjectError = new Error("oops");
  const plain = JSON.stringify(subjectError);
  const serialized = errorToJSON(subjectError);
  // We expect more properties to have been serialized into the string.
  expect(serialized).not.to.equal(plain);
  expect(serialized.length).to.be.greaterThan(plain.length);
});

it("serializes an error to a record: Error", () => {
  const subjectError = new Error("oops");
  const serialized = errorToRecord(subjectError);
  expect(isError(subjectError)).to.be.true;
  expect(isError(serialized)).to.be.false;

  expect(serialized.message).to.equal("oops");
  expect(serialized.stack).to.be.a("string");
});

it("serializes an error to a record: Default Error", () => {
  const subjectError = generateDefaultError();
  const serialized = errorToRecord(subjectError);
  expect(isError(subjectError)).to.be.true;
  expect(isError(serialized)).to.be.false;

  expect(serialized.code).to.be.undefined;
  expect(serialized.message).to.equal("oops");
  expect(serialized.name).to.be.undefined;
  expect(serialized.stack).to.be.a("string");
});

type Assert = (condition: unknown, message?: string) => asserts condition;
it("serializes an error to a record: Node Error", async function () {
  let assert: Assert;
  try {
    assert = (await import("node:assert")).default;
  } catch (_error) {
    this.skip();
  }

  let error: Error;
  try {
    assert(false, "oops");
  } catch (thrownError) {
    error = thrownError as Error;
  }

  const subjectError = error;
  const serialized = errorToRecord(subjectError);
  expect(isError(subjectError)).to.be.true;
  expect(isError(serialized)).to.be.false;

  expect(serialized.code).to.equal("ERR_ASSERTION");
  expect(serialized.message).to.equal("oops");
  expect(serialized.name).to.equal("AssertionError");
  expect(serialized.stack).to.be.a("string");
});

it("serializes an error to a simple object for persistence: Error", () => {
  const subjectError = InternalError.fromError(new Error("oops"));
  const serialized = errorToSimpleSerializable(subjectError);
  expect(isError(subjectError)).to.be.true;
  expect(isError(serialized)).to.be.false;

  expect(serialized.code).to.equal("ERR_OS_INTERNAL");
  expect(serialized.message).to.equal("oops");
  expect(serialized.name).to.equal("InternalError");
  expect(serialized.stack).to.be.a("string");
});

it("serializes an error to a simple object for persistence: Node Error", () => {
  const subjectError = InternalError.fromError(generateDefaultError());
  const serialized = errorToSimpleSerializable(subjectError);
  expect(isError(subjectError)).to.be.true;
  expect(isError(serialized)).to.be.false;

  expect(serialized.code).to.equal("ERR_OS_INTERNAL");
  expect(serialized.message).to.equal("oops");
  expect(serialized.name).to.equal("InternalError");
  expect(serialized.stack).to.be.a("string");
});

/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { it } from "mocha";
import { prepareAsyncContext, sleep } from "./async.js";

it("executes trivial callback", async () => {
  let executed = false;

  const callback = prepareAsyncContext(async () => {
    await sleep(1);
    executed = true;
  });

  callback();

  await sleep(100);

  expect(executed).to.be.true;
});

it("passes parameters to callback", async () => {
  let executed = false;

  const callback = prepareAsyncContext(async (event: Record<string, string>, eventId: number) => {
    expect(event.name).to.equal("call");
    expect(eventId).to.equal(42);

    await sleep(1);
    executed = true;
  });

  callback({ name: "call" }, 42);

  await sleep(100);

  expect(executed).to.be.true;
});

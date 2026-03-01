import assert from "node:assert";
import { it } from "node:test";
import { prepareAsyncContext, sleep } from "./async.js";

it("executes trivial callback", async () => {
  let executed = false;

  const callback = prepareAsyncContext(async () => {
    await sleep(1);
    executed = true;
  });

  callback();

  await sleep(100);

  assert.strictEqual(executed, true);
});

it("passes parameters to callback", async () => {
  let executed = false;

  const callback = prepareAsyncContext(async (event: Record<string, string>, eventId: number) => {
    assert.strictEqual(event.name, "call");
    assert.strictEqual(eventId, 42);

    await sleep(1);
    executed = true;
  });

  callback({ name: "call" }, 42);

  await sleep(100);

  assert.strictEqual(executed, true);
});
